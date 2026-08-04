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
    Cloud,
    Cpu,
    Radio,
    Wifi,
    Zap,
    Activity
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
                        IOT & EMBEDDED TRACK
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Build Devices That Work<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                            in the Physical World
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Learn embedded firmware, sensor interfacing and device-to-cloud telemetry on real hardware, through mentor-guided projects built and demonstrated on physical devices.
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
                                Software that controls hardware fails differently. Power drops, networks vanish, memory is measured in kilobytes. This track teaches you to build for those constraints.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { text: "Embedded C and microcontroller fundamentals", icon: Cpu },
                                    { text: "Sensor interfacing over UART, SPI and I2C", icon: Radio },
                                    { text: "Real-time scheduling with FreeRTOS", icon: Activity },
                                    { text: "BLE and MQTT device communication", icon: Wifi },
                                    { text: "Power profiling and low-power design", icon: Zap },
                                    { text: "Hardware debugging with a logic analyzer", icon: Terminal }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/5">
                                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
                                <span className="font-bold">Real Hardware, Not Simulation:</span> Every project runs on a physical ESP32 or STM32 board and is demonstrated live on the device during assessment.
                            </div>
                        </div>

                        {/* Who This Track Is For */}
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold font-heading mb-6">Who This Track Is For</h2>
                            <ul className="space-y-4">
                                {[
                                    "Engineering students in ECE, EEE, Mechatronics or CSE",
                                    "Beginners in embedded systems and microcontrollers",
                                    "Hobbyists moving from Arduino sketches to production firmware",
                                    "Software developers wanting hardware exposure",
                                    "Career switchers targeting embedded and IoT roles"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-300">
                                <span className="font-semibold">Note:</span> No prior embedded experience required. A hardware kit list is shared before the cohort begins.
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
                                    { name: "Embedded C", sub: "Core Language", color: "text-orange-400" },
                                    { name: "ESP32 / STM32", sub: "Microcontrollers", color: "text-emerald-400" },
                                    { name: "FreeRTOS", sub: "Real-Time OS", color: "text-green-400" },
                                    { name: "UART / SPI / I2C", sub: "Peripheral Protocols", color: "text-yellow-400" },
                                    { name: "BLE", sub: "Short-Range Comms", color: "text-teal-400" },
                                    { name: "MQTT", sub: "Telemetry Protocol", color: "text-gray-400" },
                                    { name: "Logic Analyzer", sub: "Hardware Debugging", color: "text-cyan-400" },
                                    { name: "PlatformIO", sub: "Build & Flash", color: "text-purple-400" }
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
                                    { title: "Live Mentor Sessions", desc: "Firmware design guidance", icon: Briefcase },
                                    { title: "Real Hardware", desc: "Every project on a physical board", icon: Cpu },
                                    { title: "Fault Injection", desc: "Power and network loss drills", icon: AlertTriangle },
                                    { title: "Scope & Logic Analyzer", desc: "Debug what the code can't tell you", icon: Activity },
                                    { title: "Recorded Lessons", desc: "Protocol deep dives", icon: FileCheck },
                                    { title: "Doubt Support", desc: "Clear your queries", icon: MessageSquare },
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
                skills={['Embedded C', 'FreeRTOS', 'MQTT', 'Hardware Debug']}
                outcomes={['Embedded Software Engineer', 'IoT Developer', 'Firmware Engineer', 'Embedded Systems Engineer', 'Hardware Test Engineer']}
                projects={[{'title': 'Smart Greenhouse Automation Node', 'desc': 'Automated climate monitoring utilizing ESP32, FreeRTOS, and MQTT.', 'tech': ['ESP32', 'FreeRTOS', 'MQTT', 'Embedded C'], 'metrics': [{'name': 'Uptime Guarantee', 'score': 99}, {'name': 'Power Efficiency', 'score': 91}], 'githubUrl': 'https://github.com/skillcred/greenhouse-automation', 'liveUrl': 'https://greenhouse.skillcred.in'}, {'title': 'Industrial Equipment Vibration Analyzer', 'desc': 'High-frequency accelerometer data logging via SPI and custom DSP.', 'tech': ['STM32', 'SPI', 'DSP', 'C++'], 'metrics': [{'name': 'Sampling Rate (kHz)', 'score': 92}, {'name': 'Signal Accuracy', 'score': 95}], 'githubUrl': 'https://github.com/skillcred/vibration-analyzer', 'liveUrl': 'https://analyzer.skillcred.in'}]}
            />

            {/* SEPARATE PORTFOLIO OUTPUT SECTION */}
            <StreamPortfolioPreview
                variant="default"
                slug="iot-embedded"
                accentColor="green"
                skills={['Embedded C', 'FreeRTOS', 'MQTT', 'Hardware Debug']}
                outcomes={['Embedded Software Engineer', 'IoT Developer', 'Firmware Engineer', 'Embedded Systems Engineer', 'Hardware Test Engineer']}
                projects={[{'title': 'Smart Greenhouse Automation Node', 'desc': 'Automated climate monitoring utilizing ESP32, FreeRTOS, and MQTT.', 'tech': ['ESP32', 'FreeRTOS', 'MQTT', 'Embedded C'], 'metrics': [{'name': 'Uptime Guarantee', 'score': 99}, {'name': 'Power Efficiency', 'score': 91}], 'githubUrl': 'https://github.com/skillcred/greenhouse-automation', 'liveUrl': 'https://greenhouse.skillcred.in'}, {'title': 'Industrial Equipment Vibration Analyzer', 'desc': 'High-frequency accelerometer data logging via SPI and custom DSP.', 'tech': ['STM32', 'SPI', 'DSP', 'C++'], 'metrics': [{'name': 'Sampling Rate (kHz)', 'score': 92}, {'name': 'Signal Accuracy', 'score': 95}], 'githubUrl': 'https://github.com/skillcred/vibration-analyzer', 'liveUrl': 'https://analyzer.skillcred.in'}]}
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
                                    { q: "Do I need to buy hardware?", a: "Yes — a kit list is shared before the cohort starts, typically under ₹2,500. It is yours to keep." },
                                    { q: "Is prior electronics knowledge required?", a: "No — the track starts from microcontroller fundamentals." },
                                    { q: "Will projects run on real devices?", a: "Yes — the capstone is demonstrated live on physical hardware during the defense." },
                                    { q: "Is this useful without an ECE degree?", a: "Yes — the track is open to any engineering stream, though ECE students will find the hardware concepts familiar." },
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
