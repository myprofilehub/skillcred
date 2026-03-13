import 'dotenv/config';
import { prisma } from "../lib/db";

const tracks = [
    {
        title: "Full Stack Development",
        slug: "full-stack-development",
        description: "Master Node.js, React, and Databases to build enterprise-grade applications.",
        icon: "Code2",
    },
    {
        title: "AI & ML",
        slug: "ai-ml",
        description: "Dive deep into Python, TensorFlow, and Neural Networks.",
        icon: "Brain",
    },
    {
        title: "Data Engineering",
        slug: "data-engineering",
        description: "Build robust data pipelines with Python, Spark, and SQL.",
        icon: "Database",
    },
    {
        title: "IoT and Embedded",
        slug: "iot-embedded",
        description: "Become an expert with Microcontrollers, C/C++, and RTOS.",
        icon: "Cpu",
    },
    {
        title: "Cybersecurity",
        slug: "cybersecurity",
        description: "Learn ethical hacking, network security, and compliance.",
        icon: "Shield",
    },
    {
        title: "Data Science & Analytics",
        slug: "data-science",
        description: "Analyze data, build models, and drive business insights.",
        icon: "BarChart",
    },
    {
        title: "Devops & Cloud",
        slug: "devops-cloud",
        description: "Master AWS, Docker, Kubernetes, and CI/CD pipelines.",
        icon: "Cloud",
    },
    {
        title: "Mobile Development",
        slug: "mobile-development",
        description: "Build native and cross-platform mobile apps.",
        icon: "Smartphone",
    }
];

async function seed() {
    console.log("Seeding Tracks...");

    // Find a mentor to assign as default (e.g., mentor1)
    const mentor = await prisma.mentor.findFirst({
        include: { user: true }
    });

    if (!mentor) {
        console.warn("No mentor found! Tracks will be created without default mentor.");
    } else {
        console.log(`Assigning default mentor: ${mentor.user.name} (${mentor.id})`);
    }

    for (const t of tracks) {
        await prisma.track.upsert({
            where: { slug: t.slug },
            update: {
                title: t.title,
                description: t.description,
                icon: t.icon,
                defaultMentorId: mentor?.id
            },
            create: {
                title: t.title,
                slug: t.slug,
                description: t.description,
                icon: t.icon,
                defaultMentorId: mentor?.id
            }
        });
        console.log(`Processed Track: ${t.title}`);
    }
}

seed()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
