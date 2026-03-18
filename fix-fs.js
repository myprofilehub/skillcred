const fs = require('fs');

const file = 'app/streams/full-stack-development/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\{\/\* PROJECT ROADMAP \*\/\}[\s\S]*?<ProjectRoadmap trackSlug="full-stack" accentColor="orange" \/>[\s\S]*?\{\/\* SYLLABUS BY PROGRAM \*\/\}[\s\S]*?<CurriculumSyllabus trackSlug="full-stack-development" \/>/;

const replacement = `{/* CURRICULUM & ROADMAP */}
            <section className="py-20 bg-secondary/10">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-8 lg:gap-12 items-start">
                        {/* LEFT PANEL: Curriculum by Program */}
                        <div>
                            <CurriculumSyllabus trackSlug="full-stack-development" />
                        </div>
                        
                        {/* RIGHT PANEL: Project Roadmap */}
                        <div className="lg:border-l border-white/10 lg:pl-8 xl:pl-12">
                            <ProjectRoadmap trackSlug="full-stack" accentColor="orange" />
                        </div>
                    </div>
                </div>
            </section>`;

const newContent = content.replace(regex, replacement);

if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated Full Stack`);
} else {
    console.log(`Failed to match regex on Full Stack`);
}
