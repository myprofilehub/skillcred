import "dotenv/config";
import { prisma } from "@/lib/db";

async function main() {
    console.log("Looking for placeholder recording courses...");
    
    // Find all courses that have "Recordings" in their title
    const placeholderCourses = await prisma.course.findMany({
        where: {
            title: {
                contains: "Recordings",
                mode: "insensitive"
            }
        },
        include: {
            modules: {
                include: {
                    lessons: true
                }
            }
        }
    });
    
    console.log(`Found ${placeholderCourses.length} placeholder courses to delete.`);
    
    if (placeholderCourses.length === 0) {
        console.log("No placeholder courses found. Exiting.");
        return;
    }
    
    // Delete in order to respect foreign key constraints:
    // 1. Lessons
    // 2. CourseModules  
    // 3. Courses
    
    for (const course of placeholderCourses) {
        console.log(`Deleting course: ${course.title}...`);
        
        for (const module of course.modules) {
            // Delete lessons
            if (module.lessons.length > 0) {
                const lessonIds = module.lessons.map(l => l.id);
                console.log(`  Deleting ${lessonIds.length} lessons in module '${module.title}'`);
                // delete progress first if any exists
                await prisma.lessonProgress.deleteMany({
                    where: { lessonId: { in: lessonIds } }
                });
                
                await prisma.lesson.deleteMany({
                    where: { moduleId: module.id }
                });
            }
        }
        
        // Delete modules
        const moduleIds = course.modules.map(m => m.id);
        if (moduleIds.length > 0) {
            console.log(`  Deleting ${moduleIds.length} modules`);
            await prisma.courseModule.deleteMany({
                where: { courseId: course.id }
            });
        }
        
        // Delete course
        await prisma.course.delete({
            where: { id: course.id }
        });
        
        console.log(`  Successfully deleted course: ${course.title}`);
    }
    
    console.log("Cleanup complete!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
