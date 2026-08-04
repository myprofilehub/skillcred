import re

file_path = 'app/programs/fast-track/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Match from `            {/* KEY FEATURES */}` up to `            <Footer />`
pattern = r'(            \{/\* KEY FEATURES \*/\})[\s\S]*?(            <Footer />)'

new_content = '''\\1
            <section className="py-20 bg-secondary/20 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Duration", desc: "5–6 Weeks", icon: Zap },
                            { title: "Included Streams", desc: "DevOps, Data Eng, Data Science", icon: Target },
                            { title: "Projects", desc: "5 Major Data Pipelines & Cloud deployments", icon: Laptop2 },
                            { title: "Career Focus", desc: "System Design & Infrastructure", icon: Briefcase }
                        ].map((item, i) => (
                            <Card key={i} className="bg-background/50 border-white/5 hover:bg-white/5 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-400">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO IS THIS FOR / SYLLABUS OVERVIEW */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-blue-500 pl-4">
                                Is Data & Platform right for you?
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    { text: "Engineers wanting to transition into Data Engineering or Cloud Architecture", icon: Target },
                                    { text: "Learners focused on backend scale, ETL pipelines, and Big Data", icon: Laptop2 },
                                    { text: "Professionals needing a verifiable cloud infrastructure portfolio", icon: Briefcase },
                                    { text: "Individuals looking to ace System Design interviews", icon: Zap }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5">
                                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-background rounded-3xl p-8 border border-blue-500/20 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -top-10 -right-10" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <FastForward className="w-6 h-6 text-blue-500" /> Program Structure
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h4 className="font-bold text-blue-600 dark:text-blue-400">Weeks 1-2: Data Pipelines & Cloud</h4>
                                    <p className="text-sm text-muted-foreground">Setting up AWS/GCP architecture and robust ETL processing.</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div>
                                    <h4 className="font-bold text-blue-600 dark:text-blue-400">Weeks 3-4: Advanced Analytics</h4>
                                    <p className="text-sm text-muted-foreground">Machine learning integration and data science fundamentals.</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div>
                                    <h4 className="font-bold text-blue-600 dark:text-blue-400">Weeks 5-6: System Design Capstone</h4>
                                    <p className="text-sm text-muted-foreground">Scaling infrastructure and final PAT Demo defense.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-3xl text-center border border-white/10 rounded-3xl bg-secondary/10 p-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Master Data & Cloud Infrastructure</h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                        Build highly scalable systems and data pipelines to stand out to top engineering teams.
                    </p>
                    <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white" asChild>
                        <Link href="/enroll">Enroll in Data & Platform</Link>
                    </Button>
                </div>
            </section>

\\2'''

content = re.sub(pattern, new_content, content, count=1)

with open(file_path, 'w') as f:
    f.write(content)
print("Updated fast-track")
