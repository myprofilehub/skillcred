import { StreamBottomCTA } from "@/components/public/stream-pricing-components";
import { StreamHeroActionCard } from "@/components/public/stream-hero-action-card";
import { StreamPortfolioPreview } from "@/components/public/stream-portfolio-preview";
import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    CheckCircle2,
    Download,
    ArrowRight,
    Globe,
    Database,
    Server,
    Layout,
    Lock,
    Briefcase,
    GraduationCap,
    MessageSquare,
    FileCheck,
    Layers,
    ShoppingCart,
    AlertTriangle,
    ClipboardCheck,
    Award,
    Terminal,
    Code2,
    Cloud
} from "lucide-react";
import Link from "next/link";



import { auth } from "@/auth";

export default async function IotEmbeddedPage() {
    const session = await auth();
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        IoT and Embedded DEVELOPMENT TRACK
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Design, Build, & Deploy<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                            Complete Web Applications
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Learn to create modern, scalable web apps through mentor-guided, real-world projects covering frontend, backend, and deployment.
                    </p>

                    
                    <div className="flex justify-center gap-6 mt-8 mb-4 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Next Cohort</span><span>Starts 1st</span></div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Duration</span><span>8-10 Weeks</span></div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Format</span><span>100% Online</span></div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Live mentor support
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 4 real-world projects
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified portfolio
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Project-based assessment
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> HR-visible skill profile
                        </div>
                    </div>

                    <div className="w-full mt-12 text-left">
                        <StreamHeroActionCard
                            slug="iot-embedded"
                            accentColor="green"
                            trackName="IoT & Embedded Track"
                                syllabusUrl="/brochures/SkillCred_IoT_Embedded_Brochure.pdf"
                        />
                    </div>
                </div>
            </section>

            {/* WHY & WHO SECTION */}
            <section className="py-20 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Why This Track */}
                        <div>
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-emerald-500 pl-4">
                                Why This Track?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Master the art of building complete web solutions. From pixel-perfect UIs to robust APIs and database architectures, this track covers it all.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { text: "Responsive UI development", icon: Layout },
                                    { text: "Backend API creation", icon: Server },
                                    { text: "Database design & integration", icon: Database },
                                    { text: "Authentication & security basics", icon: Lock },
                                    { text: "Deployment & hosting", icon: Cloud }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/5">
                                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm">
                                <span className="font-bold">Industry-Relevant Outcome:</span> Students build production-style applications similar to startup and enterprise systems.
                            </div>
                        </div>

                        {/* Who This Track Is For */}
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold font-heading mb-6">Who This Track Is For</h2>
                            <ul className="space-y-4">
                                {[
                                    "College students (any stream)",
                                    "Beginners in web development",
                                    "Career switchers",
                                    "Design + tech enthusiasts",
                                    "Future startup founders"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-300">
                                <span className="font-semibold">Note:</span> No prior coding required — basics are included.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LEARNING TOOLS & METHODOLOGY */}
            <section className="py-24 bg-slate-50/40 dark:bg-slate-900/20 border-y border-slate-200 dark:border-white/5">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-950 dark:text-white">
                            Learning Tools and Methodology
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg">
                            Master an industry-standard technical stack through our hands-on engineering pedagogy and structured practice.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                        {/* Column 1: Tools */}
                        <div className="p-8 rounded-3xl bg-background border border-slate-200 dark:border-white/10 shadow-sm flex flex-col">
                            <h3 className="text-2xl font-bold font-heading mb-6 text-slate-900 dark:text-white">
                                Tools You Will Master
                            </h3>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                        {[
                            { name: "HTML/CSS/JS", sub: "Core Web Tech", color: "text-orange-400" },
                            { name: "React/Vue/Angular", sub: "Frontend Frameworks", color: "text-emerald-400" },
                            { name: "Node.js / Express", sub: "Backend Runtime", color: "text-green-400" },
                            { name: "SQL / NoSQL", sub: "Databases", color: "text-yellow-400" },
                            { name: "REST APIs", sub: "Communication", color: "text-teal-400" },
                            { name: "Git & GitHub", sub: "Version Control", color: "text-gray-400" },
                            { name: "Docker", sub: "Containerization", color: "text-teal-500" },
                            { name: "AWS / Vercel", sub: "Cloud Hosting", color: "text-purple-400" }
                        ].map((tool) => (
                            <div key={tool.name} className="text-center p-6 rounded-xl bg-secondary/30 w-44 hover:bg-secondary/50 transition-colors border border-white/5">
                                <div className={`text-lg font-bold mb-1 ${tool.color}`}>{tool.name}</div>
                                <div className="text-xs text-muted-foreground">{tool.sub}</div>
                            </div>
                        ))}
                    </div>
                        </div>

                        {/* Column 2: Methodology */}
                        <div className="p-8 rounded-3xl bg-background border border-slate-200 dark:border-white/10 shadow-sm flex flex-col">
                            <h3 className="text-2xl font-bold font-heading mb-6 text-slate-900 dark:text-white">
                                How You Will Learn
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { title: "Live Mentor Sessions", desc: "Project-led guidance", icon: Briefcase },
                            { title: "Weekly Coding Challenges", desc: "Sharpen your logic", icon: Code2 },
                            { title: "Real Architecture", desc: "Build scalable apps", icon: Layers },
                            { title: "Step-by-step", desc: "Project building", icon: CheckCircle2 },
                            { title: "Code Reviews", desc: "Feedback & optimization", icon: MessageSquare },
                            { title: "Recorded Modules", desc: "Learn at your pace", icon: FileCheck },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-background/50">
                                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                        </div>
                    </div>
                </div>
            </section>

            <StreamPortfolioPreview
                variant="roadmap"
            slug="iot-embedded"
            accentColor="green"
            skills={['React', 'Node.js', 'APIs', 'Databases']}
            outcomes={['Full Stack Developer', 'Web Application Developer', 'Frontend Engineer', 'Backend Engineer', 'Junior Software Engineer']}
            projects={[{'title': 'Smart Home Controller', 'desc': 'ESP32 home control firmware written in Embedded C with FreeRTOS multitasking.', 'tech': ['Embedded C', 'ESP32', 'FreeRTOS', 'UART'], 'metrics': [{'name': 'Task Jitter (ms)', 'score': 95}, {'name': 'Memory Overhead', 'score': 91}], 'githubUrl': 'https://github.com/skillcred/smarthome-fw', 'liveUrl': 'https://smarthome.skillcred.in'}, {'title': 'Network Gateway Hub', 'desc': 'Raspberry Pi gateway communicating with peripheral nodes via MQTT.', 'tech': ['C++', 'Raspberry Pi', 'MQTT', 'Linux'], 'metrics': [{'name': 'MQTT Drop Rate', 'score': 98}, {'name': 'Throughput', 'score': 93}], 'githubUrl': 'https://github.com/skillcred/gateway-hub', 'liveUrl': 'https://gateway.skillcred.in'}]}
            />

            {/* SEPARATE PORTFOLIO OUTPUT SECTION */}
            <StreamPortfolioPreview
                variant="default"
            slug="iot-embedded"
            accentColor="green"
            skills={['React', 'Node.js', 'APIs', 'Databases']}
            outcomes={['Full Stack Developer', 'Web Application Developer', 'Frontend Engineer', 'Backend Engineer', 'Junior Software Engineer']}
            projects={[{'title': 'Smart Home Controller', 'desc': 'ESP32 home control firmware written in Embedded C with FreeRTOS multitasking.', 'tech': ['Embedded C', 'ESP32', 'FreeRTOS', 'UART'], 'metrics': [{'name': 'Task Jitter (ms)', 'score': 95}, {'name': 'Memory Overhead', 'score': 91}], 'githubUrl': 'https://github.com/skillcred/smarthome-fw', 'liveUrl': 'https://smarthome.skillcred.in'}, {'title': 'Network Gateway Hub', 'desc': 'Raspberry Pi gateway communicating with peripheral nodes via MQTT.', 'tech': ['C++', 'Raspberry Pi', 'MQTT', 'Linux'], 'metrics': [{'name': 'MQTT Drop Rate', 'score': 98}, {'name': 'Throughput', 'score': 93}], 'githubUrl': 'https://github.com/skillcred/gateway-hub', 'liveUrl': 'https://gateway.skillcred.in'}]}
            />

            {/* MENTOR SUPPORT & FAQS */}
            <section className="py-24 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-white/5">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-950 dark:text-white">
                            Mentor Support & Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg">
                            Understand how working professionals review your code every week and get answers to common questions before starting your journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Column 1: Mentor Support & Verification */}
                        <div className="p-8 md:p-10 rounded-3xl bg-background border border-slate-200 dark:border-white/10 shadow-sm">
                            <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                                <MessageSquare className="w-7 h-7 text-green-400 shrink-0" />
                                <span>Mentor Support & Verification</span>
                            </h3>
                            <div className="space-y-8">
                            <div className="prose prose-invert">
                                <p className="text-lg text-muted-foreground mb-6">
                                    Our mentors don't just teach — they verify your skills. Every project you build is reviewed, ensuring you meet industry standards before you get certified.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Assign projects",
                                        "Review source code",
                                        "Verify project completion",
                                        "Provide feedback",
                                        "Approve assessment eligibility",
                                        "Issue recommendation letters"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
                                <CardContent className="p-8 text-center">
                                    <Badge className="mb-4 bg-emerald-500 text-black">Mentor Verified</Badge>
                                    <h3 className="text-2xl font-bold mb-2">Projects Are Not Self-Assessed</h3>
                                    <p className="text-muted-foreground">
                                        "You cannot certify yourself. A working professional mentor must start, review, and approve your work."
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        </div>

                        {/* Column 2: Frequently Asked Questions */}
                        <div className="p-8 md:p-10 rounded-3xl bg-background border border-slate-200 dark:border-white/10 shadow-sm">
                            <h3 className="text-2xl font-bold font-heading mb-8 text-slate-900 dark:text-white">
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-4">
                        {[
                            { q: "Will I learn frontend and backend both?", a: "Yes — this track covers complete web development." },
                            { q: "Are projects real-world?", a: "Yes — each project mirrors real production apps." },
                            { q: "Is hosting included?", a: "Yes — you will deploy applications to live servers." },
                            { q: "Is this suitable for school students?", a: "Yes — the basics are simplified for beginners." },
                        ].map((faq, i) => (
                            <Card key={i} className="hover:bg-accent/5 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                                    <CardDescription>{faq.a}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                        </div>
                    </div>
                </div>
            </section>

            <StreamBottomCTA
                slug="iot-embedded"
                accentColor="green"
                bootcampName="IoT & Embedded"
            />

            <Footer />
        </main>
    );
}


