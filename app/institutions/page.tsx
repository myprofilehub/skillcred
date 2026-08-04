import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2, ArrowRight, FileText, Users, Shield,
  BarChart3, BookOpen, GraduationCap, Building2, Mail, Zap, AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { RequestCallbackModal } from "@/components/public/request-callback-modal";

export const metadata = {
  title: "For Institutions | SkillCred",
  description: "SkillCred runs project cohorts on your campus with live PAT defenses — producing verifiable evidence that maps directly to NAAC CO–PO attainment files.",
};

export default function InstitutionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <LandingNavbar />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        {/* Aura blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-indigo-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-fuchsia-500/8 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-300 uppercase tracking-widest mb-8">
                <GraduationCap className="w-3.5 h-3.5" />
                For Engineering Colleges
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight mb-6 leading-[1.08]">
                Stop issuing certificates.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500">
                  Start issuing proof.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
                SkillCred runs project cohorts on your campus and ends them the way a hiring panel would — a live defense, an independent scorer, and a verifiable record of what each student actually built.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <RequestCallbackModal>
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-6 rounded-2xl cursor-pointer text-base transition-all hover:scale-[1.03] shadow-xl shadow-indigo-500/25">
                    Request a free campus workshop
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </RequestCallbackModal>
                <Button size="lg" variant="outline" className="rounded-2xl px-8 py-6 text-base font-bold hover:scale-[1.03] transition-all" asChild>
                  <Link href="#method">See how it works</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                One day · No cost · Your CSE, IT or AI&DS students
              </p>
            </div>

            {/* Right — PAT Specimen Scorecard */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl bg-background border border-border shadow-2xl overflow-hidden">
                {/* Card header */}
                <div className="flex items-start justify-between gap-4 px-6 py-5 bg-gradient-to-r from-indigo-500/5 to-violet-500/5 border-b border-border">
                  <div>
                    <p className="font-black text-base tracking-tight">Project Assessment Test</p>
                    <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-[0.08em] mt-1">Specimen Transcript · AI Engineer · Capstone</p>
                  </div>
                  <span className="shrink-0 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    ✓ Defended
                  </span>
                </div>

                {/* Rubric rows */}
                <div className="divide-y divide-border/60">
                  {[
                    { name: "Problem framing & scoping", band: "Proficient", score: 82, color: "from-indigo-500 to-violet-500", bandColor: "text-indigo-600 dark:text-indigo-400", desc: "Narrowed an open brief into a buildable problem, stated assumptions, and rejected two approaches with reasons." },
                    { name: "Technical implementation", band: "Independent", score: 88, color: "from-emerald-500 to-teal-500", bandColor: "text-emerald-600 dark:text-emerald-400", desc: "Working system, own code, handled its own failure cases. Debugged live without mentor intervention." },
                    { name: "Judgment under trade-offs", band: "Proficient", score: 71, color: "from-indigo-500 to-violet-500", bandColor: "text-indigo-600 dark:text-indigo-400", desc: "Chose between cost, latency and accuracy and could say what the choice gave up." },
                    { name: "Defense & communication", band: "Proficient", score: 76, color: "from-indigo-500 to-violet-500", bandColor: "text-indigo-600 dark:text-indigo-400", desc: "Answered unscripted questions on own architecture for 20 minutes." },
                    { name: "Unseen extension", band: "Developing", score: 64, color: "from-amber-500 to-orange-500", bandColor: "text-amber-600 dark:text-amber-400", desc: "Asked to add an unannounced requirement mid-defense. A copied project cannot pass this row." },
                  ].map((row, i) => (
                    <div key={i} className="px-6 py-4 hover:bg-muted/30 transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">{row.name}</span>
                        <span className={`text-[11px] font-mono font-bold uppercase tracking-widest ${row.bandColor}`}>{row.band}</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-2">
                        <div className={`h-full rounded-full bg-gradient-to-r ${row.color} transition-all`} style={{ width: `${row.score}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{row.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-muted/30 border-t border-border">
                  <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider leading-loose">
                    Mentor-Verified · Rec. Letter Issued<br />
                    Verify at skillcred.in/v/<span className="text-indigo-600 dark:text-indigo-400 font-bold">7K2M-9QD4</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE GAP (Bento) ──────────────────────────────────────────────────── */}
      <section className="py-28 border-t border-border relative" id="gap">
        <div className="absolute inset-0 bg-red-500/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="mb-14">
            <p className="text-sm font-mono font-bold uppercase tracking-widest text-red-500 mb-4">Why departments call us</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 max-w-xl">
              You have training partners. The problem is what they hand back.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Most placement training ends in a completion certificate. Recruiters have learned that a completion certificate says a student sat through something — so they ignore it and run their own filter anyway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tag: "The portfolio problem",
                title: "Every student submits the same project",
                body: "Thirty identical tutorial builds with different names on them. No panel can tell who wrote what, so none of it counts as evidence.",
                icon: FileText,
                gradient: "from-red-500/10 to-red-500/5",
                border: "border-red-500/20",
                iconColor: "text-red-500",
                tagColor: "text-red-500",
              },
              {
                tag: "The faculty problem",
                title: "Vendor programs become your workload",
                body: "Attendance chasing, lab coordination, escalations. The partner delivers content; your department absorbs the delivery.",
                icon: Users,
                gradient: "from-amber-500/10 to-amber-500/5",
                border: "border-amber-500/20",
                iconColor: "text-amber-500",
                tagColor: "text-amber-500",
              },
              {
                tag: "The evidence problem",
                title: "Nothing survives the placement round",
                body: "Students clear the training but not the interview, because no one ever tested whether they could defend their own work out loud.",
                icon: AlertTriangle,
                gradient: "from-orange-500/10 to-orange-500/5",
                border: "border-orange-500/20",
                iconColor: "text-orange-500",
                tagColor: "text-orange-500",
              },
            ].map((item, i) => (
              <div key={i} className={`rounded-3xl bg-gradient-to-b ${item.gradient} border ${item.border} p-8 hover:scale-[1.02] transition-transform`}>
                <div className={`p-3 rounded-2xl bg-background border ${item.border} inline-flex mb-6`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <p className={`text-xs font-mono font-bold uppercase tracking-widest mb-3 ${item.tagColor}`}>{item.tag}</p>
                <h3 className="font-black text-xl mb-3 leading-snug">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE METHOD ───────────────────────────────────────────────────────── */}
      <section className="py-28 border-t border-border relative overflow-hidden" id="method">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <p className="text-sm font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-4">The method</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 max-w-2xl">Recruitment-Mirrored Project-Based Learning</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-16 leading-relaxed">
            Cohorts move through four projects in a fixed order. Each stage removes one more piece of scaffolding — so by the capstone the student is working the way a first-year engineer actually works.
          </p>

          {/* Spine cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-indigo-500/30" />
            {[
              { n: "01", tag: "Solo · guided", title: "First build", body: "Fully specified brief. The student learns the toolchain and ships something that runs.", bg: "bg-indigo-600" },
              { n: "02", tag: "Solo · open brief", title: "Own decisions", body: "Requirements only, no design given. The student chooses the approach and owns the consequences.", bg: "bg-violet-600" },
              { n: "03", tag: "Pair", title: "Shared codebase", body: "Two students, one repository, real review and merge conflict. Where team behaviour becomes visible.", bg: "bg-fuchsia-600" },
              { n: "04", tag: "Group · assessed", title: "Capstone", body: "Simulated corporate team with assigned roles. Taken to defense and scored.", bg: "bg-indigo-700" },
            ].map((step, i) => (
              <div key={i} className="rounded-2xl bg-background border border-border p-6 hover:border-indigo-500/30 transition-colors relative">
                <div className={`w-14 h-14 rounded-2xl ${step.bg} text-white flex items-center justify-center font-mono text-base font-black mb-5 relative z-10 shadow-lg`}>
                  {step.n}
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold block mb-2">{step.tag}</span>
                <h3 className="font-black text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-muted/40 border border-border text-sm text-muted-foreground flex items-start gap-3">
            <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            DSA practice runs alongside the spine as short weekly problems, not as a separate course — students meet it where interviews actually place it.
          </div>

          {/* PAT Differentiator */}
          <div className="mt-20" id="pat">
            <p className="text-sm font-mono font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">The differentiator</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 max-w-xl">A viva for engineering projects</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-12 leading-relaxed">
              Automated platforms grade what can be checked against an answer key. They cannot grade whether a student chose the right trade-off or understands the system they submitted. So we do what your PhD panels do — we ask them.
            </p>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {[
                { icon: Users, title: "Format", sub: "Live, scheduled defense", body: "A mentor who did not teach the student questions them on their own submission for 20–30 minutes, then sets an unannounced change to make on the spot.", accent: "indigo" },
                { icon: BarChart3, title: "Scoring", sub: "Published rubric, five rows", body: "Every dimension is banded Assisted → Developing → Proficient → Independent, with written descriptors students see before they build.", accent: "violet" },
                { icon: FileText, title: "Output", sub: "A record, not a certificate", body: "Verified portfolio link, the scored transcript, and a mentor recommendation letter that names specific evidence rather than adjectives.", accent: "emerald" },
              ].map((item, i) => (
                <div key={i} className={`rounded-3xl bg-${item.accent}-500/5 border border-${item.accent}-500/20 p-8 hover:scale-[1.02] transition-transform`}>
                  <div className={`p-3 rounded-2xl bg-${item.accent}-500/10 border border-${item.accent}-500/20 inline-flex mb-5`}>
                    <item.icon className={`w-6 h-6 text-${item.accent}-500`} />
                  </div>
                  <p className={`text-xs font-mono font-bold uppercase tracking-widest text-${item.accent}-600 dark:text-${item.accent}-400 mb-2`}>{item.title}</p>
                  <h3 className="font-black text-xl mb-3">{item.sub}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-indigo-500/8 via-violet-500/8 to-indigo-500/8 border border-indigo-500/15 p-8 flex items-start gap-5">
              <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shrink-0">
                <BarChart3 className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <p className="font-bold text-lg mb-2">What your department receives</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A cohort report with per-student rubric scores, aggregate attainment by dimension, and the exportable evidence set — usable directly in CO–PO attainment files and in conversations with visiting recruiters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACCREDITATION ────────────────────────────────────────────────────── */}
      <section className="py-28 border-t border-border relative overflow-hidden" id="accreditation">
        <div className="absolute inset-0 bg-violet-500/[0.02] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-violet-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <p className="text-sm font-mono font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">Accreditation fit</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 max-w-2xl">Designed to produce the evidence you are already required to file</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 leading-relaxed">
            RM-PBL is outcome-based by construction. The rubric dimensions map onto graduate attributes your department already reports against — cohort data drops into existing files rather than creating a parallel one.
          </p>

          <div className="rounded-3xl border border-border overflow-hidden shadow-xl mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-violet-500/8 to-indigo-500/8 border-b border-border">
                    <th className="text-left px-6 py-5 text-[11px] font-mono font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Rubric Dimension</th>
                    <th className="text-left px-6 py-5 text-[11px] font-mono font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Maps To</th>
                    <th className="text-left px-6 py-5 text-[11px] font-mono font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Evidence Produced</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {[
                    ["Problem framing & scoping", "PO2 — Problem analysis", "Scoping document with rejected alternatives"],
                    ["Technical implementation", "PO3, PO5 — Design of solutions, modern tool usage", "Version-controlled repository with commit history"],
                    ["Judgment under trade-offs", "PO3 — Design of solutions", "Recorded defense transcript"],
                    ["Defense & communication", "PO10 — Communication", "Scored live viva"],
                    ["Pair and capstone stages", "PO9 — Individual and team work", "Contribution log per student"],
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-semibold">{row[0]}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row[1]}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-5 py-2.5 text-sm text-violet-700 dark:text-violet-300 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Cohort data exportable for <strong className="ml-1">NAAC Criterion 2</strong> reporting on teaching–learning and evaluation
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT / PRICING ─────────────────────────────────────────────── */}
      <section className="py-28 border-t border-border relative overflow-hidden" id="engage">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[-5%] w-[500px] h-[500px] bg-indigo-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-emerald-500/8 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <p className="text-sm font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-4">Engagement models</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">Three ways to run this with us</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-14 leading-relaxed">
            Every engagement starts with the same free one-day workshop, so your faculty and students see the method before anything is committed.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 — Campus Cohort (featured) */}
            <div className="rounded-3xl bg-gradient-to-b from-indigo-500/10 to-indigo-500/5 border-2 border-indigo-500/40 p-9 flex flex-col relative overflow-hidden shadow-2xl shadow-indigo-500/10 hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest">Most common</div>
              <GraduationCap className="w-9 h-9 text-indigo-500 mb-5" />
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">Campus Cohort</p>
              <p className="font-black text-2xl mb-3">Full Program</p>
              <div className="mb-6">
                <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">₹1,875</span>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">Per student · Batch of 40</p>
              </div>
              <ul className="space-y-3.5 mb-9 flex-1">
                {[
                  "Full RM-PBL spine, mentor-led",
                  "PAT defense and scored transcript for every student",
                  "Cohort attainment report for the department",
                  "Delivered by our mentors — no faculty load",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <RequestCallbackModal>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl py-6 text-base cursor-pointer transition-all shadow-lg shadow-indigo-500/25">
                  Request a workshop
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </RequestCallbackModal>
            </div>

            {/* Card 2 — Defense only */}
            <div className="rounded-3xl bg-background border border-border p-9 flex flex-col hover:border-violet-500/30 hover:scale-[1.02] transition-all">
              <Shield className="w-9 h-9 text-violet-500 mb-5" />
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">Lowest commitment</p>
              <p className="font-black text-2xl mb-3">Defense &amp; Scoring Only</p>
              <div className="mb-6">
                <span className="text-5xl font-black text-violet-600 dark:text-violet-400 tracking-tight">₹1,500</span>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">Per student · Minimum 30</p>
              </div>
              <ul className="space-y-3.5 mb-9 flex-1">
                {[
                  "Your students' existing final-year or mini projects",
                  "Live PAT defense with an independent mentor",
                  "Scored transcript and verified portfolio link per student",
                  "No change to your syllabus or teaching schedule",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <RequestCallbackModal>
                <Button variant="outline" className="w-full rounded-2xl py-6 text-base font-black cursor-pointer">
                  Ask about defenses
                </Button>
              </RequestCallbackModal>
            </div>

            {/* Card 3 — Faculty Enablement */}
            <div className="rounded-3xl bg-background border border-border p-9 flex flex-col hover:border-emerald-500/30 hover:scale-[1.02] transition-all">
              <BookOpen className="w-9 h-9 text-emerald-500 mb-5" />
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">Faculty first</p>
              <p className="font-black text-2xl mb-3">Faculty Enablement</p>
              <div className="mb-6">
                <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">On request</span>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-2">Scoped to department size</p>
              </div>
              <ul className="space-y-3.5 mb-9 flex-1">
                {[
                  "FDP on project-based delivery and rubric scoring",
                  "Calibration sessions so your scores match ours",
                  "Suited to departments building this in-house",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <RequestCallbackModal>
                <Button variant="outline" className="w-full rounded-2xl py-6 text-base font-black cursor-pointer">
                  Start a conversation
                </Button>
              </RequestCallbackModal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="py-28 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[130px]" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                Start with a single day on campus.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
                  No commitment required.
                </span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                We run a free one-day workshop where your students experience the project method and your faculty see the rubric scoring in action. It costs nothing and changes nothing about your current schedule.
              </p>
              <RequestCallbackModal>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-10 py-6 text-base rounded-2xl cursor-pointer transition-all hover:scale-[1.03] shadow-2xl shadow-indigo-500/25">
                  Request a free campus workshop
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </RequestCallbackModal>
            </div>

            <div className="rounded-3xl border border-border p-8 bg-gradient-to-br from-muted/40 to-background shadow-xl hover:border-indigo-500/20 transition-colors">
              <h3 className="font-black text-xl mb-8 flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <Building2 className="w-5 h-5 text-indigo-500" />
                </div>
                Get in touch
              </h3>
              <dl className="space-y-6">
                <div>
                  <dt className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Organisation</dt>
                  <dd className="text-base font-semibold">SkillCred · Chennai</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Email</dt>
                  <dd>
                    <a href="mailto:ganesan.m@skillcred.in" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2 text-base font-medium">
                      <Mail className="w-4 h-4" />
                      ganesan.m@skillcred.in
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Website</dt>
                  <dd>
                    <a href="https://skillcred.in" className="text-indigo-600 dark:text-indigo-400 hover:underline text-base font-medium">skillcred.in</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
