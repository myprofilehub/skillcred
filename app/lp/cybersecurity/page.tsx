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
    ShieldCheck,
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
    Search,
    Bug,
    Eye,
    Wifi
} from "lucide-react";
import Link from "next/link";



import { auth } from "@/auth";


export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CybersecurityPage() {
    const session = await auth();
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LpNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-red-500/30 text-red-400 bg-red-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        CYBERSECURITY TRACK
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Outsmart Threats & Engineer<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-indigo-500">
                            Security from the Inside Out
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Learn how to secure networks, applications, and data through mentor-guided, real-world security projects.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-red-400" /> Live mentor support
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-red-400" /> 4 real-world projects
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-red-400" /> Verified portfolio
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-red-400" /> Project-based assessment
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-red-400" /> HR-visible profile
                        </div>
                    </div>

                    <div className="w-full mt-12 text-left">
                        <LpHeroForm trackName="Cybersecurity Track" accentColor="green" />
                    </div>
                </div>
            </section>

            {/* WHY & WHO SECTION */}
            <section className="py-20 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Why This Track */}
                        <div>
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-red-500 pl-4">
                                Why This Track?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                In a world of increasing digital threats, cybersecurity experts are the first line of defense. This track equips you with the offensive and defensive skills needed to protect critical systems.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { text: "Fundamentals of cybersecurity & threats", icon: ShieldCheck },
                                    { text: "Network security and firewalls", icon: Server },
                                    { text: "Web application security", icon: Lock },
                                    { text: "Vulnerability assessment & pentesting", icon: Search },
                                    { text: "Incident response and risk mitigation", icon: AlertTriangle }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/5">
                                        <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                                <span className="font-bold">Industry-Relevant Focus:</span> Students learn by simulating real cyber-attacks and implementing real defenses.
                            </div>
                        </div>

                        {/* Who This Track Is For */}
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold font-heading mb-6">Who This Track Is For</h2>
                            <ul className="space-y-4">
                                {[
                                    "College students (any stream)",
                                    "Beginners interested in ethical hacking",
                                    "IT and non-IT students wanting cyber roles",
                                    "Career switchers to security domain",
                                    "Professionals upgrading security skills"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300">
                                <span className="font-semibold">Note:</span> No prior cybersecurity knowledge required.
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
                            { name: "Kali Linux", sub: "OS for Hacking", color: "text-blue-400" },
                            { name: "Wireshark", sub: "Network Analysis", color: "text-blue-500" },
                            { name: "Metasploit", sub: "Exploitation", color: "text-red-400" },
                            { name: "Burp Suite", sub: "Web Pentesting", color: "text-orange-400" },
                            { name: "Nmap", sub: "Network Scanning", color: "text-green-400" },
                            { name: "Python", sub: "Automation", color: "text-yellow-400" },
                            { name: "OWASP ZAP", sub: "Scanner", color: "text-cyan-400" },
                            { name: "VirtualBox", sub: "Labs", color: "text-gray-400" }
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
                            { title: "Live Hacking Labs", desc: "Mentor-led sessions", icon: Terminal },
                            { title: "Attack Scenarios", desc: "Simulated cyber threats", icon: Bug },
                            { title: "Security Challenges", desc: "Weekly tasks", icon: ShieldCheck },
                            { title: "Vulnerability Exploits", desc: "Step-by-step guides", icon: Lock },
                            { title: "Recorded Lessons", desc: "Revision anytime", icon: FileCheck },
                            { title: "Review Sessions", desc: "Doubt clearing", icon: MessageSquare },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-background/50">
                                <div className="p-3 rounded-lg bg-red-500/10 text-red-400">
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
            slug="cybersecurity"
            accentColor="green"
            skills={['Network Security', 'Ethical Hacking', 'Web Security', 'Pentesting']}
            outcomes={['Cybersecurity Analyst', 'SOC Analyst', 'Ethical Hacker', 'InfoSec Executive', 'Security Engineer']}
            projects={[{'title': 'Network Traffic Analyzer', 'desc': 'Python-based packet analysis tool inspecting scapy headers in real-time.', 'tech': ['Python', 'Scapy', 'Wireshark', 'Linux'], 'metrics': [{'name': 'Packet Parse Rate', 'score': 94}, {'name': 'Accuracy', 'score': 98}], 'githubUrl': 'https://github.com/skillcred/traffic-analyzer', 'liveUrl': 'https://analyzer.skillcred.in'}, {'title': 'Penetration Testing Lab', 'desc': 'Vulnerability scanning and threat modeling lab targeting OWASP Top 10.', 'tech': ['Kali Linux', 'Metasploit', 'Nmap', 'OWASP'], 'metrics': [{'name': 'Threat Remediation', 'score': 90}, {'name': 'Scoring Audit', 'score': 92}], 'githubUrl': 'https://github.com/skillcred/pentest-lab', 'liveUrl': 'https://lab.skillcred.in'}]}
            />

            {/* SEPARATE PORTFOLIO OUTPUT SECTION */}
            <StreamPortfolioPreview
                variant="default"
            slug="cybersecurity"
            accentColor="green"
            skills={['Network Security', 'Ethical Hacking', 'Web Security', 'Pentesting']}
            outcomes={['Cybersecurity Analyst', 'SOC Analyst', 'Ethical Hacker', 'InfoSec Executive', 'Security Engineer']}
            projects={[{'title': 'Network Traffic Analyzer', 'desc': 'Python-based packet analysis tool inspecting scapy headers in real-time.', 'tech': ['Python', 'Scapy', 'Wireshark', 'Linux'], 'metrics': [{'name': 'Packet Parse Rate', 'score': 94}, {'name': 'Accuracy', 'score': 98}], 'githubUrl': 'https://github.com/skillcred/traffic-analyzer', 'liveUrl': 'https://analyzer.skillcred.in'}, {'title': 'Penetration Testing Lab', 'desc': 'Vulnerability scanning and threat modeling lab targeting OWASP Top 10.', 'tech': ['Kali Linux', 'Metasploit', 'Nmap', 'OWASP'], 'metrics': [{'name': 'Threat Remediation', 'score': 90}, {'name': 'Scoring Audit', 'score': 92}], 'githubUrl': 'https://github.com/skillcred/pentest-lab', 'liveUrl': 'https://lab.skillcred.in'}]}
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
                                <MessageSquare className="w-7 h-7 text-red-400 shrink-0" />
                                <span>Mentor Support & Verification</span>
                            </h3>
                            <div className="space-y-8">
                            <div className="prose prose-invert">
                                <p className="text-lg text-muted-foreground mb-6">
                                    Our mentors don't just teach — they verify your skills. Every project you build is reviewed, ensuring you meet industry standards before you get certified.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Assign cyber projects",
                                        "Simulate attack scenarios",
                                        "Review vulnerability reports",
                                        "Verify secure implementations",
                                        "Approve assessment eligibility",
                                        "Issue recommendation letters"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Card className="bg-gradient-to-br from-red-500/10 to-transparent border-red-500/20">
                                <CardContent className="p-8 text-center">
                                    <Badge className="mb-4 bg-red-500 text-black">Mentor Verified</Badge>
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
                            { q: "Is hacking legal here?", a: "Yes — only ethical hacking on simulated environments." },
                            { q: "Will I learn real attack techniques?", a: "Yes — but with focus on defense and prevention." },
                            { q: "Is coding mandatory?", a: "Basic Python is included for automation tasks." },
                            { q: "Is this beginner friendly?", a: "Yes — structured from fundamentals to advanced." },
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
                slug="cybersecurity"
                accentColor="red"
                bootcampName="Cybersecurity"
            />

            <Footer />
        </main>
    );
}

