import { LandingNavbar } from "@/components/landing/navbar";
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
import { ProjectRoadmap } from "@/components/public/project-roadmap";
import { CurriculumSyllabus } from "@/components/public/curriculum-syllabus";

import { auth } from "@/auth";

export default async function DataScienceStreamPage() {
    const session = await auth();
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />

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
                            <CheckCircle2 className="w-4 h-4 text-rose-400" /> 5 real-world projects
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-rose-400" /> Verified portfolio
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-rose-400" /> Assessment-based certification
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8 h-14 bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20" asChild>
                            <Link href="/enroll">
                                Start This Track <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-white/10 bg-white/5 hover:bg-white/10" asChild>
                            <a href="/brochures/SkillCred_DataSci_Brochure.pdf" download>
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

            {/* TOOLS & LEARNING FORMAT */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold font-heading mb-4">Tools & Technologies</h2>
                        <p className="text-muted-foreground">Everything you need to master data science</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 mb-20">
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

                    <div className="grid md:grid-cols-3 gap-6">
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
            </section>

            {/* CURRICULUM & ROADMAP */}
            <section className="py-20 bg-secondary/10">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* LEFT PANEL: Curriculum by Program */}
                        <div>
                            <CurriculumSyllabus trackSlug="data-science" />
                        </div>
                        
                        {/* RIGHT PANEL: Project Roadmap */}
                        <div className="lg:border-l border-white/10 lg:pl-16">
                            <ProjectRoadmap trackSlug="data-science" accentColor="orange" />
                        </div>
                    </div>
                </div>
            </section>

            {/* MENTOR & ASSESSMENT */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {/* Mentor Support Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold font-heading mb-8 flex items-center gap-3">
                            <MessageSquare className="w-8 h-8 text-primary" />
                            Mentor Support & Verification
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
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
                                                Must allow how the project solves a real problem and who uses it. (e.g., Insights, Risk Reduction, Automation).
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
                            <h2 className="text-3xl font-bold mb-6">Certification & Portfolio</h2>
                            <p className="text-gray-400 mb-8">
                                Upon passing the assessment, you earn a SkillCred Verified Certificate and a portfolio that HRs can search.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="p-3 rounded-lg bg-rose-500/20 text-rose-400 h-fit"><GraduationCap className="w-6 h-6" /></div>
                                    <div>
                                        <h4 className="font-bold">Verified Certificate</h4>
                                        <p className="text-sm text-gray-400">Official proof of your skills.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="p-3 rounded-lg bg-orange-500/20 text-orange-400 h-fit"><Briefcase className="w-6 h-6" /></div>
                                    <div>
                                        <h4 className="font-bold">HR-Ready Portfolio</h4>
                                        <p className="text-sm text-gray-400">Includes verified project links, mentor ratings, and assessment scores.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h4 className="font-bold mb-4 text-lg">Career Outcomes</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["Data Analyst", "Business Analyst", "BI Analyst", "Junior Data Scientist", "Reporting Analyst"].map(role => (
                                        <Badge key={role} variant="outline" className="border-white/20 text-white hover:bg-white/10">{role}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl opacity-20 blur-2xl" />
                            <Card className="relative bg-black/80 border-white/10">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <span>HR Corner (Preview)</span>
                                        <Badge className="bg-rose-600">Recruiter View</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="text-sm text-gray-400">HR can filter students by:</div>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="secondary">SQL Skills</Badge>
                                            <Badge variant="secondary">Power BI</Badge>
                                            <Badge variant="secondary">Project Score &gt; 80%</Badge>
                                            <Badge variant="secondary">Mentor Rating 5★</Badge>
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

                    <div className="text-center bg-gradient-to-r from-rose-900/50 to-orange-900/50 p-12 rounded-3xl border border-white/10 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-4">Start Your Data Science Journey</h2>
                            <p className="text-xl text-gray-300 mb-8">Build skills. Build projects. Build proof.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/enroll">
                                    <Button size="lg" className="w-full sm:w-auto h-12 text-lg px-8 bg-white text-black hover:bg-gray-200">
                                        Enroll Now
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 text-lg px-8" asChild>
                                    <a href="/brochures/SkillCred_DataSci_Brochure.pdf" download>
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

