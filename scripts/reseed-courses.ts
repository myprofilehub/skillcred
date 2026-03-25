import "dotenv/config";
import { prisma } from "../lib/db";
import fs from "fs";
import path from "path";

// Define the 8 expected tracks matching the blueprint markdown
const STREAM_NAMES = [
  "Fullstack Development",
  "AI & Machine Learning",
  "Cybersecurity",
  "Data Engineering",
  "DevOps & Cloud",
  "Mobile Development",
  "IoT & Embedded Systems",
  "Data Science & Analytics"
];

const clean = (str: string) => str.replace(/__/g, "").trim();

async function main() {
    console.log("Reading Blueprint...");
    const blueprintPath = path.join(process.cwd(), "blueprint_utf8.md");
    if (!fs.existsSync(blueprintPath)) {
        console.error("Blueprint not found at:", blueprintPath);
        return;
    }
    
    const content = fs.readFileSync(blueprintPath, "utf-8");
    const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    let currentStream = "";
    let parsingBlock: "8W" | "4W" | null = null;
    let expectedWeeks = 0;
    
    interface ModuleData {
        week: number;
        title: string;
        topics: string;
        projectActivity: string;
    }
    
    interface Curriculum {
        standard: ModuleData[];
        fastTrack: ModuleData[];
    }
    
    const curriculums: Record<string, Curriculum> = {};
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        for (const stream of STREAM_NAMES) {
            if (line.includes(stream.toUpperCase()) || line.replace(/__/g, '') === stream.toUpperCase()) {
                currentStream = stream;
                if (!curriculums[currentStream]) {
                    curriculums[currentStream] = { standard: [], fastTrack: [] };
                }
            }
        }
        
        if (!currentStream) continue;
        
        if (line.includes("STANDARD") && line.includes("8 Weeks")) {
            parsingBlock = "8W";
            expectedWeeks = 8;
            i += 4; 
            continue;
        }
        
        if (line.includes("FAST TRACK") && line.includes("4 Weeks")) {
            parsingBlock = "4W";
            expectedWeeks = 4;
            i += 4;
            continue;
        }
        
        if (parsingBlock && expectedWeeks > 0) {
            const weekStr = clean(lines[i]);
            const phase = clean(lines[i+1] || "");
            const topics = clean(lines[i+2] || "");
            const project = clean(lines[i+3] || "");
            
            const weekNum = parseInt(weekStr);
            if (!isNaN(weekNum) && weekNum >= 1 && weekNum <= 8) {
                const mod: ModuleData = {
                    week: weekNum,
                    title: phase,
                    topics: topics,
                    projectActivity: project
                };
                
                if (parsingBlock === "8W") {
                    curriculums[currentStream].standard.push(mod);
                } else {
                    curriculums[currentStream].fastTrack.push(mod);
                }
                
                expectedWeeks--;
                i += 3;
                if (expectedWeeks === 0) {
                    parsingBlock = null;
                }
            }
        }
    }
    
    console.log("Parsed curriculum for streams:", Object.keys(curriculums));
    
    // Explicit mapping from DB track.slug to parsed STREAM_NAMES
    const slugToStream: Record<string, string> = {
        "full-stack": "Fullstack Development",
        "ai-ml": "AI & Machine Learning",
        "cybersecurity": "Cybersecurity",
        "data-engineering": "Data Engineering",
        "devops-cloud": "DevOps & Cloud",
        "mobile-development": "Mobile Development",
        "iot-embedded": "IoT & Embedded Systems",
        "data-science": "Data Science & Analytics"
    };

    // Now, seed into DB
    const tracks = await prisma.track.findMany();
    
    for (const track of tracks) {
        const matchStream = slugToStream[track.slug];
        
        if (!matchStream || !curriculums[matchStream]) {
            console.log(`No parsed curriculum found for Track: ${track.title} (${track.slug})`);
            continue;
        }
        
        console.log(`\nProcessing track: ${track.title} (${track.slug}) with parsed stream data from ${matchStream}`);

        // Wipe existing courses for this track to start fresh
        const oldCourses = await prisma.course.findMany({ where: { trackId: track.id } });
        const oldCourseIds = oldCourses.map((c: { id: string }) => c.id);

        if (oldCourseIds.length > 0) {
            await prisma.lesson.deleteMany({
                where: { module: { courseId: { in: oldCourseIds } } }
            });
            await prisma.courseModule.deleteMany({
                where: { courseId: { in: oldCourseIds } }
            });
            await prisma.course.deleteMany({
                where: { trackId: track.id }
            });
            console.log(`Deleted ${oldCourseIds.length} old courses for ${track.slug}`);
        }

        const curr = curriculums[matchStream];

        // 1. Standard Track (8 Weeks)
        if (curr.standard.length > 0) {
            const c8 = await prisma.course.create({
                data: {
                    trackId: track.id,
                    title: `${track.title} - Standard (8 Weeks)`,
                    description: "Comprehensive 8-week project-based learning curriculum covering all fundamentals and advanced concepts."
                }
            });

            for (const mod of curr.standard) {
                const dbMod = await prisma.courseModule.create({
                    data: {
                        courseId: c8.id,
                        title: `Week ${mod.week}: ${mod.title}`,
                        order: mod.week
                    }
                });

                // Add sub-lessons based on Topics
                await prisma.lesson.create({
                    data: {
                        moduleId: dbMod.id,
                        title: "Learning Materials & Concepts",
                        type: "READING",
                        contentUrl: "https://skillcred.com/library (Refer internal docs)",
                        duration: 120
                    }
                });

                // Add project assignment
                if (mod.projectActivity && mod.projectActivity.length > 2) {
                    await prisma.lesson.create({
                        data: {
                            moduleId: dbMod.id,
                            title: `Project Activity: ${mod.projectActivity}`,
                            type: "ASSIGNMENT",
                            duration: 240
                        }
                    });
                }
            }
        }

        // 2. Fast Track (4 Weeks)
        if (curr.fastTrack.length > 0) {
            const c4 = await prisma.course.create({
                data: {
                    trackId: track.id,
                    title: `${track.title} - Fast Track (4 Weeks)`,
                    description: "Accelerated 4-week project-based learning curriculum for individuals with prior experience."
                }
            });

            for (const mod of curr.fastTrack) {
                const dbMod = await prisma.courseModule.create({
                    data: {
                        courseId: c4.id,
                        title: `Week ${mod.week}: ${mod.title}`,
                        order: mod.week
                    }
                });

                await prisma.lesson.create({
                    data: {
                        moduleId: dbMod.id,
                        title: "Learning Materials & Concepts",
                        type: "READING",
                        contentUrl: "https://skillcred.com/library",
                        duration: 120
                    }
                });

                if (mod.projectActivity && mod.projectActivity.length > 2) {
                    await prisma.lesson.create({
                        data: {
                            moduleId: dbMod.id,
                            title: `Project Activity: ${mod.projectActivity}`,
                            type: "ASSIGNMENT",
                            duration: 480
                        }
                    });
                }
            }
        }

        // 3. Capstone Track (2 Weeks)
        const c2 = await prisma.course.create({
            data: {
                trackId: track.id,
                title: `${track.title} - Capstone Track (2 Weeks)`,
                description: "Skip the basics. Build and deploy 3 production-ready, highly-complex capstone projects designed specifically to pass HR technical screens."
            }
        });

        const w1 = await prisma.courseModule.create({
            data: {
                courseId: c2.id,
                title: "Week 1: Architecture & APIs",
                order: 1
            }
        });
        await prisma.lesson.create({ data: { moduleId: w1.id, title: "System Design & Architecture Planning", type: "VIDEO", duration: 90 }});
        await prisma.lesson.create({ data: { moduleId: w1.id, title: "API Development & Core Logic Execution", type: "ASSIGNMENT", duration: 600 }});

        const w2 = await prisma.courseModule.create({
            data: {
                courseId: c2.id,
                title: "Week 2: Deployment & PAT Demo",
                order: 2
            }
        });
        await prisma.lesson.create({ data: { moduleId: w2.id, title: "UI Polish & Final Integration", type: "READING", duration: 120 }});
        await prisma.lesson.create({ data: { moduleId: w2.id, title: "Cloud Deployment & Mentor Defense Preparation", type: "ASSIGNMENT", duration: 480 }});

        console.log(`Successfully seeded 3 curriculums for ${track.slug}.`);
    }

    console.log("\nAll courses re-seeded successfully with real blueprint data!");
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
