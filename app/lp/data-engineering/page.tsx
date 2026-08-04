import { LpHeroForm } from "@/components/public/lp-hero-form";
import { StreamPortfolioPreview } from "@/components/public/stream-portfolio-preview";
import { LpNavbar } from "@/components/landing/lp-navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    CheckCircle2,
    Download,
    ArrowRight,
    Code2,
    Database,
    Globe,
    Server,
    Layout,
    Lock,
    Briefcase,
    GraduationCap,
    MessageSquare,
    FileCheck,
    Layers,
    Workflow,
    AlertTriangle,
    ClipboardCheck,
    Award,
    Terminal,
    ShoppingCart
} from "lucide-react";
import Link from "next/link";



import { auth } from "@/auth";


export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DataEngPage() {
    const session = await auth();
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LpNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        DATA ENGINEERING TRACK
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Build End-to-End Web Apps with<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
                            Python & Modern Tech
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Learn to design, develop, and deploy complete web applications through mentor-guided, real-world projects.
                    </p>

                    
                    <div className="flex justify-center gap-6 mt-8 mb-4 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Next Cohort</span><span>Starts 1 September 2026</span></div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Duration</span><span>5-6 Weeks</span></div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Format</span><span>100% Online</span></div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" /> Live mentor support
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" /> 4 real-world projects
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" /> Verified portfolio
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" /> Project-based assessment
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" /> HR-visible skill profile
                        </div>
                    </div>

                    <div className="w-full mt-12 text-left">
                        <LpHeroForm trackName="Data Engineering Track" accentColor="blue" />
                    </div>
                </div>
            </section>

            {/* WHY & WHO SECTION */}
            <section className="py-20 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Why This Track */}
                        <div>
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-blue-500 pl-4">
                                Why This Track?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Transform from a beginner to a full stack developer capable of building complex systems. This track covers everything from database design to frontend interactivity.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { text: "Backend development using Python", icon: Server },
                                    { text: "Frontend using HTML, CSS, JavaScript", icon: Layout },
                                    { text: "API development and integration", icon: Globe },
                                    { text: "Database design and management", icon: Database },
                                    { text: "Authentication and security", icon: Lock },
                                    { text: "Deployment of full-stack applications", icon: Layers }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/5">
                                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
                                <span className="font-bold">Industry-Relevant Projects:</span> Students build complete web systems similar to those used in startups and enterprises.
                            </div>
                        </div>

                        {/* Who This Track Is For */}
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold font-heading mb-6">Who This Track Is For</h2>
                            <ul className="space-y-4">
                                {[
                                    "College students (any stream)",
                                    "Beginners in web development",
                                    "Python learners wanting real projects",
                                    "Career switchers into software development",
                                    "Professionals upgrading to full stack roles"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300">
                                <span className="font-semibold">Note:</span> No prior coding experience required — Python fundamentals included.
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
                            { name: "Python", sub: "Core Language", color: "text-blue-400" },
                            { name: "Django / Flask", sub: "Backend Frameworks", color: "text-green-400" },
                            { name: "FastAPI", sub: "High Performance APIs", color: "text-teal-400" },
                            { name: "HTML/CSS/JS", sub: "Frontend Basics", color: "text-orange-400" },
                            { name: "React", sub: "Frontend Library", color: "text-cyan-400" },
                            { name: "MySQL / Postgres", sub: "Databases", color: "text-yellow-400" },
                            { name: "Git & GitHub", sub: "Version Control", color: "text-gray-400" },
                            { name: "Nginx / Docker", sub: "Deployment", color: "text-red-400" }
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
                            { title: "Weekly Coding Labs", desc: "Hands-on practice", icon: Code2 },
                            { title: "Code Reviews", desc: "Feedback from experts", icon: CheckCircle2 },
                            { title: "Recorded Lessons", desc: "Technical concept deep dives", icon: Terminal },
                            { title: "Step-by-step", desc: "App building walkthroughs", icon: Layers },
                            { title: "Doubt Support", desc: "Clear your queries", icon: MessageSquare },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-background/50">
                                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
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
            slug="data-engineering"
            accentColor="blue"
            skills={['Python', 'Django', 'APIs', 'Full Stack']}
            outcomes={['Python Developer', 'Backend Developer', 'Full Stack Developer', 'Web Application Developer', 'Software Engineer']}
            projects={[{'title': 'Real-Time Log ETL Pipeline', 'desc': 'Log ingestion and cleaning pipeline utilizing Kafka, Apache Spark, and AWS S3.', 'tech': ['Apache Spark', 'Kafka', 'AWS S3', 'Python'], 'metrics': [{'name': 'Throughput (msg/s)', 'score': 93}, {'name': 'ETL Integrity', 'score': 96}], 'githubUrl': 'https://github.com/skillcred/log-etl', 'liveUrl': 'https://etl.skillcred.in'}, {'title': 'Data Warehouse Orchestration', 'desc': 'Airflow workflow staging transaction data in Snowflake using dbt.', 'tech': ['Apache Airflow', 'Snowflake', 'dbt', 'SQL'], 'metrics': [{'name': 'DAG Reliability', 'score': 95}, {'name': 'Query Speedup', 'score': 91}], 'githubUrl': 'https://github.com/skillcred/warehouse-orchestration', 'liveUrl': 'https://dwh.skillcred.in'}]}
            />

            {/* SEPARATE PORTFOLIO OUTPUT SECTION */}
            <StreamPortfolioPreview
                variant="default"
            slug="data-engineering"
            accentColor="blue"
            skills={['Python', 'Django', 'APIs', 'Full Stack']}
            outcomes={['Python Developer', 'Backend Developer', 'Full Stack Developer', 'Web Application Developer', 'Software Engineer']}
            projects={[{'title': 'Real-Time Log ETL Pipeline', 'desc': 'Log ingestion and cleaning pipeline utilizing Kafka, Apache Spark, and AWS S3.', 'tech': ['Apache Spark', 'Kafka', 'AWS S3', 'Python'], 'metrics': [{'name': 'Throughput (msg/s)', 'score': 93}, {'name': 'ETL Integrity', 'score': 96}], 'githubUrl': 'https://github.com/skillcred/log-etl', 'liveUrl': 'https://etl.skillcred.in'}, {'title': 'Data Warehouse Orchestration', 'desc': 'Airflow workflow staging transaction data in Snowflake using dbt.', 'tech': ['Apache Airflow', 'Snowflake', 'dbt', 'SQL'], 'metrics': [{'name': 'DAG Reliability', 'score': 95}, {'name': 'Query Speedup', 'score': 91}], 'githubUrl': 'https://github.com/skillcred/warehouse-orchestration', 'liveUrl': 'https://dwh.skillcred.in'}]}
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
                                <MessageSquare className="w-7 h-7 text-yellow-400 shrink-0" />
                                <span>Mentor Support & Verification</span>
                            </h3>
                            <div className="space-y-8">
                            <div className="prose prose-invert">
                                <p className="text-lg text-muted-foreground mb-6">
                                    Our mentors don't just teach — they verify your skills. Every project you build is reviewed, ensuring you meet industry standards before you get certified.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Assign project tracks",
                                        "Review code and architecture",
                                        "Verify project completion",
                                        "Approve assessment eligibility",
                                        "Issue recommendation letters",
                                        "Validate portfolio entries"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                                <CardContent className="p-8 text-center">
                                    <Badge className="mb-4 bg-blue-500 text-black">Mentor Verified</Badge>
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
                            { q: "Do I need Python knowledge before joining?", a: "No — Python basics are part of the track." },
                            { q: "Will I build real websites?", a: "Yes, all projects are real working web applications." },
                            { q: "Is frontend covered?", a: "Yes — HTML, CSS, JavaScript and optional React." },
                            { q: "Will deployment be taught?", a: "Yes — students deploy apps on cloud servers." },
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

            
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4 text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Ready to start?</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Get the curriculum and see if the Data Engineering Track is right for you.</p>
                </div>
                <div className="w-full text-left">
                    <LpHeroForm trackName="Data Engineering Track" accentColor="blue" />
                </div>
            </section>


            <Footer />
        </main>
    );
}


