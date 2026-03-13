
import 'dotenv/config';
import { prisma } from '../lib/db';

async function main() {
    console.log('🔍 Checking Database Content...');

    // 1. Check Tracks
    const tracks = await prisma.track.findMany();
    console.log(`\n📋 Tracks found: ${tracks.length}`);
    tracks.forEach(t => console.log(` - ${t.title} (${t.slug}) ID: ${t.id}`));

    // 2. Check Projects
    const projects = await prisma.projectCatalogItem.findMany();
    console.log(`\n📚 Projects in Catalog: ${projects.length}`);
    if (projects.length > 0) {
        console.log('Sample projects:');
        projects.slice(0, 3).forEach(p => console.log(` - ${p.name} (TrackId: ${p.trackId})`));
    }

    // 3. Check Students
    const students = await prisma.student.findMany({ include: { user: true } });
    console.log(`\n👨‍🎓 Students found: ${students.length}`);
    students.forEach(s => console.log(` - ${s.user.name} (${s.user.email}) ID: ${s.id} UserID: ${s.userId}`));

    // 4. Check Enrollments
    const enrollments = await prisma.enrollment.findMany({ include: { track: true, student: { include: { user: true } } } });
    console.log(`\n📝 Enrollments found: ${enrollments.length}`);
    enrollments.forEach(e => console.log(` - ${e.student.user.email} enrolled in ${e.track.title}`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
