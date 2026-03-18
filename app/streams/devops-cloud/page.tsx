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
import { ProjectRoadmap } from "@/components/public/project-roadmap";
import { CurriculumSyllabus } from "@/components/public/curriculum-syllabus";

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

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Live mentor support
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 5 real-world projects
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

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8 h-14 bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/20" asChild>
                            <Link href="/enroll">
                                Start This Track <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-white/10 bg-white/5 hover:bg-white/10" asChild>
                            <a href="/brochures/SkillCred_DevOps_Brochure.pdf" download>
                                Download Syllabus <Download className="ml-2 w-5 h-5" />
                            </a>
                        </Button>
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

            {/* TOOLS & LEARNING FORMAT */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold font-heading mb-4">Tools You Will Master</h2>
                        <p className="text-muted-foreground">The standard toolset for modern DevOps engineers</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 mb-20 max-w-5xl mx-auto">
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

                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold mb-8">How You Will Learn</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
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
            </section>

            {/* CURRICULUM & ROADMAP */}
            <section className="py-20 bg-secondary/10">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* LEFT PANEL: Curriculum by Program */}
                        <div>
                            <CurriculumSyllabus trackSlug="devops-cloud" />
                        </div>
                        
                        {/* RIGHT PANEL: Project Roadmap */}
                        <div className="lg:border-l border-white/10 lg:pl-16">
                            <ProjectRoadmap trackSlug="devops-cloud" accentColor="blue" />
                        </div>
                    </div>
                </div>
            </section>

            {/* MENTOR & ASSESSMENT (PAT) */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {/* Mentor Support Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold font-heading mb-8 flex items-center gap-3">
                            <MessageSquare className="w-8 h-8 text-cyan-400" />
                            Mentor Support & Verification
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
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

                    {/* PAT Section */}
                    <div className="border border-white/10 rounded-3xl bg-secondary/5 overflow-hidden">
                        <div className="p-8 md:p-12 border-b border-white/10 text-center">
                            <Badge variant="outline" className="mb-4 border-yellow-500/50 text-yellow-500">PBL Model</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                                Project-Based Assessment Test (PAT) Format
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Assessment is based on how you build, improve, and explain projects — not on a single final exam.
                            </p>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="grid md:grid-cols-12 gap-8">
                                {/* Left: Marks Structure */}
                                <div className="md:col-span-8 space-y-6">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <ClipboardCheck className="w-6 h-6 text-yellow-500" />
                                        Overall Structure (100 Marks)
                                    </h3>

                                    {/* 1. Project Completion */}
                                    <Card className="bg-white/5 border-white/10">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <Badge variant="secondary" className="mb-2">40 Marks</Badge>
                                                    <CardTitle className="text-lg">1. Project Completion & Quality</CardTitle>
                                                </div>
                                                <Layers className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Evaluated across best 3 projects. Mentor checks problem understanding, implementation, tools, and code quality.
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className="bg-black/20 p-2 rounded">Functionality: 5</div>
                                                <div className="bg-black/20 p-2 rounded">Tool Usage: 3</div>
                                                <div className="bg-black/20 p-2 rounded">Output Quality: 3</div>
                                                <div className="bg-black/20 p-2 rounded">Docs: 2</div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* 2. Milestone Reviews */}
                                        <Card className="bg-white/5 border-white/10">
                                            <CardHeader>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <Badge variant="secondary" className="mb-2">20 Marks</Badge>
                                                        <CardTitle className="text-lg">2. Milestone Reviews</CardTitle>
                                                    </div>
                                                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="text-sm text-muted-foreground">
                                                Points for regular updates (Design, Mid-build, Final) and fixing mentor feedback. Rewards consistency.
                                            </CardContent>
                                        </Card>

                                        {/* 3. Real World Application */}
                                        <Card className="bg-white/5 border-white/10">
                                            <CardHeader>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <Badge variant="secondary" className="mb-2">15 Marks</Badge>
                                                        <CardTitle className="text-lg">3. Business Value</CardTitle>
                                                    </div>
                                                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="text-sm text-muted-foreground">
                                                Must allow how the project solves a real problem and who uses it. (e.g., Insights, Risk Reduction, Mobile Development).
                                            </CardContent>
                                        </Card>

                                        {/* 4. Tool Proficiency */}
                                        <Card className="bg-white/5 border-white/10">
                                            <CardHeader>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <Badge variant="secondary" className="mb-2">15 Marks</Badge>
                                                        <CardTitle className="text-lg">4. Tool Proficiency</CardTitle>
                                                    </div>
                                                    <Database className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="text-sm text-muted-foreground">
                                                Live check: Modify project, add a feature, or fix a bug on the spot to prove authenticity.
                                            </CardContent>
                                        </Card>

                                        {/* 5. Viva */}
                                        <Card className="bg-white/5 border-white/10">
                                            <CardHeader>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <Badge variant="secondary" className="mb-2">10 Marks</Badge>
                                                        <CardTitle className="text-lg">5. Final Defense</CardTitle>
                                                    </div>
                                                    <MessageSquare className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="text-sm text-muted-foreground">
                                                Explain approach, challenges faced, and lessons learned.
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                {/* Right: Rules & Criteria */}
                                <div className="md:col-span-4 space-y-8">
                                    {/* Pass Criteria */}
                                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                                        <h4 className="font-bold flex items-center gap-2 mb-4 text-green-400">
                                            <Award className="w-5 h-5" /> Pass Criteria
                                        </h4>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Minimum 60/100 Score</li>
                                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> All 5 Projects Completed</li>
                                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Mentor Verification Done</li>
                                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> No Plagiarism Found</li>
                                        </ul>
                                    </div>

                                    {/* Plagiarism */}
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                                        <h4 className="font-bold flex items-center gap-2 mb-4 text-red-400">
                                            <AlertTriangle className="w-5 h-5" /> Plagiarism Check
                                        </h4>
                                        <ul className="space-y-3 text-sm text-muted-foreground">
                                            <li className="flex gap-2"><Lock className="w-4 h-4" /> Code similarity check</li>
                                            <li className="flex gap-2"><Lock className="w-4 h-4" /> Git commit history audit</li>
                                            <li className="flex gap-2"><Lock className="w-4 h-4" /> Oral questioning</li>
                                            <li className="flex gap-2"><Lock className="w-4 h-4" /> Random live modification</li>
                                        </ul>
                                    </div>

                                    {/* Certification Logic */}
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                                        <h4 className="font-bold flex items-center gap-2 mb-4 text-blue-400">
                                            <FileCheck className="w-5 h-5" /> Certification
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            You only receive the <span className="text-white">SkillCred Project-Based Certificate</span> & Recommendation Letter if all criteria are met.
                                        </p>
                                        <Badge variant="outline" className="w-full justify-center">Mentor Rating ≥ 3.5/5 Req</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUTCOMES & PORTFOLIO */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Your Portfolio Output</h2>
                            <p className="text-gray-400 mb-8">
                                Your portfolio will show deployed URLs, cloud resources, Docker images, CI/CD pipelines, architecture diagrams, mentor verification, and assessment scores.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 h-fit"><GraduationCap className="w-6 h-6" /></div>
                                    <div>
                                        <h4 className="font-bold">HR-Ready Profile</h4>
                                        <p className="text-sm text-gray-400">Recruiters can filter candidates based on these specific skills.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h4 className="font-bold mb-4 text-lg">Career Outcomes</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer (SRE)", "Cloud Support Engineer", "Platform Engineer"].map(role => (
                                        <Badge key={role} variant="outline" className="border-white/20 text-white hover:bg-white/10">{role}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 blur-2xl" />
                            <Card className="relative bg-black/80 border-white/10">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <span>HR Corner (Preview)</span>
                                        <Badge className="bg-cyan-600">Recruiter View</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="text-sm text-gray-400">HR can filter by:</div>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="secondary">AWS/Azure</Badge>
                                            <Badge variant="secondary">Docker</Badge>
                                            <Badge variant="secondary">CI/CD</Badge>
                                            <Badge variant="secondary">Infrastructure as Code</Badge>
                                        </div>
                                        <div className="h-32 bg-white/5 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-gray-500 text-sm">
                                            [Portfolio Preview Interface]
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs & CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4 mb-20">
                        {[
                            { q: "Do I need cloud experience to start?", a: "No, beginners are guided from scratch." },
                            { q: "Do I need to buy AWS / Azure credits?", a: "Optional — free tiers are used during projects." },
                            { q: "Are projects real-world?", a: "Yes, all projects replicate industry workflows." },
                            { q: "Will I get job-ready skills?", a: "Absolutely — from deployment to Mobile Development, monitored by mentors." },
                        ].map((faq, i) => (
                            <Card key={i} className="hover:bg-accent/5 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                                    <CardDescription>{faq.a}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-12 rounded-3xl border border-white/10 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-4">Start Your Devops & Cloud Journey</h2>
                            <p className="text-xl text-gray-300 mb-8">Build skills. Build projects. Build proof.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/enroll">
                                    <Button size="lg" className="w-full sm:w-auto h-12 text-lg px-8 bg-white text-black hover:bg-gray-200">
                                        Enroll Now
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 text-lg px-8" asChild>
                                    <a href="/brochures/SkillCred_DevOps_Brochure.pdf" download>
                                        Download Brochure
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}


