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

export default async function DataEngPage() {
    const session = await auth();
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />

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
                        Build Pipelines That<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
                            Survive Real Data
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Learn to design, build and operate production data pipelines — ingestion, modelling, quality and orchestration — through mentor-guided projects using real, messy data.
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
                        <StreamHeroActionCard
                            slug="data-engineering"
                            accentColor="blue"
                            trackName="Data Engineering Track"
                            syllabusUrl="/brochures/SkillCred_Data_Engineering_Brochure.pdf"
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
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-blue-500 pl-4">
                                Why This Track?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Every company has data. Very few can trust it. Data engineers are the people who make pipelines correct, repeatable and recoverable when the source misbehaves.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { text: "Batch and streaming ingestion patterns", icon: Server },
                                    { text: "Dimensional and event data modelling", icon: Database },
                                    { text: "Data quality checks and validation gates", icon: CheckCircle2 },
                                    { text: "Orchestration, scheduling and dependency management", icon: Workflow },
                                    { text: "Late, duplicate and corrected data handling", icon: AlertTriangle },
                                    { text: "Lineage, monitoring and backfill procedures", icon: Layers }
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
                                <span className="font-bold">Industry-Relevant Focus:</span> Students work with data that arrives late, arrives twice and gets corrected after the fact — the conditions that actually break pipelines in production.
                            </div>
                        </div>

                        {/* Who This Track Is For */}
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold font-heading mb-6">Who This Track Is For</h2>
                            <ul className="space-y-4">
                                {[
                                    "College students (any stream)",
                                    "Beginners in SQL and Python who want infrastructure work rather than analysis",
                                    "Analysts moving from reporting into pipeline ownership",
                                    "Backend developers adding data infrastructure to their profile",
                                    "Career switchers targeting data platform roles"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300">
                                <span className="font-semibold">Note:</span> No prior data engineering experience required — SQL and Python fundamentals are included.
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
                                    { name: "SQL", sub: "Modelling & Transformation", color: "text-green-400" },
                                    { name: "Apache Spark", sub: "Distributed Processing", color: "text-orange-400" },
                                    { name: "Kafka", sub: "Streaming Ingestion", color: "text-teal-400" },
                                    { name: "Airflow", sub: "Orchestration", color: "text-cyan-400" },
                                    { name: "dbt", sub: "Transformation Layer", color: "text-yellow-400" },
                                    { name: "AWS S3 / Redshift", sub: "Storage & Warehouse", color: "text-purple-400" },
                                    { name: "Docker", sub: "Environment Parity", color: "text-red-400" }
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
                                    { title: "Live Mentor Sessions", desc: "Pipeline design walkthroughs", icon: Briefcase },
                                    { title: "Messy Datasets", desc: "Late, duplicated, corrected data", icon: Database },
                                    { title: "Failure Drills", desc: "Practise backfills and re-delivery", icon: AlertTriangle },
                                    { title: "Code Reviews", desc: "Feedback on modelling decisions", icon: CheckCircle2 },
                                    { title: "Recorded Lessons", desc: "Concept revision", icon: Terminal },
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
                skills={['SQL', 'Spark', 'Kafka', 'Airflow']}
                outcomes={['Data Engineer', 'Analytics Engineer', 'ETL Developer', 'Data Platform Engineer', 'Junior Data Engineer']}
                projects={[{'title': 'Real-Time Log ETL Pipeline', 'desc': 'Log ingestion and cleaning pipeline utilizing Kafka, Apache Spark, and AWS S3.', 'tech': ['Apache Spark', 'Kafka', 'AWS S3', 'Python'], 'metrics': [{'name': 'Throughput (msg/s)', 'score': 93}, {'name': 'ETL Integrity', 'score': 96}], 'githubUrl': 'https://github.com/skillcred/log-etl', 'liveUrl': 'https://etl.skillcred.in'}, {'title': 'Data Warehouse Orchestration', 'desc': 'Airflow workflow staging transaction data in Snowflake using dbt.', 'tech': ['Apache Airflow', 'Snowflake', 'dbt', 'SQL'], 'metrics': [{'name': 'DAG Reliability', 'score': 95}, {'name': 'Query Speedup', 'score': 91}], 'githubUrl': 'https://github.com/skillcred/warehouse-orchestration', 'liveUrl': 'https://dwh.skillcred.in'}]}
            />

            {/* SEPARATE PORTFOLIO OUTPUT SECTION */}
            <StreamPortfolioPreview
                variant="default"
                slug="data-engineering"
                accentColor="blue"
                skills={['SQL', 'Spark', 'Kafka', 'Airflow']}
                outcomes={['Data Engineer', 'Analytics Engineer', 'ETL Developer', 'Data Platform Engineer', 'Junior Data Engineer']}
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
                                    { q: "Do I need prior SQL experience?", a: "No — SQL fundamentals are covered before the first pipeline project." },
                                    { q: "Will I work with real data volumes?", a: "Yes — projects use datasets large enough that in-memory approaches fail, which is the point." },
                                    { q: "Is cloud infrastructure included?", a: "Yes — pipelines are deployed against cloud storage and a warehouse." },
                                    { q: "What makes this different from a data science track?", a: "Data science asks what the data means. This track makes sure the data arrives, correctly, every time." },
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
                slug="data-engineering"
                accentColor="yellow"
                bootcampName="Data Engineering"
            />

            <Footer />
        </main>
    );
}
