'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { sendLMSCredentials, sendEmail } from '@/lib/email';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

export async function processBatchEnrollment(formData: FormData) {
    try {
        const trackSlug = formData.get('trackSlug') as string;
        const phone = formData.get('phone') as string;
        const city = formData.get('city') as string;
        const college = formData.get('college') as string;
        const graduationYear = formData.get('year') as string;
        const experience = formData.get('experienceLevel') as string;
        const source = formData.get('heardAboutUs') as string;
        
        // Fixed to 4-week for pilot batch
        const duration = '4-week';

        const providedName = formData.get('name') as string;
        const providedEmail = (formData.get('email') as string).toLowerCase().trim();

        if (!providedName || !providedEmail) return { error: 'Name and Email are required' };
        if (!trackSlug) return { error: 'Stream selection is required' };

        const track = await prisma.track.findUnique({ where: { slug: trackSlug } });
        const allowedSlugs = ['ai-ml', 'data-engineering', 'data-science'];
        if (!track || !allowedSlugs.includes(track.slug)) return { error: 'Invalid or restricted stream selected' };

        // --- PRICING ENGINE ---
        const isTier1 = ['ai-ml', 'data-engineering'].includes(track.slug);
        const isTier2 = track.slug === 'data-science';

        let finalPrice = 1999; // Fallback
        if (isTier1) finalPrice = 2999;
        else if (isTier2) finalPrice = 2499;

        // Save Resume File
        let resumeUrl = null;
        const resumeFile = formData.get('resume') as File | null;
        if (resumeFile && resumeFile.size > 0) {
            const bytes = await resumeFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const cleanName = resumeFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const fileName = `${Date.now()}-${cleanName}`;

            const uploadDir = join(process.cwd(), 'public', 'uploads', 'resumes');
            await mkdir(uploadDir, { recursive: true });

            const filePath = join(uploadDir, fileName);
            await writeFile(filePath, buffer);

            resumeUrl = `/uploads/resumes/${fileName}`;
        }

        const extraDetails = [
            city ? `City: ${city}` : null,
            experience ? `Experience: ${experience}` : null,
            source ? `Source: ${source}` : null
        ].filter(Boolean).join(' | ');

        // 1. Look up or create User
        let user = await prisma.user.findUnique({ where: { email: providedEmail } });
        
        if (!user) {
            // Check if phone exists on another user
            if (phone) {
                const existingUserWithPhone = await prisma.user.findUnique({
                    where: { mobile: phone }
                });
                if (existingUserWithPhone) {
                    return { error: 'This phone number is already registered to another account' };
                }
            }
            
            user = await prisma.user.create({
                data: {
                    name: providedName,
                    email: providedEmail,
                    mobile: phone || null,
                    password: await bcrypt.hash(randomBytes(16).toString('hex'), 10), // Random secure pass
                }
            });
        } else {
            // Update name/phone if they provided new ones
            await prisma.user.update({
                where: { id: user.id },
                data: { 
                    ...(phone ? { mobile: phone } : {}),
                    name: providedName,
                }
            });
            // Re-fetch to ensure we have latest details
            user = await prisma.user.findUnique({ where: { id: user.id } }) as typeof user;
        }

        const userId = user.id;

        // 2. Setup Student Profile
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

        // 3. Update Portfolio
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

        // 4. Create PENDING Payment (Transition from Free to 40% Discounted)
        const payment = await prisma.payment.create({
            data: {
                userId: userId,
                amount: finalPrice,
                currency: 'INR',
                status: 'PENDING',
                provider: 'RAZORPAY',
                trackId: track.id,
                programDuration: duration,
                couponCode: 'SKILLCRED_40_OFF',
            }
        });

        revalidatePath('/dashboard');
        return { 
            success: true,
            orderId: payment.id,
            amount: payment.amount,
            currency: payment.currency,
            projectName: `Fast Track: ${track.slug === 'data-science' ? 'Data Science & Analytics' : track.title}`
        };

    } catch (error: any) {
        console.error('Batch Enrollment processing failed:', error);
        return { error: `Failed to process enrollment: ${error.message || error}` };
    }
}
