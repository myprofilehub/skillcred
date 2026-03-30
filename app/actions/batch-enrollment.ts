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
        if (!track) return { error: 'Invalid stream selected' };

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

        // 4. Create Active Enrollment (No Payment Needed!)
        const enrollment = await prisma.enrollment.upsert({
            where: {
                studentId_trackId: {
                    studentId: student.id,
                    trackId: track.id
                }
            },
            create: {
                studentId: student.id,
                trackId: track.id,
                programDuration: duration,
                couponCode: 'BATCH_FREE',
                status: 'ACTIVE',
                progress: 0,
                mentorId: null
            },
            update: {
                programDuration: duration,
                couponCode: 'BATCH_FREE',
                status: 'ACTIVE'
            }
        });

        // 5. Generate LMS Credentials (if not exists) & Send Email
        if (!user.username || !user.lmsEmail) {
            const nameParts = (user.name || "student").toLowerCase().split(" ");
            const baseUsername = `${nameParts[0]}.${nameParts[1] || ""}`.replace(/[^a-z0-9.]/g, "");
            const randomSuffix = Math.floor(1000 + Math.random() * 9000);
            const username = `${baseUsername}${randomSuffix}`;
            const lmsEmail = `${username}@skillcred.com`;

            const tempPassword = Math.random().toString(36).slice(-8) + "Aa1!";
            const hashedPassword = await bcrypt.hash(tempPassword, 10);

            await prisma.user.update({
                where: { id: userId },
                data: {
                    username: username,
                    lmsEmail: lmsEmail,
                    password: hashedPassword,
                    forcePasswordChange: true
                }
            });

            try {
                await sendLMSCredentials(
                    providedEmail,
                    user.name || "Student",
                    lmsEmail,
                    tempPassword
                );
            } catch (emailErr) {
                console.error("Student Email sending exception:", emailErr);
            }
        }

        // 6. Send Admin Notification
        try {
            const adminHtmlContent = `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #06b6d4;">New Pilot Batch Enrollment</h1>
                    </div>
                    
                    <p>Admin,</p>
                    
                    <p>A new student has registered for the Free 4-Week Pilot Batch. Here are their details:</p>
                    
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Name:</strong> ${providedName}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${providedEmail}</p>
                        <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>City:</strong> ${city || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>College:</strong> ${college || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Graduation Year:</strong> ${graduationYear || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Experience Level:</strong> ${experience || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Stream Selected:</strong> ${track.title}</p>
                    </div>
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #888;">This is an automated notification from SkillCred LMS.</p>
                </div>
            </body>
            </html>
            `;

            await sendEmail({
                to: [{ email: 'admin@skillcred.in', name: 'SkillCred Admin' }],
                subject: `New Batch Enrollment: ${providedName} - ${track.title}`,
                htmlContent: adminHtmlContent
            });
        } catch (adminErr) {
            console.error("Admin Email sending exception:", adminErr);
        }

        revalidatePath('/dashboard');
        return { success: true };

    } catch (error: any) {
        console.error('Batch Enrollment processing failed:', error);
        return { error: `Failed to process enrollment: ${error.message || error}` };
    }
}
