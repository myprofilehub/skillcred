import re

file_path = 'app/programs/capstone/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Match from `            {/* KEY FEATURES */}` up to `            <Footer />`
pattern = r'(            \{/\* KEY FEATURES \*/\})[\s\S]*?(            <Footer />)'

new_content = '''\\1
            <section className="py-20 bg-secondary/20 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Duration", desc: "4–5 Weeks", icon: Zap },
                            { title: "Included Streams", desc: "Cybersecurity, IoT & Embedded", icon: Target },
                            { title: "Projects", desc: "3 Major Security & Hardware Systems", icon: Laptop2 },
                            { title: "Career Focus", desc: "SOC Triage & Hardware Debug", icon: Briefcase }
                        ].map((item, i) => (
                            <Card key={i} className="bg-background/50 border-white/5 hover:bg-white/5 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400">
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
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-green-500 pl-4">
                                Is Embedded & Security right for you?
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    { text: "Engineers interested in low-level hardware design and IoT", icon: Target },
                                    { text: "Professionals targeting Cybersecurity analysis and SOC roles", icon: Laptop2 },
                                    { text: "Learners who want to master real-world hardware debug cycles", icon: Briefcase },
                                    { text: "Individuals looking for a highly specialized, technical niche", icon: Zap }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5">
                                        <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-background rounded-3xl p-8 border border-green-500/20 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -top-10 -right-10" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <Clock className="w-6 h-6 text-green-500" /> Program Structure
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h4 className="font-bold text-green-600 dark:text-green-400">Weeks 1-2: Security Fundamentals</h4>
                                    <p className="text-sm text-muted-foreground">Network analysis, penetration testing basics, and threat modeling.</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div>
                                    <h4 className="font-bold text-green-600 dark:text-green-400">Weeks 3-4: IoT & Hardware Systems</h4>
                                    <p className="text-sm text-muted-foreground">Embedded C, microcontrollers, and debugging hardware loops.</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div>
                                    <h4 className="font-bold text-green-600 dark:text-green-400">Week 5: SOC Defense Capstone</h4>
                                    <p className="text-sm text-muted-foreground">Live SOC triage drills and final hardware defense PAT demo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-3xl text-center border border-white/10 rounded-3xl bg-secondary/10 p-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Secure the Future.</h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                        Master the complexities of modern cybersecurity and embedded hardware systems.
                    </p>
                    <Button size="lg" className="h-14 px-8 text-lg bg-green-600 hover:bg-green-700 text-white" asChild>
                        <Link href="/enroll">Enroll in Embedded & Security</Link>
                    </Button>
                </div>
            </section>

\\2'''

# Add Clock import if not present
if 'import { Clock' not in content:
    content = content.replace('import { Button } from "@/components/ui/button";', 'import { Button } from "@/components/ui/button";\nimport { Clock } from "lucide-react";')

content = re.sub(pattern, new_content, content, count=1)

with open(file_path, 'w') as f:
    f.write(content)
print("Updated capstone")
