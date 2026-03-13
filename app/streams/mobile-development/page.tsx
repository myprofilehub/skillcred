import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    CheckCircle2,
    Download,
    ArrowRight,
    Bot,
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
    Settings,
    Clock,
    FileSpreadsheet,
    Mail
} from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";

export default async function MobileDevelopmentPage() {
    const session = await auth();
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-yellow-500/30 text-yellow-400 bg-yellow-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        MOBILE DEVELOPMENT TRACK
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Design Systems That Eliminate<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-indigo-500">
                            Manual Work & Scale Productivity
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Learn how to automate business processes, IT operations, and data workflows using industry tools and mentor-guided real-world projects.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Live mentor support
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> 5 real-world projects
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Verified portfolio
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Project-based assessment
                        </div>
                        import {LandingNavbar} from "@/components/landing/navbar";
                        import {Footer} from "@/components/layout/footer";
                        import {Button} from "@/components/ui/button";
                        import {Badge} from "@/components/ui/badge";
                        import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
                        import {
                            CheckCircle2,
                            Download,
                            ArrowRight,
                            Bot,
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
                            Settings,
                            Clock,
                            FileSpreadsheet,
                            Mail
                        } from "lucide-react";
                        import Link from "next/link";

                        import {auth} from "@/auth";

                        export default async function MobileDevelopmentPage() {
    const session = await auth();
                        return (
                        <main className="min-h-screen bg-background text-foreground">
                            <LandingNavbar />

                            {/* HERO SECTION */}
                            <section className="relative pt-32 pb-20 overflow-hidden">
                                <div className="absolute inset-0 z-0">
                                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                                </div>

                                <div className="container relative z-10 mx-auto px-4 text-center">
                                    <Badge variant="outline" className="mb-6 border-yellow-500/30 text-yellow-400 bg-yellow-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                                        MOBILE DEVELOPMENT TRACK
                                    </Badge>
                                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                                        Design Systems That Eliminate<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-indigo-500">
                                            Manual Work & Scale Productivity
                                        </span>
                                    </h1>
                                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                                        Learn how to automate business processes, IT operations, and data workflows using industry tools and mentor-guided real-world projects.
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Live mentor support
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> 5 real-world projects
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Verified portfolio
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Project-based assessment
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> HR-visible profile
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button size="lg" className="text-lg px-8 h-14 bg-yellow-600 hover:bg-yellow-700 text-black shadow-lg shadow-yellow-500/20 font-semibold" asChild>
                                            <Link href="/enroll">
                                                Start This Track <ArrowRight className="ml-2 w-5 h-5" />
                                            </Link>
                                        </Button>
                                        <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-white/10 bg-white/5 hover:bg-white/10" asChild>
                                            <a href="/brochures/SkillCred_Mobile_Brochure.pdf" download>
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
                                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-yellow-500 pl-4">
                                                Why This Track?
                                            </h2>
                                            <p className="text-muted-foreground mb-8">
                                                Mobile Development is the key to enterprise efficiency. This track empowers you to build bots, automate data flows, and design systems that work autonomously.
                                            </p>

                                            <div className="space-y-4">
                                                {[
                                                    { text: "Process Mobile Development and workflow design", icon: Workflow },
                                                    { text: "API-based system Mobile Development", icon: Server },
                                                    { text: "Task scheduling and monitoring", icon: Clock },
                                                    { text: "Web and data Mobile Development", icon: Globe },
                                                    { text: "Robotic Process Mobile Development (RPA) concepts", icon: Bot }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/5">
                                                        <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400">
                                                            <item.icon className="w-5 h-5" />
                                                        </div>
                                                        <span className="font-medium">{item.text}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-8 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
                                                <span className="font-bold">Real-World Impact:</span> Students learn to identify repetitive tasks and convert them into automated systems used in real businesses.
                                            </div>
                                        </div>

                                        {/* Who This Track Is For */}
                                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                                            <h2 className="text-2xl font-bold font-heading mb-6">Who This Track Is For</h2>
                                            <ul className="space-y-4">
                                                {[
                                                    "College students (any stream)",
                                                    "Beginners in Mobile Development & scripting",
                                                    "Operations & business students",
                                                    "IT & non-IT professionals",
                                                    "Career switchers into Mobile Development roles"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-center gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-300">
                                                <span className="font-semibold">Note:</span> No prior Mobile Development experience required — fundamentals are included.
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
                                        <p className="text-muted-foreground">The ultimate Mobile Development toolkit</p>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-6 mb-20 max-w-5xl mx-auto">
                                        {[
                                            { name: "Python", sub: "Mobile Development Scripting", color: "text-blue-400" },
                                            { name: "Selenium", sub: "Web Mobile Development", color: "text-green-400" },
                                            { name: "UiPath / AA", sub: "RPA Concepts", color: "text-orange-400" },
                                            { name: "REST APIs", sub: "Integrations", color: "text-purple-400" },
                                            { name: "Excel", sub: "Data Mobile Development", color: "text-green-500" },
                                            { name: "Zapier / n8n", sub: "Low - Code", color: "text-yellow-400" },
                                            { name: "GitHub", sub: "Version Control", color: "text-gray-400" },
                                            { name: "Cron", sub: "Scheduling", color: "text-red-400" }
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
                                            { title: "Weekly Challenges", desc: "Solve Mobile Development puzzles", icon: Bot },
                                            { title: "Real Business Cases", desc: "Automate actual workflows", icon: Layers },
                                            { title: "Step-by-step", desc: "Project building", icon: CheckCircle2 },
                                            { title: "Recorded Tutorials", desc: "Concept revision", icon: FileCheck },
                                            { title: "Mentor Reviews", desc: "Code correction & feedback", icon: MessageSquare },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-background/50">
                                                <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-400">
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

                            {/* PROJECT ROADMAP */}
                            <section className="py-20 bg-secondary/10">
                                <div className="container mx-auto px-4 max-w-5xl">
                                    <div className="text-center mb-16">
                                        <h2 className="text-3xl font-bold font-heading mb-4">Project Roadmap (5 Projects)</h2>
                                        <p className="text-muted-foreground">From simple scripts to intelligent autonomous agents</p>
                                    </div>

                                    <div className="space-y-8 relative">
                                        {/* Vertical Line */}
                                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500/50 to-indigo-500/50 hidden md:block" />

                                        {[
                                            {
                                                title: "Automated Data Extraction System",
                                                tools: "Python, Selenium",
                                                desc: "Build a bot that extracts data from websites and stores it in Excel or CSV.",
                                                color: "border-blue-500",
                                                type: "Project 1",
                                                icon: Database
                                            },
                                            {
                                                title: "Resume Screening Mobile Development Tool",
                                                tools: "Python, APIs, Pandas",
                                                desc: "Automatically scan resumes and classify them based on job role keywords.",
                                                color: "border-green-500",
                                                type: "Project 2",
                                                icon: FileCheck
                                            },
                                            {
                                                title: "Email & Report Mobile Development System",
                                                tools: "Python, SMTP, Excel",
                                                desc: "Generate daily reports and send them automatically to managers.",
                                                color: "border-yellow-500",
                                                type: "Project 3",
                                                icon: Mail
                                            },
                                            {
                                                title: "Business Process Mobile Development (RPA)",
                                                tools: "UiPath / Mobile Development Anywhere",
                                                desc: "Automate invoice processing or form filling for a simulated company.",
                                                color: "border-orange-500",
                                                type: "Project 4",
                                                icon: FileSpreadsheet
                                            },
                                            {
                                                title: "End-to-End Workflow Mobile Development (Capstone)",
                                                tools: "Python, APIs, Streamlit",
                                                desc: "Build a system that automates data collection → processing → reporting → alerting.",
                                                color: "border-indigo-500",
                                                type: "Project 5",
                                                icon: Workflow
                                            },
                                        ].map((project, i) => (
                                            <div key={i} className="relative md:pl-24">
                                                <div className="hidden md:flex absolute left-4 -translate-x-1/2 top-6 w-8 h-8 rounded-full bg-background border-4 border-muted items-center justify-center z-10">
                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                </div>
                                                <Card className={`border-l-4 ${project.color} bg-white/5`}>
                                                    <CardContent className="p-6">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                                            <Badge variant="outline" className="w-fit">{project.type}</Badge>
                                                            <Badge className="w-fit bg-secondary text-secondary-foreground">{project.tools}</Badge>
                                                        </div>
                                                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                                            <project.icon className="w-5 h-5 text-muted-foreground" />
                                                            {project.title}
                                                        </h3>
                                                        <p className="text-muted-foreground">{project.desc}</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* MENTOR & ASSESSMENT (PAT) */}
                            <section className="py-20">
                                <div className="container mx-auto px-4">
                                    {/* Mentor Support Section */}
                                    <div className="mb-20">
                                        <h2 className="text-3xl font-bold font-heading mb-8 flex items-center gap-3">
                                            <MessageSquare className="w-8 h-8 text-yellow-400" />
                                            Mentor Support & Verification
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-8 items-center">
                                            <div className="prose prose-invert">
                                                <p className="text-lg text-muted-foreground mb-6">
                                                    Our mentors don't just teach — they verify your skills. Every project you build is reviewed, ensuring you meet industry standards before you get certified.
                                                </p>
                                                <ul className="space-y-4">
                                                    {[
                                                        "Assign Mobile Development projects",
                                                        "Review Mobile Development logic",
                                                        "Validate working bots",
                                                        "Approve assessment eligibility",
                                                        "Provide performance feedback",
                                                        "Issue recommendation letters"
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-center gap-3">
                                                            <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <Card className="bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20">
                                                <CardContent className="p-8 text-center">
                                                    <Badge className="mb-4 bg-yellow-500 text-black">Mentor Verified</Badge>
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

                                                        {/* 3. Workflow Logic */}
                                                        <Card className="bg-white/5 border-white/10">
                                                            <CardHeader>
                                                                <div className="flex justify-between">
                                                                    <div>
                                                                        <Badge variant="secondary" className="mb-2">15 Marks</Badge>
                                                                        <CardTitle className="text-lg">3. Workflow Logic</CardTitle>
                                                                    </div>
                                                                    <Workflow className="w-5 h-5 text-muted-foreground" />
                                                                </div>
                                                            </CardHeader>
                                                            <CardContent className="text-sm text-muted-foreground">
                                                                Evaluation of workflow efficiency, error handling capabilities, and logic resilience.
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
                                                                    <Settings className="w-5 h-5 text-muted-foreground" />
                                                                </div>
                                                            </CardHeader>
                                                            <CardContent className="text-sm text-muted-foreground">
                                                                Live check: Modify bot behavior, fix a bug, or add a feature on the spot.
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
                                                                Explain approach, handling of edge cases, and Mobile Development design choices.
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
                                                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Scripts & Demo Submitted</li>
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
                                                            You only receive the <span className="text-white">SkillCred Verified Certificate</span> & Recommendation Letter if all criteria are met.
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
                                                Your portfolio will show Mobile Development use cases, tools used, workflow designs, estimated time saved, mentor verification, and assessment scores.
                                            </p>

                                            <div className="space-y-6">
                                                <div className="flex gap-4">
                                                    <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400 h-fit"><GraduationCap className="w-6 h-6" /></div>
                                                    <div>
                                                        <h4 className="font-bold">HR-Ready Profile</h4>
                                                        <p className="text-sm text-gray-400">Recruiters can filter candidates based on these specific skills.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-10">
                                                <h4 className="font-bold mb-4 text-lg">Career Outcomes</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {["Mobile Development Engineer", "RPA Developer", "Process Mobile Development Analyst", "Workflow Engineer", "IT Mobile Development Specialist"].map(role => (
                                                        <Badge key={role} variant="outline" className="border-white/20 text-white hover:bg-white/10">{role}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-indigo-500 rounded-2xl opacity-20 blur-2xl" />
                                            <Card className="relative bg-black/80 border-white/10">
                                                <CardHeader>
                                                    <CardTitle className="flex justify-between items-center">
                                                        <span>HR Corner (Preview)</span>
                                                        <Badge className="bg-yellow-600">Recruiter View</Badge>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        <div className="text-sm text-gray-400">HR can filter by:</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            <Badge variant="secondary">Mobile Development</Badge>
                                                            <Badge variant="secondary">RPA</Badge>
                                                            <Badge variant="secondary">Python</Badge>
                                                            <Badge variant="secondary">Workflow</Badge>
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
                                            { q: "Is this coding-heavy?", a: "Moderate — scripting is taught step by step." },
                                            { q: "Will I build real bots?", a: "Yes — every project produces a working Mobile Development system." },
                                            { q: "Can non-IT students take this track?", a: "Yes — it is designed for beginners." },
                                            { q: "Is this job-oriented?", a: "Yes — Mobile Development is in high demand across industries." },
                                        ].map((faq, i) => (
                                            <Card key={i} className="hover:bg-accent/5 transition-colors">
                                                <CardHeader>
                                                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                                                    <CardDescription>{faq.a}</CardDescription>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </div>

                                    <div className="text-center bg-gradient-to-r from-yellow-900/50 to-indigo-900/50 p-12 rounded-3xl border border-white/10 relative overflow-hidden">
                                        <div className="relative z-10">
                                            <h2 className="text-4xl font-bold mb-4">Start Your Mobile Development Journey</h2>
                                            <p className="text-xl text-gray-300 mb-8">Automate tasks. Optimize systems. Prove your skills.</p>
                                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                <Link href="/enroll">
                                                    <Button size="lg" className="w-full sm:w-auto h-12 text-lg px-8 bg-white text-black hover:bg-gray-200">
                                                        Enroll Now
                                                    </Button>
                                                </Link>
                                                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 text-lg px-8" asChild>
                                                    <a href="/brochures/SkillCred_Mobile_Brochure.pdf" download>
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


