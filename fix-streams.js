const fs = require('fs');

const filesToFix = [
  'app/streams/full-stack-development/page.tsx',
  'app/streams/ai-ml/page.tsx',
  'app/streams/cybersecurity/page.tsx',
  'app/streams/data-engineering/page.tsx',
  'app/streams/data-science/page.tsx',
  'app/streams/devops-cloud/page.tsx',
  'app/streams/iot-embedded/page.tsx',
  'app/streams/mobile-development/page.tsx',
];

for (const file of filesToFix) {
    if (!fs.existsSync(file)) {
        console.log(`File not found: ${file}`);
        continue;
    }
    let content = fs.readFileSync(file, 'utf8');
    
    // Extract the slug from the path (e.g. "full-stack-development")
    const streamSlug = file.split('/')[2];
    
    // The ProjectRoadmap uses a shorter accent color string, so we'll extract it from the existing tag.
    const roadmapMatch = content.match(/<ProjectRoadmap trackSlug="([^"]+)" accentColor="([^"]+)" \/>/);
    if (!roadmapMatch) {
        console.log(`Could not find ProjectRoadmap in ${file}`);
        continue;
    }
    
    const [, rSlug, accentColor] = roadmapMatch;
    
    // Regex to find the two tags and replace them with the flex/grid wrapper
    const searchRegex = new RegExp(`\\{\\/\\* PROJECT ROADMAP \\*\\/\\}[\\s\\S]*?<ProjectRoadmap trackSlug="${rSlug}" accentColor="${accentColor}" \\/>[\\s\\S]*?\\{\\/\\* SYLLABUS BY PROGRAM \\*\\/\\}[\\s\\S]*?<CurriculumSyllabus trackSlug="${streamSlug}" \\/>`);

    const replacement = `{/* CURRICULUM & ROADMAP */}
            <section className="py-20 bg-secondary/10">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-8 lg:gap-12 items-start">
                        {/* LEFT PANEL: Curriculum by Program */}
                        <div>
                            <CurriculumSyllabus trackSlug="${streamSlug}" />
                        </div>
                        
                        {/* RIGHT PANEL: Project Roadmap */}
                        <div className="lg:border-l border-white/10 lg:pl-8 xl:pl-12">
                            <ProjectRoadmap trackSlug="${rSlug}" accentColor="${accentColor}" />
                        </div>
                    </div>
                </div>
            </section>`;

    const newContent = content.replace(searchRegex, replacement);
    
    if (newContent !== content) {
        fs.writeFileSync(file, newContent);
        console.log(`Updated ${file}`);
    } else {
        console.log(`Failed to match regex in ${file}`);
    }
}
