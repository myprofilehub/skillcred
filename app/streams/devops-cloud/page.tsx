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
    Cloud,
    Server,
    Globe,
    Terminal,
    Database,
    ShieldCheck,
    Briefcase,
    GraduationCap,
    MessageSquare,
    FileCheck,
    Layers,
    Cpu,
    Workflow,
    AlertTriangle,
    Lock,
    ClipboardCheck,
    Award
} from "lucide-react";
import Link from "next/link";



import { auth } from "@/auth";

export default async function DevopsCloudPage() {
    const session = await auth();
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-cyan-500/30 text-cyan-400 bg-cyan-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        Cloud Computing & DevOps Track
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Build, Deploy & Scale <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Applications Like Industry Experts
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Learn how to design cloud architecture, deploy applications, and automate software pipelines through mentor-guided, real-world projects.
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
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Live mentor support
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 4 real-world projects
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Verified portfolio
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Project-based assessment
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" /> HR-visible skill profile
                        </div>
                    </div>

                    <div className="w-full mt-12 text-left">
                        <StreamHeroActionCard
                            slug="devops-cloud"
                            accentColor="blue"
                            trackName="DevOps & Cloud Track"
                                syllabusUrl="/brochures/SkillCred_Devops_Cloud_Brochure.pdf"
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
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-cyan-500 pl-4">
                                Why This Track?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                This track focuses on mastering the complete software delivery lifecycle on the cloud. You won't just write code; you'll learn how to ship it, scale it, and secure it.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { text: "Cloud infrastructure setup & management", icon: Cloud },
                                    { text: "Application deployment & hosting", icon: Globe },
                                    { text: "Continuous integration & delivery (CI/CD)", icon: Workflow },
                                    { text: "Containerization and microservices", icon: Layers },
                                    { text: "Monitoring, security, and scalability", icon: ShieldCheck }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/5">
                                        <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
                                <span className="font-bold">Industry-Relevant Projects:</span> Students work on real cloud environments, containerized applications, and automated pipelines.
                            </div>
                        </div>

                        {/* Who This Track Is For */}
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold font-heading mb-6">Who This Track Is For</h2>
                            <ul className="space-y-4">
                                {[
                                    "College students (any stream)",
                                    "IT aspirants & coding enthusiasts",
                                    "Beginners in cloud technologies",
                                    "Career switchers interested in DevOps / Cloud",
                                    "Professionals aiming for cloud certification"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-300">
                                <span className="font-semibold">Note:</span> No prior cloud experience required. Cloud basics are taught inside the track.
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
                            { name: "AWS / Azure / GCP", sub: "Cloud Providers", color: "text-orange-400" },
                            { name: "Linux / Ubuntu", sub: "OS Essentials", color: "text-yellow-400" },
                            { name: "Docker", sub: "& Docker Hub", color: "text-blue-400" },
                            { name: "GitHub / Git", sub: "Version Control", color: "text-gray-400" },
                            { name: "Jenkins / Actions", sub: "CI/CD Tools", color: "text-red-400" },
                            { name: "Terraform", sub: "IaC (Optional)", color: "text-purple-400" },
                            { name: "CloudWatch", sub: "Monitoring", color: "text-pink-400" },
                            { name: "Nginx / Apache", sub: "Web Servers", color: "text-green-400" }
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
                            { title: "Hands-on Cloud", desc: "Work with real environments", icon: Cloud },
                            { title: "Weekly Milestones", desc: "Track progress regularly", icon: CheckCircle2 },
                            { title: "Video Lessons", desc: "Recorded content for revision", icon: Terminal },
                            { title: "Step-by-step", desc: "Guided project building", icon: Layers },
                            { title: "Doubt Support", desc: "Clear your queries", icon: MessageSquare },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-background/50">
                                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
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
            slug="devops-cloud"
            accentColor="blue"
            skills={['AWS/Azure', 'Docker', 'CI/CD', 'Infrastructure as Code']}
            outcomes={['Cloud Engineer', 'DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Cloud Support Engineer', 'Platform Engineer']}
            projects={[{'title': 'Multi-Region K8s Cluster', 'desc': 'Highly available Kubernetes infrastructure deployed using Terraform and ArgoCD.', 'tech': ['Terraform', 'Kubernetes', 'ArgoCD', 'AWS EKS'], 'metrics': [{'name': 'Infrastructure Drift', 'score': 96}, {'name': 'Uptime SLAs', 'score': 99}], 'githubUrl': 'https://github.com/skillcred/k8s-infra', 'liveUrl': 'https://k8s.skillcred.in'}, {'title': 'CI/CD Deployment Pipeline', 'desc': 'Automated deployments built with GitHub Actions, Docker, and Prometheus metrics.', 'tech': ['GitHub Actions', 'Docker', 'Prometheus', 'Grafana'], 'metrics': [{'name': 'Deploy Time', 'score': 92}, {'name': 'Alert Latency', 'score': 95}], 'githubUrl': 'https://github.com/skillcred/cicd-pipeline', 'liveUrl': 'https://cicd.skillcred.in'}]}
            />

            {/* SEPARATE PORTFOLIO OUTPUT SECTION */}
            <StreamPortfolioPreview
                variant="default"
            slug="devops-cloud"
            accentColor="blue"
            skills={['AWS/Azure', 'Docker', 'CI/CD', 'Infrastructure as Code']}
            outcomes={['Cloud Engineer', 'DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Cloud Support Engineer', 'Platform Engineer']}
            projects={[{'title': 'Multi-Region K8s Cluster', 'desc': 'Highly available Kubernetes infrastructure deployed using Terraform and ArgoCD.', 'tech': ['Terraform', 'Kubernetes', 'ArgoCD', 'AWS EKS'], 'metrics': [{'name': 'Infrastructure Drift', 'score': 96}, {'name': 'Uptime SLAs', 'score': 99}], 'githubUrl': 'https://github.com/skillcred/k8s-infra', 'liveUrl': 'https://k8s.skillcred.in'}, {'title': 'CI/CD Deployment Pipeline', 'desc': 'Automated deployments built with GitHub Actions, Docker, and Prometheus metrics.', 'tech': ['GitHub Actions', 'Docker', 'Prometheus', 'Grafana'], 'metrics': [{'name': 'Deploy Time', 'score': 92}, {'name': 'Alert Latency', 'score': 95}], 'githubUrl': 'https://github.com/skillcred/cicd-pipeline', 'liveUrl': 'https://cicd.skillcred.in'}]}
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
                                <MessageSquare className="w-7 h-7 text-cyan-400 shrink-0" />
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
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Card className="bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/20">
                                <CardContent className="p-8 text-center">
                                    <Badge className="mb-4 bg-cyan-500 text-black">Mentor Verified</Badge>
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
                            { q: "Do I need cloud experience to start?", a: "No, beginners are guided from scratch." },
                            { q: "Do I need to buy AWS / Azure credits?", a: "Optional — free tiers are used during projects." },
                            { q: "Are projects real-world?", a: "Yes, all projects replicate industry workflows." },
                            { q: "Will I get job-ready skills?", a: "Yes — from deployment to Mobile Development, monitored by mentors." },
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
                slug="devops-cloud"
                accentColor="cyan"
                bootcampName="DevOps & Cloud Engineering"
            />

            <Footer />
        </main>
    );
}


