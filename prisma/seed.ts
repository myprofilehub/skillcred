import 'dotenv/config';
import { prisma } from '../lib/db';

const tracks = [
    { title: "AI & ML", slug: "ai-ml", description: "Master Neural Networks & Vision", icon: "Brain" },
    { title: "Data Science", slug: "data-science", description: "Data Analysis with Python", icon: "Database" },
    { title: "Python Fullstack", slug: "python-fullstack", description: "Django & FastEX Development", icon: "Code" },
    { title: "Java Fullstack", slug: "java-fullstack", description: "Spring Boot & Microservices", icon: "Coffee" },
    { title: "Fullstack Web development", slug: "fullstack-web", description: "MERN Stack Application Building", icon: "Globe" },
    { title: "mobile-development", slug: "mobile-development", description: "Selenium & Test Automation", icon: "Bot" },
    { title: "Devops & Cloud", slug: "devops-cloud", description: "AWS, Docker & Kubernetes", icon: "Cloud" },
    { title: "Cybersecurity", slug: "cybersecurity", description: "Ethical Hacking & Network Security", icon: "Shield" },
];

const recordedSessions = [
    { track: "AI & ML", title: "Intro to Neural Networks", duration: 90, url: "https://www.youtube.com/watch?v=aircAruvnKk" }, // 3Blue1Brown
    { track: "AI & ML", title: "Computer Vision Basics", duration: 105, url: "https://www.youtube.com/watch?v=OcycT1Jwsns" },
    { track: "Data Science", title: "Pandas & NumPy Masterclass", duration: 115, url: "https://www.youtube.com/watch?v=vmEHCJofslg" },
    { track: "Python Fullstack", title: "Django REST Framework", duration: 130, url: "https://www.youtube.com/watch?v=cMtaYR311cQ" },
    { track: "Fullstack Web development", title: "React & Next.js scaling", duration: 95, url: "https://www.youtube.com/watch?v=9P8mASSREYM" },
    { track: "Devops & Cloud", title: "Docker & Kubernetes Intro", duration: 120, url: "https://www.youtube.com/watch?v=pTFZFxd4hOI" },
];

async function main() {
    console.log("Start seeding...");

    // Create Tracks
    for (const t of tracks) {
        const track = await prisma.track.upsert({
            where: { slug: t.slug },
            update: {},
            create: {
                title: t.title,
                slug: t.slug,
                description: t.description,
                icon: t.icon
            }
        });

        console.log(`Created track: ${track.title}`);

        // Create Default Course for Recorded Sessions
        const course = await prisma.course.create({
            data: {
                title: `${t.title} Recordings`,
                description: "Archive of live sessions and tutorials",
                trackId: track.id,
                modules: {
                    create: {
                        title: "Recent Sessions",
                        order: 1
                    }
                }
            }
        });

        // Add specific videos if they match
        const sessions = recordedSessions.filter(s => s.track === t.title);
        for (const s of sessions) {
            // Get the module we just created
            const module = await prisma.courseModule.findFirst({
                where: { courseId: course.id }
            });

            if (module) {
                await prisma.lesson.create({
                    data: {
                        title: s.title,
                        type: "VIDEO",
                        contentUrl: s.url,
                        duration: s.duration,
                        moduleId: module.id
                    }
                });
                console.log(`Added lesson ${s.title} to ${t.title}`);
            }
        }
    }

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


