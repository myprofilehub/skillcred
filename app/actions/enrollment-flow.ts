
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
    try {
        const session = await auth();
        if (!session?.user) {
            return { error: 'You must be logged in to enroll.' };
        }

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
        const providedName = (formData.get('name') as string) || session.user.name;
        const providedEmail = (formData.get('email') as string) || session.user.email;

        if (!trackSlug) return { error: 'Stream selection is required' };
        if (!duration) return { error: 'Program duration selection is required' };

        const track = await prisma.track.findUnique({ where: { slug: trackSlug } });
        if (!track) return { error: 'Invalid stream selected' };

        // --- PRICING ENGINE ---
        const TIER_1_SLUGS = ['ai', 'machine-learning', 'cyber', 'data-engineering'];
        const TIER_2_SLUGS = ['full-stack', 'devops', 'cloud', 'data-science', 'analytics'];
        
        const isTier1 = TIER_1_SLUGS.some(s => track.slug.toLowerCase().includes(s));
        const isTier2 = TIER_2_SLUGS.some(s => track.slug.toLowerCase().includes(s));
        
        let basePrice = 9999; // Default 8-week Tier 3
        if (duration === '2-week') {
            basePrice = 3499; // Capstone flat rate
        } else if (duration === '4-week') {
            if (isTier1) basePrice = 7999;
            else if (isTier2) basePrice = 6499;
            else basePrice = 4999;
        } else { // 8-week
            if (isTier1) basePrice = 14999;
            else if (isTier2) basePrice = 11999;
            else basePrice = 9999;
        }

        let finalPrice = basePrice;
        let appliedCoupon = null;

        // Apply College Partner Booster
        if (coupon?.replace(/\s/g, '').toUpperCase() === 'COLLEGEPARTNER' && duration === '8-week') {
            finalPrice = 7999;
            appliedCoupon = 'COLLEGEPARTNER';
        } else if (duration !== '2-week') {
            // Apply Early Bird Booster (First 50 seats per track)
            const activeSeats = await prisma.enrollment.count({
                where: { trackId: track.id, status: 'ACTIVE' }
            });
            if (activeSeats < 50) {
                finalPrice = Math.floor(finalPrice * 0.8); // 20% off
                appliedCoupon = 'EARLYBIRD20';
            }
        }

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
            experience ? `Experience: ${experience}` : null,
            source ? `Source: ${source}` : null
        ].filter(Boolean).join(' | ');

        const userId = session.user.id;
        if (!userId) return { error: "User ID not found in session" };

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
                amount: finalPrice, 
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
            projectName: `Enrollment: ${track.title}`,
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
        const user = await prisma.user.findUnique({ where: { id: session.user.id } });
        if (!user) return { error: 'User profile missing' };

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

        // 3. Notify Admin of New Paid Enrollment
        try {
            const track = await prisma.track.findUnique({ where: { id: payment.trackId } });
            
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

            await sendLMSCredentials( // Reusing the sender infrastructure for admin
                'admin@skillcred.in',
                'SkillCred Admin',
                'Approval Required',
                '' 
            ); 
            // Note: I should use sendEmail directly for more control
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
