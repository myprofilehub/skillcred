import "dotenv/config";
import { prisma } from "@/lib/db";
import fs from "fs";
import path from "path";

// Define the 8 expected tracks
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

// Helper to sanitize strings
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
    
    // We will parse the curriculum blocks.
    // A block starts when we see "__STANDARD — 8 Weeks" or "__FAST TRACK — 4 Weeks".
    
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
        
        // Check if this line is a Stream header (it usually is uppercase, e.g., "__FULLSTACK DEVELOPMENT__")
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
            // skip header rows: Wk, Phase, Topics, Project
            i += 4; 
            continue;
        }
        
        if (line.includes("FAST TRACK") && line.includes("4 Weeks")) {
            parsingBlock = "4W";
            expectedWeeks = 4;
            // skip header rows: Wk, Phase, Topics, Project
            i += 4;
            continue;
        }
        
        if (parsingBlock && expectedWeeks > 0) {
            // Read 4 lines: Week number, Phase, Topics, Project Activity
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
                i += 3; // advance by the 3 extra lines we read
                if (expectedWeeks === 0) {
                    parsingBlock = null; // finished this block
                }
            } else {
                // If it doesn't look like a number, maybe we haven't hit the content yet or it's formatted differently.
                // Just let the loop continue and evaluate the next line.
            }
        }
    }
    
    console.log("Parsed curriculum for streams:", Object.keys(curriculums));
    
    // Now, seed into DB
    const tracks = await prisma.track.findMany();
    
    // Keep the "Recordings" generic courses if we want, or wipe them. Let's keep them and add the structured ones alongside.
    // Or maybe we delete old placeholder courses? Let's leave them be for safety, just add new.
    
    for (const track of tracks) {
        // Find matching parsed curriculum
        // Track slug matches stream e.g. "Fullstack Development" -> "full-stack-dev"
        // Let's do a substring match
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
        
        // Seed 8-week Standard Course
        if (curr.standard.length > 0) {
            console.log(`Seeding 8-Week Course for ${track.title}...`);
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
        
        // Seed 4-week Fast Track Course
        if (curr.fastTrack.length > 0) {
            console.log(`Seeding 4-Week Fast Track Course for ${track.title}...`);
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
    }
    
    console.log("Seeding complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
