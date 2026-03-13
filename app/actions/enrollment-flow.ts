
'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { sendLMSCredentials } from '@/lib/email';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// -----------------------------------------------------------------------------
// SECURE ENROLLMENT DETAILS & UPLOAD
// -----------------------------------------------------------------------------
export async function processEnrollmentDetails(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: 'Not authenticated' };

    try {
        const phone = formData.get('phone') as string;
        const college = formData.get('college') as string;
        const year = formData.get('year') as string;
        const city = formData.get('city') as string;
        const experienceLevel = formData.get('experienceLevel') as string;
        const heardAboutUs = formData.get('heardAboutUs') as string;
        const trackSlug = formData.get('trackSlug') as string;

        if (!trackSlug) return { error: 'Stream selection is required' };

        const track = await prisma.track.findUnique({ where: { slug: trackSlug } });
        if (!track) return { error: 'Invalid stream selected' };

        // Save Resume File
        let resumeUrl = null;
        const resumeFile = formData.get('resume') as File | null;
        if (resumeFile && resumeFile.size > 0) {
            const bytes = await resumeFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Cleanup filename
            const cleanName = resumeFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const fileName = `${session.user.id}-${Date.now()}-${cleanName}`;

            const uploadDir = join(process.cwd(), 'public', 'uploads', 'resumes');
            await mkdir(uploadDir, { recursive: true });

            const filePath = join(uploadDir, fileName);
            await writeFile(filePath, buffer);

            resumeUrl = `/uploads/resumes/${fileName}`;
        }

        // Prepare bio to store extra fields
        const extraDetails = [
            city ? `City: ${city}` : null,
            experienceLevel ? `Experience: ${experienceLevel}` : null,
            heardAboutUs ? `Source: ${heardAboutUs}` : null
        ].filter(Boolean).join(' | ');

        // Update User mobile (if provided)
        if (phone) {
            await prisma.user.update({
                where: { id: session.user.id },
                data: { mobile: phone }
            });
        }

        // Update Student Profile
        const student = await prisma.student.upsert({
            where: { userId: session.user.id },
            create: {
                userId: session.user.id,
                college,
                year,
                bio: extraDetails || undefined,
            },
            update: {
                college,
                year,
                bio: extraDetails || undefined,
            }
        });

        // Update Portfolio with Resume URL
        await prisma.portfolio.upsert({
            where: { studentId: student.id },
            create: {
                studentId: student.id,
                resumeUrl: resumeUrl || undefined,
            },
            update: {
                ...(resumeUrl ? { resumeUrl } : {})
            }
        });

        // Create Payment Intent (Local record for Zoho verification later)
        const payment = await prisma.payment.create({
            data: {
                userId: session.user.id,
                amount: 4999, // Fixed enrollment price
                currency: 'INR',
                status: 'PENDING',
                provider: 'ZOHO',
                trackId: track.id,
            }
        });

        return {
            success: true,
            orderId: payment.id,
            amount: payment.amount,
            currency: payment.currency,
            projectName: `Enrollment: ${track.title}`,
        };

    } catch (error) {
        console.error('Enrollment processing failed:', error);
        return { error: 'Failed to process enrollment details' };
    }
}

// -----------------------------------------------------------------------------
// STEP 4: VERIFY PAYMENT & ENROLL
// -----------------------------------------------------------------------------
export async function verifyPaymentAndEnroll(paymentId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: 'Not authenticated' };

    try {
        // 1. Update Payment Status (Mock Verification)
        const payment = await prisma.payment.update({
            where: { id: paymentId },
            data: { status: 'SUCCESS' }
        });

        if (!payment.trackId) {
            return { error: 'Invalid payment record' };
        }

        const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
        if (!student) return { error: 'Student profile missing' };

        // 2. Create or Update Enrollment linked to Track
        const enrollment = await prisma.enrollment.upsert({
            where: {
                studentId_trackId: {
                    studentId: student.id,
                    trackId: payment.trackId
                }
            },
            create: {
                studentId: student.id,
                trackId: payment.trackId,
                batchId: payment.batchId, // can be null
                status: 'ACTIVE',
                progress: 0,
                mentorId: null
            },
            update: {
                batchId: payment.batchId, // can be null
                status: 'ACTIVE' // Reactivate if it was dropped/paused
            }
        });

        // 3. Add Project to Portfolio (If project assigned)
        if (payment.projectId) {
            const project = await prisma.projectCatalogItem.findUnique({ where: { id: payment.projectId } });

            if (project) {
                // Need to create Portfolio if not exists (should exist from step 1) but safer to check
                let portfolio = await prisma.portfolio.findUnique({ where: { studentId: student.id } });
                if (!portfolio) {
                    portfolio = await prisma.portfolio.create({ data: { studentId: student.id } });
                }

                await prisma.portfolioProject.create({
                    data: {
                        portfolioId: portfolio.id,
                        title: project.name,
                        description: project.description || "Started project",
                        skills: project.coreFeatures, // mapping temporarily
                        projectUrl: "", // Empty initially
                        verifiedBy: null,
                    }
                });
            }
        }


        // -------------------------------------------------------------------------
        // 4. Generate LMS Credentials & Send Email
        // -------------------------------------------------------------------------

        // Generate Username: firstname.lastname + random (lowercase)
        const nameParts = (session.user.name || "student").toLowerCase().split(" ");
        const baseUsername = `${nameParts[0]}.${nameParts[1] || ""}`.replace(/[^a-z0-9.]/g, "");
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const username = `${baseUsername}${randomSuffix}`;
        const lmsEmail = `${username}@skillcred.com`;

        // Generate Temp Password
        const tempPassword = Math.random().toString(36).slice(-8) + "Aa1!";
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Update User with Credentials
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                username: username,
                lmsEmail: lmsEmail,
                password: hashedPassword, // Sets/Overwrites password
                forcePasswordChange: true // Require reset on next login
            }
        });

        // Send Email via Brevo
        try {
            const emailResult = await sendLMSCredentials(
                session.user.email!, // Send to personal email
                session.user.name || "Student",
                lmsEmail,
                tempPassword
            );

            if (emailResult.error) {
                console.error("Failed to send LMS credentials email:", emailResult.error);
                // We don't fail the transaction here, but we should log it
            }
        } catch (emailErr) {
            console.error("Email sending exception:", emailErr);
        }

        revalidatePath('/dashboard');
        return { success: true };

    } catch (error) {
        console.error('Enrollment finalization failed:', error);
        return { error: 'Failed to verify payment and enroll' };
    }
}
