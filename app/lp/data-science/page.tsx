import { StreamBottomCTA } from "@/components/public/stream-pricing-components";
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
    BarChart,
    Database,
    LineChart,
    Brain,
    Layers,
    PieChart,
    Users,
    GraduationCap,
    Briefcase,
    FileCheck,
    HelpCircle,
    PlayCircle,
    MessageSquare,
    Search,
    ShieldCheck,
    ClipboardCheck,
    AlertTriangle,
    Lock,
    Award
} from "lucide-react";
import Link from "next/link";



import { auth } from "@/auth";


export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DataScienceStreamPage() {
    const session = await auth();
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LpNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-rose-500/30 text-rose-400 bg-rose-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        Data Science & Analytics Track
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Build Real Business Insights <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">
                            Using Data, Dashboards & SQL
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Learn how to clean, analyze, and visualize data using industry tools like <span className="text-white font-medium">Python, SQL, Power BI & Tableau</span> — through mentor-guided real-world projects.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-rose-400" /> Live mentor support
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-rose-400" /> 4 real-world projects
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-rose-400" /> Verified portfolio
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-rose-400" /> Assessment-based certification
                        </div>
                    </div>

                    <div className="w-full mt-12 text-left">
                        <LpHeroForm trackName="Data Science Track" accentColor="blue" />
                    </div>
                </div>
            </section>

            {/* WHY & WHO SECTION */}
            <section className="py-20 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Why This Track */}
                        <div>
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-rose-500 pl-4">
                                Why This Track?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                This is NOT just coding — this is data-driven thinking. You will check raw data, turn it into insights, building dashboards for decision-making, and solve real business problems.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <Card className="bg-background/50 border-white/5">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400"><BarChart className="w-5 h-5" /></div>
                                        <span className="font-medium">Sales Data</span>
                                    </CardContent>
                                </Card>
                                <Card className="bg-background/50 border-white/5">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400"><Users className="w-5 h-5" /></div>
                                        <span className="font-medium">Customer Data</span>
                                    </CardContent>
                                </Card>
                                <Card className="bg-background/50 border-white/5">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400"><PieChart className="w-5 h-5" /></div>
                                        <span className="font-medium">Financial Data</span>
                                    </CardContent>
                                </Card>
                                <Card className="bg-background/50 border-white/5">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400"><Layers className="w-5 h-5" /></div>
                                        <span className="font-medium">Operational Data</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Who This Track Is For */}
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold font-heading mb-6">Who This Track Is For</h2>
                            <ul className="space-y-4">
                                {[
                                    "College students (any stream)",
                                    "Beginners in data field",
                                    "Business & commerce students",
                                    "Working professionals",
                                    "Career switchers"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-sm text-rose-300">
                                <span className="font-semibold">Note:</span> No prior coding required. Python basics are covered inside the track.
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
                            { name: "Python", sub: "Pandas, NumPy", color: "text-orange-400" },
                            { name: "SQL", sub: "MySQL / PostgreSQL", color: "text-orange-400" },
                            { name: "Power BI", sub: "Dashboarding", color: "text-yellow-400" },
                            { name: "Tableau", sub: "Visualization", color: "text-indigo-400" },
                            { name: "Excel", sub: "Advanced", color: "text-rose-400" },
                            { name: "Jupyter", sub: "Notebooks", color: "text-orange-600" }
                        ].map((tool) => (
                            <div key={tool.name} className="text-center p-6 rounded-xl bg-secondary/30 w-40 hover:bg-secondary/50 transition-colors">
                                <div className={`text-xl font-bold mb-1 ${tool.color}`}>{tool.name}</div>
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
                            { title: "Live Mentor Sessions", desc: "Project-led guidance", icon: Users },
                            { title: "Real Datasets", desc: "Work with messy, real data", icon: Database },
                            { title: "Weekly Check-ins", desc: "Track progress regularly", icon: CheckCircle2 },
                            { title: "Video Lessons", desc: "Recorded content for revision", icon: PlayCircle },
                            { title: "Step-by-step", desc: "Guided project building", icon: Layers },
                            { title: "Doubt Support", desc: "Clear your queries", icon: HelpCircle },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-background/50">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
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
            slug="data-science"
            accentColor="blue"
            skills={['SQL Skills', 'Power BI', 'Project Score &gt; 80%', 'Mentor Rating 5★']}
            outcomes={['Data Analyst', 'Business Analyst', 'BI Analyst', 'Junior Data Scientist', 'Reporting Analyst']}
            projects={[{'title': 'Predictive Analytics Model', 'desc': 'Customer churn predictor using XGBoost and served via Streamlit.', 'tech': ['Pandas', 'XGBoost', 'Streamlit', 'Python'], 'metrics': [{'name': 'ROC-AUC Score', 'score': 90}, {'name': 'Inference Latency', 'score': 93}], 'githubUrl': 'https://github.com/skillcred/predictive-analytics', 'liveUrl': 'https://predict.skillcred.in'}, {'title': 'Customer Segmentation Engine', 'desc': 'Clustering engine grouping users dynamically using K-Means and Scikit-learn.', 'tech': ['K-Means', 'Scikit-learn', 'Python', 'Tableau'], 'metrics': [{'name': 'Silhouette Score', 'score': 85}, {'name': 'Execution Time', 'score': 94}], 'githubUrl': 'https://github.com/skillcred/segmentation-engine', 'liveUrl': 'https://segment.skillcred.in'}]}
            />

            {/* SEPARATE PORTFOLIO OUTPUT SECTION */}
            <StreamPortfolioPreview
                variant="default"
            slug="data-science"
            accentColor="blue"
            skills={['SQL Skills', 'Power BI', 'Project Score &gt; 80%', 'Mentor Rating 5★']}
            outcomes={['Data Analyst', 'Business Analyst', 'BI Analyst', 'Junior Data Scientist', 'Reporting Analyst']}
            projects={[{'title': 'Predictive Analytics Model', 'desc': 'Customer churn predictor using XGBoost and served via Streamlit.', 'tech': ['Pandas', 'XGBoost', 'Streamlit', 'Python'], 'metrics': [{'name': 'ROC-AUC Score', 'score': 90}, {'name': 'Inference Latency', 'score': 93}], 'githubUrl': 'https://github.com/skillcred/predictive-analytics', 'liveUrl': 'https://predict.skillcred.in'}, {'title': 'Customer Segmentation Engine', 'desc': 'Clustering engine grouping users dynamically using K-Means and Scikit-learn.', 'tech': ['K-Means', 'Scikit-learn', 'Python', 'Tableau'], 'metrics': [{'name': 'Silhouette Score', 'score': 85}, {'name': 'Execution Time', 'score': 94}], 'githubUrl': 'https://github.com/skillcred/segmentation-engine', 'liveUrl': 'https://segment.skillcred.in'}]}
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
                                <MessageSquare className="w-7 h-7 text-blue-400 shrink-0" />
                                <span>Mentor Support & Verification</span>
                            </h3>
                            <div className="space-y-8">
                            <div className="prose prose-invert">
                                <p className="text-lg text-muted-foreground mb-6">
                                    Our mentors don't just teach — they verify your skills. Every project you build is reviewed, ensuring you meet industry standards before you get certified.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Assign & explain real-world projects",
                                        "Code reviews & architecture feedback",
                                        "Verify project functionality & quality",
                                        "Conduct Viva & Assessment readiness checks",
                                        "Issue formal recommendation letters"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                                <CardContent className="p-8 text-center">
                                    <Badge className="mb-4 bg-primary text-black">Mentor Verified</Badge>
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
                            { q: "Is coding mandatory?", a: "No. Python basics are taught from scratch inside this track." },
                            { q: "Do I get real datasets?", a: "Yes, all projects use real or simulated industry data." },
                            { q: "Is certificate automatic?", a: "No — only after mentor verification + assessment." },
                            { q: "Is this an internship?", a: "This is a project-based skill certification program." },
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
                slug="data-science"
                accentColor="blue"
                bootcampName="Data Science"
            />

            <Footer />
        </main>
    );
}

