import "dotenv/config";
import { prisma } from "../lib/db";
import fs from "fs";
import path from "path";
import { projectsData } from "./reworked-projects-data";

// Expected streams in the blueprint
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
    console.log("=== PHASE 1: FIXING PROJECT DIFFICULTY (2 Solo / 1 Pair / 3 Capstone) ===");
    for (const [slug, projects] of Object.entries(projectsData)) {
        const track = await prisma.track.findUnique({ where: { slug } });
        if (!track) continue;

        const dbProjects = await prisma.projectCatalogItem.findMany({
            where: { trackId: track.id },
            orderBy: { createdAt: "asc" }
        });

        // Ensure we have 6 projects
        if (dbProjects.length !== 6) {
            console.warn(`Track ${slug} has ${dbProjects.length} projects instead of 6.`);
            continue;
        }

        // Apply 2/1/3 breakdown (0,1 -> 3; 2 -> 4; 3,4,5 -> 5)
        for (let i = 0; i < dbProjects.length; i++) {
            let diff = 3; // Solo
            if (i === 2) diff = 4; // Pair
            if (i >= 3) diff = 5; // Capstone

            await prisma.projectCatalogItem.update({
                where: { id: dbProjects[i].id },
                data: { difficulty: diff }
            });
        }
        console.log(`Updated difficulties for track: ${track.title}`);
    }

    console.log("\n=== PHASE 2: CLEARING OLD CURRICULUM SYLLABUS ===");
    await prisma.lesson.deleteMany({});
    await prisma.courseModule.deleteMany({});
    await prisma.course.deleteMany({});
    console.log("Cleared old courses, modules, and lessons.");

    console.log("\n=== PHASE 3: PARSING BLUEPRINT FOR SYLLABUS ===");
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
    
    console.log("\n=== PHASE 4: SEEDING NEW CURRICULUMS (8-Week, 4-Week, 2-Week Capstone Track) ===");
    const tracks = await prisma.track.findMany({ include: { catalogProjects: { orderBy: { createdAt: "asc" } } } });
    
    for (const track of tracks) {
        let matchStream = "";
        for (const s of Object.keys(curriculums)) {
            if (s.toLowerCase().includes(track.title.toLowerCase().split(' ')[0])) {
                matchStream = s;
                break;
            }
        }
        
        if (!matchStream) {
            console.log(`No parsed curriculum found for Track: ${track.title}`);
            continue;
        }
        
        const curr = curriculums[matchStream];

        // Ensure we assign proper projects to proper weeks
        const capstoneProjects = track.catalogProjects.filter((p: any) => p.difficulty >= 5);
        if (capstoneProjects.length === 0) {
            // fallback if DB update hasn't propagated or it's empty
            capstoneProjects.push(track.catalogProjects[3], track.catalogProjects[4], track.catalogProjects[5]);
        }
        
        // --------------------------------------------------------------------
        // SEED 8-WEEK STANDARD COURSE
        // --------------------------------------------------------------------
        if (curr.standard.length > 0) {
            const c8 = await prisma.course.create({
                data: {
                    trackId: track.id,
                    title: `${track.title} - Standard (8 Weeks)`,
                    description: "Comprehensive 8-week project-based learning curriculum."
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
                            duration: 240
                        }
                    });
                }
            }
        }
        
        // --------------------------------------------------------------------
        // SEED 4-WEEK FAST TRACK COURSE
        // --------------------------------------------------------------------
        if (curr.fastTrack.length > 0) {
            const c4 = await prisma.course.create({
                data: {
                    trackId: track.id,
                    title: `${track.title} - Fast Track (4 Weeks)`,
                    description: "Accelerated 4-week project-based learning curriculum."
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

        // --------------------------------------------------------------------
        // SEED 2-WEEK CAPSTONE TRACK COURSE
        // --------------------------------------------------------------------
        console.log(`Seeding 2-Week Capstone Track for ${track.title}...`);
        const c2 = await prisma.course.create({
            data: {
                trackId: track.id,
                title: `${track.title} - Capstone Track (2 Weeks)`,
                description: "Intense 2-week program focusing entirely on building the 3 capstone projects."
            }
        });

        // Capstone Week 1: Two Capstones
        const mod1 = await prisma.courseModule.create({
            data: { courseId: c2.id, title: `Week 1: Foundations & Initial Capstones`, order: 1 }
        });
        await prisma.lesson.create({
            data: {
                moduleId: mod1.id,
                title: `Project Activity: ${capstoneProjects[0]?.name || "Capstone 1"}`,
                type: "ASSIGNMENT",
                duration: 600
            }
        });
        await prisma.lesson.create({
            data: {
                moduleId: mod1.id,
                title: `Project Activity: ${capstoneProjects[1]?.name || "Capstone 2"}`,
                type: "ASSIGNMENT",
                duration: 600
            }
        });

        // Capstone Week 2: Final Capstone & Demo
        const mod2 = await prisma.courseModule.create({
            data: { courseId: c2.id, title: `Week 2: Final Capstone & Demo Day`, order: 2 }
        });
        await prisma.lesson.create({
            data: {
                moduleId: mod2.id,
                title: `Project Activity: ${capstoneProjects[2]?.name || "Capstone 3"}`,
                type: "ASSIGNMENT",
                duration: 600
            }
        });
        await prisma.lesson.create({
            data: {
                moduleId: mod2.id,
                title: `Project Defense & Demo Day Preparation`,
                type: "READING",
                contentUrl: "https://skillcred.com/library",
                duration: 120
            }
        });
    }
    
    console.log("\nSeeding complete! Curriculums and difficulties updated.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
