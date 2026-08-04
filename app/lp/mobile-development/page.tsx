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


export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MobileDevelopmentPage() {
    const session = await auth();
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LpNavbar />

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
                        Ship Apps That Work<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-indigo-500">
                            Offline, On Real Devices
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Learn cross-platform mobile development — navigation, state, offline sync and release builds — through mentor-guided projects taken all the way to an installable app.
                    </p>

                    
                    <div className="flex justify-center gap-6 mt-8 mb-4 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Next Cohort</span><span>Starts 1 September 2026</span></div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Duration</span><span>7-8 Weeks</span></div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Format</span><span>100% Online</span></div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> Live mentor support
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-yellow-400" /> 4 real-world projects
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

                    <div className="w-full mt-12 text-left">
                        <LpHeroForm trackName="Mobile Development Track" accentColor="purple" />
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
                                                Mobile is where constraint lives: intermittent connectivity, limited memory, a device the user reboots at will. This track covers the whole path from design brief to signed build.
                                            </p>

                                            <div className="space-y-4">
                                                {[
                                                    { text: "Cross-platform development with React Native", icon: Layers },
                                                    { text: "Navigation, state management and list performance", icon: Workflow },
                                                    { text: "Offline-first storage and sync reconciliation", icon: Database },
                                                    { text: "REST API integration and error handling", icon: Server },
                                                    { text: "Profiling and fixing performance problems", icon: Settings },
                                                    { text: "Release builds, permissions and store metadata", icon: Lock }
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
                                                <span className="font-bold">Shipped, Not Just Built:</span> The capstone is a signed build installed on a physical device and demonstrated live during assessment.
                                            </div>
                                        </div>

                                        {/* Who This Track Is For */}
                                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                                            <h2 className="text-2xl font-bold font-heading mb-6">Who This Track Is For</h2>
                                            <ul className="space-y-4">
                                                {[
                                                    "College students (any stream)",
                                                    "Beginners in mobile development",
                                                    "Web developers moving to mobile",
                                                    "Designers who want to build what they design",
                                                    "Career switchers targeting mobile engineering roles"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-center gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-300">
                                                <span className="font-semibold">Note:</span> JavaScript fundamentals are included — no prior mobile experience required.
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
                                            { name: "React Native", sub: "Cross-Platform Framework", color: "text-blue-400" },
                                            { name: "Expo", sub: "Build & Deploy Toolchain", color: "text-purple-400" },
                                            { name: "TypeScript", sub: "Type Safety", color: "text-blue-500" },
                                            { name: "Redux Toolkit", sub: "State Management", color: "text-purple-500" },
                                            { name: "SQLite / MMKV", sub: "Local Persistence", color: "text-green-400" },
                                            { name: "REST APIs", sub: "Backend Integration", color: "text-orange-400" },
                                            { name: "Flipper", sub: "Debugging & Profiling", color: "text-pink-400" },
                                            { name: "Git & GitHub", sub: "Version Control", color: "text-gray-300" }
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
                                            { title: "Live Mentor Sessions", desc: "Architecture walkthroughs", icon: Briefcase },
                                            { title: "Design-to-Build Briefs", desc: "Work from supplied designs and API contracts", icon: Layout },
                                            { title: "Offline Drills", desc: "Break connectivity and reconcile", icon: Database },
                                            { title: "Performance Profiling", desc: "Find and fix real jank", icon: Terminal },
                                            { title: "Recorded Lessons", desc: "Concept revision", icon: FileCheck },
                                            { title: "Mentor Reviews", desc: "Code correction and feedback", icon: MessageSquare },
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
                    </div>
                </div>
            </section>

            <StreamPortfolioPreview
                variant="roadmap"
            slug="mobile-development"
            accentColor="purple"
            skills={['React Native', 'TypeScript', 'Offline Sync', 'Mobile Performance']}
            outcomes={['Mobile Application Developer', 'React Native Developer', 'Cross-Platform Engineer', 'Frontend Mobile Engineer', 'Junior Mobile Developer']}
            projects={[{'title': 'E-Commerce Mobile App', 'desc': 'Cross-platform store client built with React Native, Expo, and Redux.', 'tech': ['React Native', 'Expo', 'Redux Toolkit', 'REST APIs'], 'metrics': [{'name': 'FPS Stability', 'score': 93}, {'name': 'Bundle Size', 'score': 89}], 'githubUrl': 'https://github.com/skillcred/mobile-store', 'liveUrl': 'https://app-store.skillcred.in'}, {'title': 'Social Media iOS App', 'desc': 'Native iOS UI written in SwiftUI, powered by Firebase backend.', 'tech': ['SwiftUI', 'Firebase', 'Swift Packages', 'iOS SDK'], 'metrics': [{'name': 'Startup Time (ms)', 'score': 96}, {'name': 'Crash Rate', 'score': 99}], 'githubUrl': 'https://github.com/skillcred/ios-social', 'liveUrl': 'https://app-ios.skillcred.in'}]}
            />

            {/* SEPARATE PORTFOLIO OUTPUT SECTION */}
            <StreamPortfolioPreview
                variant="default"
            slug="mobile-development"
            accentColor="purple"
            skills={['React Native', 'TypeScript', 'Offline Sync', 'Mobile Performance']}
            outcomes={['Mobile Application Developer', 'React Native Developer', 'Cross-Platform Engineer', 'Frontend Mobile Engineer', 'Junior Mobile Developer']}
            projects={[{'title': 'E-Commerce Mobile App', 'desc': 'Cross-platform store client built with React Native, Expo, and Redux.', 'tech': ['React Native', 'Expo', 'Redux Toolkit', 'REST APIs'], 'metrics': [{'name': 'FPS Stability', 'score': 93}, {'name': 'Bundle Size', 'score': 89}], 'githubUrl': 'https://github.com/skillcred/mobile-store', 'liveUrl': 'https://app-store.skillcred.in'}, {'title': 'Social Media iOS App', 'desc': 'Native iOS UI written in SwiftUI, powered by Firebase backend.', 'tech': ['SwiftUI', 'Firebase', 'Swift Packages', 'iOS SDK'], 'metrics': [{'name': 'Startup Time (ms)', 'score': 96}, {'name': 'Crash Rate', 'score': 99}], 'githubUrl': 'https://github.com/skillcred/ios-social', 'liveUrl': 'https://app-ios.skillcred.in'}]}
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
                                                        "Assign mobile app architecture & features",
                                                        "Review React Native & TypeScript code",
                                                        "Validate offline storage & sync reconciliation",
                                                        "Approve assessment eligibility",
                                                        "Provide performance profiling feedback",
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

                        {/* Column 2: Frequently Asked Questions */}
                        <div className="p-8 md:p-10 rounded-3xl bg-background border border-slate-200 dark:border-white/10 shadow-sm">
                            <h3 className="text-2xl font-bold font-heading mb-8 text-slate-900 dark:text-white">
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-4">
                                        {[
                                            { q: "Do I need a Mac to build iOS apps?", a: "No — Expo's cloud build service handles iOS builds without local Apple hardware." },
                                            { q: "Is JavaScript knowledge required?", a: "No — JavaScript and TypeScript fundamentals are covered before the first project." },
                                            { q: "Will I publish to the app stores?", a: "The capstone is built to release standard with store metadata prepared. Actual publishing requires a paid developer account, which is your choice." },
                                            { q: "Native Android or cross-platform?", a: "Cross-platform with React Native, which is where most Indian product-company mobile hiring sits today." },
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
                    <p className="text-slate-500 max-w-2xl mx-auto">Get the curriculum and see if the Mobile Development Track is right for you.</p>
                </div>
                <div className="w-full text-left">
                    <LpHeroForm trackName="Mobile Development Track" accentColor="purple" />
                </div>
            </section>


            <Footer />
        </main>
    );
}
