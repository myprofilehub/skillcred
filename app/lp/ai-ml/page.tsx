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
    Brain,
    Cpu,
    Network,
    Bot,
    Database,
    ShieldCheck,
    Briefcase,
    GraduationCap,
    MessageSquare,
    FileCheck,
    Layers,
    Workflow,
    AlertTriangle,
    Lock,
    ClipboardCheck,
    Award,
    Terminal,
    Search
} from "lucide-react";
import Link from "next/link";



import { auth } from "@/auth";


export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AIMLPage() {
    const session = await auth();
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LpNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-purple-500/30 text-purple-400 bg-purple-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        AI & ML TRACK
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Master AI to Create Solutions<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            That Think, Learn & Predict
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Learn how to design, train, and deploy machine learning models through mentor-guided, real-world projects.
                    </p>

                    
                    <div className="flex justify-center gap-6 mt-8 mb-4 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Next Cohort</span><span>Starts 1st</span></div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Duration</span><span>7-8 Weeks</span></div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Format</span><span>100% Online</span></div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-purple-400" /> Live mentor support
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-purple-400" /> 4 real-world projects
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-purple-400" /> Verified portfolio
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-purple-400" /> Project-based assessment
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-purple-400" /> HR-visible skill profile
                        </div>
                    </div>

                    <div className="w-full mt-12 text-left">
                        <LpHeroForm trackName="AI & ML Engineering Track" accentColor="purple" />
                    </div>
                </div>
            </section>

            {/* WHY & WHO SECTION */}
            <section className="py-20 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Why This Track */}
                        <div>
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-purple-500 pl-4">
                                Why This Track?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Artificial Intelligence is reshaping every industry. This track gives you the practical skills to build predictive models, NLP apps, and smart systems.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { text: "Data preprocessing and feature engineering", icon: Database },
                                    { text: "Supervised & unsupervised learning", icon: Brain },
                                    { text: "Neural networks & deep learning", icon: Network },
                                    { text: "Natural Language Processing (NLP)", icon: MessageSquare },
                                    { text: "Model deployment and evaluation", icon: Layers }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/5">
                                        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm">
                                <span className="font-bold">Industry-Relevant Projects:</span> Students work on real-world datasets, build predictive models, and deploy AI solutions.
                            </div>
                        </div>

                        {/* Who This Track Is For */}
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold font-heading mb-6">Who This Track Is For</h2>
                            <ul className="space-y-4">
                                {[
                                    "College students (any stream)",
                                    "Beginners in AI & ML",
                                    "Coding enthusiasts with interest in algorithms",
                                    "Career switchers aiming for AI/ML roles",
                                    "Professionals seeking AI upskilling"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
                                <span className="font-semibold">Note:</span> Python basics will be taught inside the track.
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
                            { name: "Python", sub: "Pandas, NumPy", color: "text-blue-400" },
                            { name: "Scikit-learn", sub: "ML Algorithms", color: "text-orange-400" },
                            { name: "TensorFlow / Keras", sub: "Deep Learning", color: "text-yellow-400" },
                            { name: "PyTorch", sub: "Deep Learning", color: "text-red-400" },
                            { name: "NLTK / SpaCy", sub: "NLP Libraries", color: "text-green-400" },
                            { name: "Jupyter", sub: "Notebooks", color: "text-gray-400" },
                            { name: "Flask / Streamlit", sub: "Model Deployment", color: "text-slate-900 dark:text-white" },
                            { name: "Docker", sub: "Containerization", color: "text-blue-500" }
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
                            { title: "Real Datasets", desc: "Work with authentic data", icon: Database },
                            { title: "Weekly Milestones", desc: "Track progress regularly", icon: CheckCircle2 },
                            { title: "Recorded Lessons", desc: "For concept revision", icon: Brain },
                            { title: "Step-by-step", desc: "Guided project building", icon: Layers },
                            { title: "Doubt Support", desc: "Clear your queries", icon: MessageSquare },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-background/50">
                                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
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
            slug="ai-ml"
            accentColor="purple"
            skills={['Python', 'Machine Learning', 'NLP', 'AI Deployment']}
            outcomes={['Machine Learning Engineer', 'AI Engineer', 'NLP Engineer', 'Data Scientist', 'AI Support Specialist']}
            projects={[{'title': 'Sentiment Analysis Pipeline', 'desc': 'FastAPI pipeline serving a text classification model built with scikit-learn.', 'tech': ['Python', 'scikit-learn', 'FastAPI', 'Docker'], 'metrics': [{'name': 'F1 Score', 'score': 89}, {'name': 'Latency (ms)', 'score': 94}], 'githubUrl': 'https://github.com/skillcred/sentiment-pipeline', 'liveUrl': 'https://sentiment.skillcred.in'}, {'title': 'Image Classifier (CNN)', 'desc': 'PyTorch CNN trained on CIFAR-10, optimized with learning rate scheduling.', 'tech': ['Python', 'PyTorch', 'Docker', 'AWS EC2'], 'metrics': [{'name': 'Accuracy', 'score': 87}, {'name': 'Training Time', 'score': 90}], 'githubUrl': 'https://github.com/skillcred/image-classifier', 'liveUrl': 'https://classifier.skillcred.in'}]}
            />

            {/* SEPARATE PORTFOLIO OUTPUT SECTION */}
            <StreamPortfolioPreview
                variant="default"
            slug="ai-ml"
            accentColor="purple"
            skills={['Python', 'Machine Learning', 'NLP', 'AI Deployment']}
            outcomes={['Machine Learning Engineer', 'AI Engineer', 'NLP Engineer', 'Data Scientist', 'AI Support Specialist']}
            projects={[{'title': 'Sentiment Analysis Pipeline', 'desc': 'FastAPI pipeline serving a text classification model built with scikit-learn.', 'tech': ['Python', 'scikit-learn', 'FastAPI', 'Docker'], 'metrics': [{'name': 'F1 Score', 'score': 89}, {'name': 'Latency (ms)', 'score': 94}], 'githubUrl': 'https://github.com/skillcred/sentiment-pipeline', 'liveUrl': 'https://sentiment.skillcred.in'}, {'title': 'Image Classifier (CNN)', 'desc': 'PyTorch CNN trained on CIFAR-10, optimized with learning rate scheduling.', 'tech': ['Python', 'PyTorch', 'Docker', 'AWS EC2'], 'metrics': [{'name': 'Accuracy', 'score': 87}, {'name': 'Training Time', 'score': 90}], 'githubUrl': 'https://github.com/skillcred/image-classifier', 'liveUrl': 'https://classifier.skillcred.in'}]}
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
                                <MessageSquare className="w-7 h-7 text-purple-400 shrink-0" />
                                <span>Mentor Support & Verification</span>
                            </h3>
                            <div className="space-y-8">
                            <div className="prose prose-invert">
                                <p className="text-lg text-muted-foreground mb-6">
                                    Our mentors don't just teach — they verify your skills. Every project you build is reviewed, ensuring you meet industry standards before you get certified.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Assign & explain projects",
                                        "Review project submissions",
                                        "Verify project completion",
                                        "Provide feedback",
                                        "Approve assessment eligibility",
                                        "Issue recommendation letters"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                                <CardContent className="p-8 text-center">
                                    <Badge className="mb-4 bg-purple-500 text-black">Mentor Verified</Badge>
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
                            { q: "Do I need prior Python experience?", a: "No — Python basics are included in the track." },
                            { q: "Are projects real-world?", a: "Yes, each project replicates real industry problems." },
                            { q: "Is deployment included?", a: "Yes, models are deployed via Streamlit / Flask for live testing." },
                            { q: "Will I be job-ready?", a: "The track covers building, evaluating, and deploying AI systems." },
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
                slug="ai-ml"
                accentColor="purple"
                bootcampName="AI & ML"
            />

            <Footer />
        </main>
    );
}

