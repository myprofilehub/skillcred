
'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// -----------------------------------------------------------------------------
// SECURE ENROLLMENT DETAILS & UPLOAD
// -----------------------------------------------------------------------------
export async function processEnrollmentDetails(formData: FormData) {
    try {
        const session = await auth();

        // --- Extract basic text fields ---
        const trackSlug = formData.get('trackSlug') as string;
        const phone = formData.get('phone') as string;
        const city = formData.get('city') as string;
        const college = formData.get('college') as string;
        const graduationYear = formData.get('year') as string;
        const experience = formData.get('experienceLevel') as string;
        const source = formData.get('heardAboutUs') as string;
        const duration = formData.get('duration') as string;
        const coupon = (formData.get('couponCode') as string || '').trim().toUpperCase();
        
        // Use explicitly provided name and email, fallback to session if not provided
        const providedName = (formData.get('name') as string) || session?.user?.name || 'New Student';
        const providedEmail = (formData.get('email') as string) || session?.user?.email;

        if (!providedEmail) {
            return { error: 'Email is required to enroll. Please go back and provide your email.' };
        }

        let userId = session?.user?.id;
        
        // If not logged in, find or create the user by email
        if (!userId) {
            let existingUser = await prisma.user.findUnique({ where: { email: providedEmail } });
            if (!existingUser) {
                // Create with a temporary password, will be reset & emailed after payment
                const tempPassword = Math.random().toString(36).slice(-8);
                const hashedPassword = await bcrypt.hash(tempPassword, 10);
                existingUser = await prisma.user.create({
                    data: {
                        email: providedEmail,
                        name: providedName,
                        password: hashedPassword,
                    }
                });
            }
            userId = existingUser.id;
        }

        if (!trackSlug) return { error: 'Stream selection is required' };
        if (!duration) return { error: 'Program option selection is required' };

        const dbSlug = trackSlug === 'full-stack-development' ? 'full-stack' : trackSlug;
        const track = await prisma.track.findUnique({ where: { slug: dbSlug } });
        if (!track) return { error: 'Invalid stream selected' };

        // --- PRICING ENGINE (Revised Strategy) ---
        const slugLower = track.slug.toLowerCase();
        const TIER_A = ['full-stack', 'ai-ml', 'mobile-development'];
        const TIER_B = ['devops-cloud', 'data-engineering', 'data-science'];
        
        const isTierA = TIER_A.some(s => slugLower.includes(s));
        const isTierB = TIER_B.some(s => slugLower.includes(s));
        
        let pilotBase = 3499; // Tier C default
        let pilotAddon = 1500;
        
        if (isTierA) {
            pilotBase = 7999;
            pilotAddon = 2000;
        } else if (isTierB) {
            pilotBase = 5499;
            pilotAddon = 1500;
        }
        
        const isUpgrade = duration === 'pat-verified';
        const finalPrice = isUpgrade ? (pilotBase + pilotAddon) : pilotBase;
        let appliedCoupon = null;

        // Apply College Partner Flat Rate
        if (coupon?.replace(/\s/g, '').toUpperCase() === 'COLLEGEPARTNER') {
            appliedCoupon = 'COLLEGEPARTNER';
        }

        // Save Resume File
        let resumeUrl = null;
        const resumeFile = formData.get('resume') as File | null;
        if (resumeFile && resumeFile.size > 0) {
            const bytes = await resumeFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Cleanup filename
            const cleanName = resumeFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const fileName = `${userId}-${Date.now()}-${cleanName}`;

            const uploadDir = join(process.cwd(), 'public', 'uploads', 'resumes');
            await mkdir(uploadDir, { recursive: true });

            const filePath = join(uploadDir, fileName);
            await writeFile(filePath, buffer);

            resumeUrl = `/uploads/resumes/${fileName}`;
        }

        // Prepare bio to store extra fields
        const extraDetails = [
            city ? `City: ${city}` : null,
            experience ? `Experience: ${experience}` : null,
            source ? `Source: ${source}` : null
        ].filter(Boolean).join(' | ');

        if (!userId) return { error: "User ID could not be resolved" };

        // Update User mobile (if provided)
        if (phone) {
            const existingUserWithPhone = await prisma.user.findUnique({
                where: { mobile: phone }
            });

            if (existingUserWithPhone && existingUserWithPhone.id !== userId) {
                return { error: 'This phone number is already registered to another account' };
            }
        }

        // Always update the User's name if provided in the form
        await prisma.user.update({
            where: { id: userId },
            data: { 
                ...(phone ? { mobile: phone } : {}),
                name: providedName,
            }
        });

        // Update Student Profile
        const student = await prisma.student.upsert({
            where: { userId: userId },
            create: {
                userId: userId,
                college,
                year: graduationYear,
                bio: extraDetails || undefined,
            },
            update: {
                college,
                year: graduationYear,
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

        // Create Payment Intent (Local record for Razorpay verification later)
        const payment = await prisma.payment.create({
            data: {
                userId: userId,
                amount: 500, // Upfront deposit is always 500
                currency: 'INR',
                status: 'PENDING',
                provider: 'RAZORPAY',
                trackId: track.id,
                programDuration: duration,
                couponCode: appliedCoupon || (coupon && coupon.length > 0 ? coupon : null),
            }
        });

        return {
            success: true,
            orderId: payment.id,
            amount: payment.amount,
            currency: payment.currency,
            projectName: `${track.title} - ${isUpgrade ? "PAT-Verified" : "Standard"} (Commitment Deposit)`,
        };

    } catch (error: any) {
        console.error('Enrollment processing failed!');
        console.error('Error string:', error.toString());
        if (error.stack) console.error('Stack:', error.stack);
        return { error: `Failed to process enrollment details: ${error.message || error}` };
    }
}

// -----------------------------------------------------------------------------
// STEP 4: VERIFY PAYMENT & ENROLL
// -----------------------------------------------------------------------------
export async function verifyPaymentAndEnroll(paymentId: string) {
    try {
        // 1. Update Payment Status (Mock Verification)
        const payment = await prisma.payment.update({
            where: { id: paymentId },
            data: { status: 'SUCCESS' }
        });

        if (!payment.trackId) {
            return { error: 'Invalid payment record' };
        }
        const user = await prisma.user.findUnique({ where: { id: payment.userId } });
        if (!user) return { error: 'User profile missing' };

        const student = await prisma.student.findUnique({ where: { userId: payment.userId } });
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
                programDuration: payment.programDuration || "8-week",
                couponCode: payment.couponCode,
                status: 'PENDING_APPROVAL',
                progress: 0,
                mentorId: null
            },
            update: {
                batchId: payment.batchId, // can be null
                programDuration: payment.programDuration || "8-week",
                couponCode: payment.couponCode,
                status: 'PENDING_APPROVAL' // Stay in pending approval if reactivated
            }
        });

        // 3. Notify Admin of New Paid Enrollment & Send Credentials to Student
        try {
            const track = await prisma.track.findUnique({ where: { id: payment.trackId } });
            
            // Generate a fresh password for the user and email it
            const newGeneralPassword = Math.random().toString(36).slice(-8);
            const lmsPassword = "LMS-" + Math.random().toString(36).substring(2, 8).toUpperCase();
            const hashedPassword = await bcrypt.hash(newGeneralPassword, 10);
            
            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword }
            });

            // Email LMS & Login Credentials to student
            const { sendEnrollmentCredentials } = await import('@/lib/email');
            await sendEnrollmentCredentials(
                user.email || '',
                user.name || 'Student',
                lmsPassword,
                newGeneralPassword
            );
            
            const adminHtmlContent = `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #4f46e5;">New Enrollment Awaiting Approval</h1>
                    </div>
                    <p>Admin,</p>
                    <p>A new student has completed their payment and is awaiting LMS access approval.</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Student:</strong> ${user.name || 'Unnamed'}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
                        <p style="margin: 5px 0;"><strong>Stream:</strong> ${track?.title || 'Unknown'}</p>
                        <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹${payment.amount}</p>
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.NEXTAUTH_URL}/dashboard/admin/enrollments" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Review Enrollment</a>
                    </div>
                </div>
            </body>
            </html>
            `;

            const { sendEmail } = await import('@/lib/email');
            await sendEmail({
                to: [{ email: 'admin@skillcred.in', name: 'SkillCred Admin' }],
                subject: `Approval Required: New Enrollment from ${user.name || 'Student'}`,
                htmlContent: adminHtmlContent
            });

        } catch (adminErr) {
            console.error("Admin Email notification failed:", adminErr);
        }

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


        revalidatePath('/dashboard');
        return { success: true };

    } catch (error) {
        console.error('Enrollment finalization failed:', error);
        return { error: 'Failed to verify payment and enroll' };
    }
}
