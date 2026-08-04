import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, AlertTriangle, Cpu, Building2, CheckCircle2, XCircle,
  ArrowRight, ShieldAlert, Terminal, Code2, Bot, BrainCircuit,
  BookOpen, FileWarning, Layers, Award, BarChart3, Zap
} from "lucide-react";
import Link from "next/link";
import { RequestCallbackModal } from "@/components/public/request-callback-modal";

export default function HRInsightsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <LandingNavbar />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-indigo-500/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-fuchsia-500/10 rounded-full blur-[110px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[30vw] max-w-[600px] max-h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/20 px-5 py-2 text-sm font-medium uppercase tracking-widest">
              2026 Research Report · India Tech Hiring
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
              Hiring Trends Report<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500">
                2026
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We mapped hiring patterns across 100+ Indian tech companies and synthesised data from TeamLease, India Skills Report, AuthBridge, and NASSCOM FutureSkills 2026.
            </p>
          </div>

          {/* Hero stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: "38%", label: "Rise in project-based hiring YoY", colorBg: "bg-indigo-500/10 dark:bg-indigo-500/15", border: "border-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400" },
              { stat: "73%", label: "Employers want applied-skill freshers", colorBg: "bg-emerald-500/10 dark:bg-emerald-500/15", border: "border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400" },
              { stat: "41%", label: "Resumes in India have fake credentials", colorBg: "bg-red-500/10 dark:bg-red-500/15", border: "border-red-500/20", text: "text-red-600 dark:text-red-400" },
              { stat: "2×", label: "More interviews now include live builds", colorBg: "bg-fuchsia-500/10 dark:bg-fuchsia-500/15", border: "border-fuchsia-500/20", text: "text-fuchsia-600 dark:text-fuchsia-400" },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl ${item.colorBg} border ${item.border} p-6`}>
                <p className={`text-4xl md:text-5xl font-black mb-2 ${item.text}`}>{item.stat}</p>
                <p className="text-xs text-muted-foreground leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: SKILLS-FIRST BENTO ───────────────────────────────────── */}
      <section className="py-28 relative border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-500/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">The Skills-First Spectrum</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Skills-first hiring isn&apos;t a single format. It&apos;s a <em>spectrum</em> of modalities now being added on top of traditional rounds — not replacing them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Big card: Machine Coding */}
            <div className="md:col-span-2 rounded-3xl bg-indigo-500/5 border border-indigo-500/15 p-8 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-xl shrink-0">
                  <Code2 className="w-7 h-7 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Machine Coding Rounds</h3>
                  <p className="text-muted-foreground text-sm">Build a runnable system in 1.5–3 hours, from scratch, in a sandboxed environment.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { name: "Flipkart", note: "Console app within 2 hrs" },
                  { name: "Razorpay", note: "Payments engine design build" },
                  { name: "Uber (India)", note: "Dispatch system prototype" },
                  { name: "Swiggy", note: "Multi-tenant service scaffold" },
                ].map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/10">
                    <p className="font-bold text-sm">{c.name}</p>
                    <p className="text-indigo-600 dark:text-indigo-400 text-xs">{c.note}</p>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-xs text-amber-700 dark:text-amber-300 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" /> DSA round still happens <em className="ml-1">after</em> this
              </div>
            </div>

            {/* Small card: Take-homes */}
            <div className="rounded-3xl bg-cyan-500/5 border border-cyan-500/15 p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2.5 bg-cyan-500/10 rounded-xl shrink-0">
                  <Terminal className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold">Async Take-Homes</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-5">2–4 hour weighted take-home projects that replace the first screening call entirely.</p>
              <div className="space-y-2">
                {["Freshworks", "Kovai.co", "Lumel", "Rocketlane", "Everstage"].map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    <span className="text-foreground font-medium">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Small card: No-degree */}
            <div className="rounded-3xl bg-emerald-500/5 border border-emerald-500/15 p-8 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl shrink-0">
                  <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">No-Degree Pioneers</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">Zoho has not required degrees for 15+ years. Their Tenkasi and Tharuvai campuses hire purely on demonstrated skill.</p>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-emerald-700 dark:text-emerald-300 text-sm font-bold">Zoho Corp</p>
                <p className="text-xs text-muted-foreground mt-0.5">Skills-only hiring for 15+ years. 0 degree requirement.</p>
              </div>
            </div>

            {/* Big card: Curriculum Mapping */}
            <div className="md:col-span-2 rounded-3xl bg-violet-500/5 border border-violet-500/15 p-8 relative overflow-hidden">
              <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-violet-500/10 rounded-xl shrink-0">
                  <Layers className="w-7 h-7 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">How SkillCred Maps Curriculum</h3>
                  <p className="text-muted-foreground text-sm">Our 4-layer intelligence loop, updated quarterly.</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { n: "01", title: "JD & Role Taxonomy Analysis", body: "We scrape and classify 2,000+ live JDs against NASSCOM FutureSkills to identify skill-frequency patterns." },
                  { n: "02", title: "Assessment Format Intelligence", body: "We reverse-engineer PAT capstone models from machine-coding and take-home prompts at top companies." },
                  { n: "03", title: "Direct Employer Intake", body: "Quarterly Skill Requirement Briefs from hiring managers at partner companies feed directly into module updates." },
                  { n: "04", title: "Outcome Feedback Loop", body: "Post-placement interview de-briefs are systematically fed back into the curriculum, closing the loop." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 hover:border-violet-500/25 transition-colors">
                    <span className="text-violet-600 dark:text-violet-400 font-black text-xl shrink-0 w-8">{item.n}</span>
                    <div>
                      <p className="font-bold mb-0.5">{item.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: RESUME TRUST DEFICIT ─────────────────────────────────── */}
      <section className="py-28 relative border-t border-border">
        <div className="absolute inset-0 bg-red-500/3 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-red-500/10 rounded-xl">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">The Resume Trust Deficit</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Credential fraud has reached epidemic levels in India. Recruiters at product companies now treat unverified portfolios as noise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-3xl bg-red-500/5 border border-red-500/20 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
              <FileWarning className="w-10 h-10 text-red-500 mb-4" />
              <p className="text-6xl font-black text-red-500 mb-3">17%</p>
              <p className="font-bold text-lg mb-1">First Advantage Report, 2025</p>
              <p className="text-muted-foreground text-sm">17% of resumes screened by First Advantage contained fake employment histories, fabricated companies, or inflated tenure durations.</p>
            </div>
            <div className="rounded-3xl bg-red-500/5 border border-red-500/20 p-8 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
              <BarChart3 className="w-10 h-10 text-red-500 mb-4" />
              <p className="text-6xl font-black text-red-500 mb-3">41%</p>
              <p className="font-bold text-lg mb-1">AuthBridge 2026 Trends Report</p>
              <p className="text-muted-foreground text-sm">AuthBridge found 41% of candidates in India's tech sector had at least one discrepancy — fake degrees, certificate fraud, or fabricated project credits.</p>
            </div>
          </div>

          <div className="rounded-3xl bg-emerald-500/5 border border-emerald-500/20 p-10 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-700 dark:text-emerald-300 font-medium mb-6">
                  <Zap className="w-4 h-4" /> SkillCred Advantage
                </div>
                <h3 className="text-3xl font-black mb-4">The PAT Defense Model</h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  A live, recorded, oral project defense in front of an industry mentor is exponentially harder to fake than a GitHub link. We give recruiters a <strong>verification portal</strong> showing real commit cadence, recorded defense transcripts, and a mentor-signed evaluation rubric.
                </p>
                <div className="space-y-3">
                  {[
                    "Recorded 45-minute oral defense transcripts",
                    "Verified continuous Git commit history (not a clone)",
                    "Mentor-signed evaluation rubric per project",
                    "Custom portfolio site built during the program",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-background border border-border">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Foundations Verified</p>
                  <p className="font-bold mb-1">Cohort-only Track</p>
                  <p className="text-sm text-muted-foreground">DSA, CS fundamentals, and 4 deployed projects. Ideal credential for mass-recruiter (TCS, Infosys, Wipro) screening filters.</p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Applied / Project Verified</p>
                  <p className="font-bold mb-1">PAT Bundle Track</p>
                  <p className="text-sm text-muted-foreground">Cohort + live oral defense. Industry-verified credential that clears the trust filters at product companies and funded startups.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: AI DISRUPTION ─────────────────────────────────────────── */}
      <section className="py-28 relative border-t border-border">
        <div className="absolute inset-0 bg-violet-500/3 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-violet-500/10 rounded-xl">
                <Cpu className="w-6 h-6 text-violet-500" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">The AI Interview Disruption</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Agentic AI tools have shattered the assumptions behind coding interviews. The industry hasn&apos;t converged — it has split into two distinct camps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Camp A */}
            <div className="rounded-3xl bg-emerald-500/5 border border-emerald-500/20 p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                  <Bot className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Camp A</p>
                  <h3 className="text-xl font-bold">Testing AI Judgment</h3>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">These companies test how well you <strong>direct, validate, and debug</strong> AI output — reviewing multi-file diffs, spotting architectural anti-patterns, and making sound trade-off decisions.</p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {["Google", "Meta", "Canva", "PhonePe", "Razorpay", "Browserstack"].map((c, i) => (
                  <div key={i} className="text-center py-2 px-1 rounded-xl bg-emerald-500/10 border border-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300">{c}</div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  "Prompt an AI to scaffold a feature, then explain every line",
                  "Identify bugs intentionally planted in AI-generated code",
                  "Justify which AI suggestions you accepted vs rejected",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Camp B */}
            <div className="rounded-3xl bg-red-500/5 border border-red-500/20 p-8 relative overflow-hidden">
              <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-red-500/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-red-500/10 rounded-xl">
                  <BrainCircuit className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider">Camp B</p>
                  <h3 className="text-xl font-bold">Banning AI Entirely</h3>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">These companies explicitly <strong>ban AI tools</strong> during interviews, doubling down on deep architectural thinking in environments where AI genuinely cannot substitute for genuine expertise.</p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {["Anthropic", "Jane Street", "DeepMind", "Stripe", "Palantir", "Two Sigma"].map((c, i) => (
                  <div key={i} className="text-center py-2 px-1 rounded-xl bg-red-500/10 border border-red-500/10 text-xs font-semibold text-red-700 dark:text-red-300">{c}</div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  "System design decomposition from scratch under whiteboard pressure",
                  "Explain CAP theorem trade-offs without Googling",
                  "Write 100% unaided code in a monitored sandbox",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-violet-500/5 border border-violet-500/20 p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0 p-5 bg-violet-500/10 rounded-2xl border border-violet-500/20">
              <Zap className="w-10 h-10 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-2">SkillCred PAT Advantage</p>
              <h3 className="text-xl font-bold mb-2">Explicitly Tests AI-Fluency</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our PAT defense is designed to work across both camps. You must defend architectural choices made with AI assistance, identify and explain why you overrode a specific AI suggestion, and demonstrate unaided debugging ability during the live session. You get a formal <strong>&ldquo;AI-Fluency&rdquo;</strong> badge on your credential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: SERVICE SECTOR ────────────────────────────────────────── */}
      <section className="py-28 relative border-t border-border">
        <div className="absolute inset-0 bg-cyan-500/3 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl">
                <Building2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">The IT Services Reality</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              India&apos;s mass-recruiting IT giants are not going away. But volume is contracting and the remaining seats are redirecting toward AI, Cloud, and Data roles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { company: "TCS NQT", format: "Aptitude + Coding + Communication", note: "Volume hiring stable but redirected. Freshers with cloud certifications get a separate AI-focused hiring lane.", colorBg: "bg-blue-500/5", border: "border-blue-500/15" },
              { company: "Infosys InfyTQ", format: "Platform-proctored coding + Aptitude", note: "InfyTQ platform filter unchanged since 2022. InfySpring program for AI/ML freshers now runs in parallel.", colorBg: "bg-teal-500/5", border: "border-teal-500/15" },
              { company: "Wipro Elite", format: "NLTH — National Level Test for Higher", note: "Elite batch scoring above 75th percentile gets fast-tracked into AI/Cloud Project groups.", colorBg: "bg-purple-500/5", border: "border-purple-500/15" },
            ].map((item, i) => (
              <div key={i} className={`rounded-3xl ${item.colorBg} border ${item.border} p-7`}>
                <p className="text-2xl font-black mb-2">{item.company}</p>
                <div className="inline-block mb-4">
                  <span className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full font-medium">{item.format}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-amber-500/5 border border-amber-500/20 p-7">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-4" />
              <h4 className="text-xl font-bold mb-2">What&apos;s Contracting</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Traditional BPO-adjacent dev roles (CRUD dev, manual QA, data entry tooling) are seeing 40–60% seat reduction as these tasks get absorbed by AI agents.</p>
            </div>
            <div className="rounded-3xl bg-emerald-500/5 border border-emerald-500/20 p-7">
              <TrendingUp className="w-8 h-8 text-emerald-500 mb-4" />
              <h4 className="text-xl font-bold mb-2">What&apos;s Growing</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">AI Ops, MLOps, Prompt Engineering, Cloud Infrastructure (AWS/Azure/GCP), and LLM integration roles are growing aggressively even within TCS, Infosys, and Wipro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: DUAL TRACK ────────────────────────────────────────────── */}
      <section className="py-28 relative border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-muted border border-border rounded-full px-5 py-2 text-sm text-muted-foreground font-medium mb-6">
              <BookOpen className="w-4 h-4" /> Our Dual-Track Approach
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Built for Both Hiring Realities</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">One platform. Two credential tracks. Matched to where you are applying.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-indigo-500/5 border border-indigo-500/20 p-10">
              <Badge className="mb-6 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/20 text-xs uppercase tracking-widest">Standalone Cohort</Badge>
              <h3 className="text-3xl font-black mb-3">Foundations Verified</h3>
              <p className="text-muted-foreground mb-8">DSA, CS fundamentals, and 4 deployed full-stack projects. Designed to pass TCS NQT, InfyTQ, and Wipro Elite filters.</p>
              <ul className="space-y-3">
                {[
                  "Algorithm and data structure fluency",
                  "4 deployed projects on public URLs",
                  "Git discipline and code review practice",
                  "Aptitude modules aligned to NQT format",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-emerald-500/5 border border-emerald-500/20 p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">Recommended</div>
              <Badge className="mb-6 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 text-xs uppercase tracking-widest">Cohort + PAT Bundle</Badge>
              <h3 className="text-3xl font-black mb-3">Applied &amp; Verified</h3>
              <p className="text-muted-foreground mb-8">Everything in Foundations, plus a live oral defense. Designed to clear the trust filters at Razorpay, Freshworks, Browserstack, and funded startups.</p>
              <ul className="space-y-3">
                {[
                  "Mentor Verified Project Defense (live, recorded)",
                  "Custom-designed Portfolio site",
                  "Mentor Signed Recommendation Letter",
                  "AI-Fluency badge on your credential",
                  "Recruiter-accessible verification portal",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="py-32 relative border-t border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] max-w-[900px] max-h-[400px] bg-indigo-500/10 rounded-full blur-[130px]" />
        </div>
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Prepare for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500">
              2026 hiring bar.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Build a verifiable portfolio that product companies trust, and master the foundations service companies demand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto text-base px-10 py-6 bg-indigo-600 hover:bg-indigo-700 text-white border-0 font-bold rounded-2xl transition-all hover:scale-[1.03]" asChild>
              <Link href="/streams">
                Explore Tech Streams
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <RequestCallbackModal>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-10 py-6 font-bold rounded-2xl transition-all hover:scale-[1.03] cursor-pointer">
                Talk to an Advisor
              </Button>
            </RequestCallbackModal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
