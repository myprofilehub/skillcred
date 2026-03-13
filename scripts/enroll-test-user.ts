
import 'dotenv/config';
import { prisma } from '../lib/db';

async function main() {
    const userEmail = 'mentor1@codequestzone.com'; // testuser1
    const targetStreams = ['cybersecurity', 'cloud-devops'];
    console.log(`🔍 Enrolling user ${userEmail}...`);

    // 1. Find Student
    const student = await prisma.student.findFirst({
        where: { user: { email: userEmail } },
        include: { user: true }
    });

    if (!student) {
        console.error('❌ User not found as student. converting user to student...');
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        if (!user) throw new Error('User not found');

        await prisma.student.create({ data: { userId: user.id } });
        console.log('✅ Created student profile');
        return main(); // Retry
    }

    // 2. Find Tracks
    const tracks = await prisma.track.findMany({
        where: { slug: { in: targetStreams } }
    });

    // 3. Create Enrollments
    for (const track of tracks) {
        const exists = await prisma.enrollment.findUnique({
            where: {
                studentId_trackId: {
                    studentId: student.id,
                    trackId: track.id
                }
            }
        });

        if (!exists) {
            await prisma.enrollment.create({
                data: {
                    studentId: student.id,
                    trackId: track.id,
                    status: 'ACTIVE',
                    progress: 0
                }
            });
            console.log(`✅ Enrolled in ${track.title}`);
        } else {
            console.log(`🔹 Already enrolled in ${track.title}`);
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
