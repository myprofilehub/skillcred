'use client'

import { useState, useEffect } from 'react'
import { LandingNavbar } from '@/components/landing/navbar'
import { Footer } from '@/components/layout/footer'
import { submitLead } from '@/app/actions/submit-lead'
import { submitArenaSolution } from '@/app/actions/submit-arena'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Code2, BrainCircuit, Smartphone, Clock, Trophy,
  Flame, CheckCircle2, ArrowRight, CalendarDays,
  Zap, Github, Send, Target, Timer, Star, Upload,
  PlaySquare, BadgeCheck, Briefcase, FileCode2
} from 'lucide-react'
import {
  allChallenges, streams, getScheduleWindow, getChallengesForWindow,
  Challenge, Stream, Round,
} from '@/lib/challenges-data'

// ─── Stream icon map ──────────────────────────────────────────────────────────
const StreamIcon = ({ stream }: { stream: Stream }) => {
  if (stream === 'fullstack') return <Code2 className="w-4 h-4" />
  if (stream === 'aiml') return <BrainCircuit className="w-4 h-4" />
  return <Smartphone className="w-4 h-4" />
}

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState(targetMs)
  useEffect(() => {
    if (targetMs <= 0) return
    const interval = setInterval(() => {
      setRemaining(r => Math.max(0, r - 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetMs])

  const days = Math.floor(remaining / 86400000)
  const hrs  = Math.floor((remaining % 86400000) / 3600000)
  const mins = Math.floor((remaining % 3600000) / 60000)
  const secs = Math.floor((remaining % 60000) / 1000)
  return { days, hrs, mins, secs }
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CodeArenaPage() {
  const schedule = getScheduleWindow()
  const { cycleWeek, activeRound, msUntilNext, nextWindowLabel } = schedule

  // If no round is live, show the most recent closed one in preview mode
  const displayRound: Round = activeRound ?? (schedule.todayDow >= 5 ? 'B' : 'A')
  const liveChallenges = getChallengesForWindow(cycleWeek, displayRound)

  const [activeStream, setActiveStream]         = useState<Stream>('fullstack')
  
  // Registration & Submission Modals
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [formStatus, setFormStatus]             = useState<'idle' | 'submitting' | 'success'>('idle')
  
  const [submitChallenge, setSubmitChallenge]   = useState<Challenge | null>(null)
  const [submitStatus, setSubmitStatus]         = useState<'idle' | 'submitting' | 'success'>('idle')
  
  // Active Arena State
  const [arenaActive, setArenaActive]           = useState<boolean>(false)
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null)
  const [arenaEndTime, setArenaEndTime]         = useState<number>(0)
  const [participantData, setParticipantData]   = useState<{name: string, email: string}>({name: '', email: ''})

  const { days, hrs, mins, secs } = useCountdown(activeRound ? 0 : msUntilNext)
  const arenaTimer = useCountdown(arenaActive ? arenaEndTime - Date.now() : 0)

  // Hydrate timer from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('skillcred_arena_state')
    if (saved) {
      try {
        const state = JSON.parse(saved)
        if (state.endTime > Date.now()) {
          setArenaActive(true)
          setActiveChallengeId(state.challengeId)
          setArenaEndTime(state.endTime)
          setParticipantData(state.participant)
        } else {
          localStorage.removeItem('skillcred_arena_state')
        }
      } catch (e) {}
    }
  }, [])

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedChallenge) return
    setFormStatus('submitting')
    const fd = new FormData(e.currentTarget)
    
    const name = fd.get('name') as string
    const email = fd.get('email') as string
    
    const out = new FormData()
    out.append('name', name)
    out.append('email', email)
    out.append('phone', fd.get('phone') as string)
    out.append('track', `Code Arena – ${selectedChallenge.title} (${activeRound === 'A' ? 'Tuesday Warm-up' : 'Friday Arena'})`)
    
    try {
      await submitLead(out)
      
      // Start the arena timer (2 hrs for Warm-up, 4 hrs for Arena)
      const durationHours = selectedChallenge.difficulty === 'Warm-up' ? 2 : 4;
      const endTime = Date.now() + (durationHours * 60 * 60 * 1000);
      
      setArenaActive(true)
      setActiveChallengeId(selectedChallenge.id)
      setArenaEndTime(endTime)
      setParticipantData({ name, email })
      
      localStorage.setItem('skillcred_arena_state', JSON.stringify({
        challengeId: selectedChallenge.id,
        endTime,
        participant: { name, email }
      }))
      
      setFormStatus('success')
    } catch {
      setFormStatus('idle')
    }
  }

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!submitChallenge) return
    setSubmitStatus('submitting')
    const fd = new FormData(e.currentTarget)
    
    // Add context data
    fd.append('challengeTitle', submitChallenge.title)
    fd.append('participantName', participantData.name)
    fd.append('participantEmail', participantData.email)
    
    try {
      const res = await submitArenaSolution(fd)
      if (res.error) throw new Error(res.error)
      
      setSubmitStatus('success')
      // Clear active state after submission
      localStorage.removeItem('skillcred_arena_state')
      setArenaActive(false)
      setActiveChallengeId(null)
    } catch (e) {
      console.error(e)
      setSubmitStatus('idle')
      alert("Failed to submit solution. Please try again.")
    }
  }

  const currentChallenge = liveChallenges.find(c => c.stream === activeStream) ?? null
  const isCurrentActive = currentChallenge && activeChallengeId === currentChallenge.id

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <LandingNavbar />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-orange-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          {/* Live / Upcoming pill */}
          {activeRound ? (
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-5 py-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-6 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              LIVE NOW — {activeRound === 'A' ? 'Tuesday Warm-up Round' : 'Friday Arena Round'}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-5 py-2 text-sm font-bold text-amber-600 dark:text-amber-400 mb-6">
              <Timer className="w-4 h-4" />
              Next: {nextWindowLabel}
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-5 leading-[1.05]">
            Code{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
              Arena
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Twice-a-week challenges for Product Engineering students. Build real things. Ship on time. Get noticed.
          </p>

          {/* Schedule chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { day: 'Tuesday', type: 'Warm-up Round', icon: '🔥', desc: 'Focused 2-hr challenge' },
              { day: 'Friday', type: 'Arena Round', icon: '⚔️', desc: 'Full-stack problem, 4–6 hrs' },
            ].map(s => (
              <div key={s.day} className="flex items-center gap-2.5 bg-muted/60 border border-border rounded-2xl px-5 py-3">
                <span className="text-lg">{s.icon}</span>
                <div className="text-left">
                  <p className="font-bold text-sm">{s.day} — {s.type}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Countdown (only when no live round) */}
          {!activeRound && (
            <div className="inline-flex items-center gap-1 mb-2">
              {[
                { val: days, label: 'Days' },
                { val: hrs,  label: 'Hrs'  },
                { val: mins, label: 'Min'  },
                { val: secs, label: 'Sec'  },
              ].map((t, i) => (
                <span key={i} className="flex flex-col items-center">
                  <span className="font-mono font-black text-3xl text-amber-500 w-16 text-center tabular-nums">
                    {String(t.val).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{t.label}</span>
                  {i < 3 && <span className="font-mono text-2xl text-muted-foreground/40 mx-1 -mt-1">:</span>}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── THIS WEEK'S CHALLENGES ────────────────────────────────────────── */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-mono font-bold uppercase tracking-widest text-amber-500 mb-2">
                Week {cycleWeek} · {activeRound === 'A' ? 'Tuesday Warm-up' : activeRound === 'B' ? 'Friday Arena' : 'Upcoming'}
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                {activeRound ? "This Week's Challenges" : "Preview — Next Round"}
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5">
              <CalendarDays className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                {displayRound === 'A' ? 'Tue–Wed window' : 'Fri–Sat window'}
              </span>
            </div>
          </div>

          {/* Stream tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {streams.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveStream(s.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeStream === s.id
                    ? `${s.bg} ${s.color} border ${s.border} scale-105 shadow-lg`
                    : 'bg-muted/60 border border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                <StreamIcon stream={s.id} />
                {s.label}
              </button>
            ))}
          </div>

          {/* Challenge card */}
          {currentChallenge ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main challenge card */}
              <div className={`lg:col-span-2 rounded-3xl border bg-background overflow-hidden shadow-xl transition-all ${
                isCurrentActive ? 'border-amber-500/50 shadow-amber-500/10' : 'border-border hover:border-amber-500/30'
              }`}>
                {/* Top bar */}
                <div className={`flex items-center justify-between px-6 py-4 border-b border-border ${
                  currentChallenge.difficulty === 'Warm-up'
                    ? 'bg-amber-500/5'
                    : 'bg-red-500/5'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      currentChallenge.difficulty === 'Warm-up'
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        : 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20'
                    }`}>
                      {currentChallenge.difficulty === 'Warm-up' ? '🔥 Warm-up' : '⚔️ Arena'}
                    </div>
                    {activeRound && !isCurrentActive && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        LIVE
                      </div>
                    )}
                    {isCurrentActive && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                        <Timer className="w-3.5 h-3.5 animate-pulse" />
                        IN PROGRESS
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {currentChallenge.difficulty === 'Warm-up' ? '2 hrs' : '4–6 hrs'}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">{currentChallenge.title}</h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{currentChallenge.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {currentChallenge.tags.map(tag => (
                      <span key={tag} className="text-xs font-semibold bg-muted border border-border px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Problem statement */}
                  <div className="rounded-2xl bg-amber-500/5 border border-amber-500/15 p-6 mb-6">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-3">
                      <Target className="w-4 h-4" />
                      Problem Statement
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{currentChallenge.problemStatement}</p>
                  </div>

                  {/* Expected output */}
                  <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/15 p-6 mb-8">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-3">
                      <CheckCircle2 className="w-4 h-4" />
                      Expected Output
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{currentChallenge.expectedOutput}</p>
                  </div>

                  {/* Action Button State */}
                  {isCurrentActive ? (
                    <div className="flex flex-col sm:flex-row gap-4 items-center bg-background border border-amber-500/30 rounded-2xl p-2 pl-6 shadow-xl shadow-amber-500/5">
                      <div className="flex-1 flex items-center gap-4 py-2">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Time Remaining</span>
                          <span className="font-mono text-2xl font-black tabular-nums text-amber-500">
                            {String(arenaTimer.hrs).padStart(2, '0')}:{String(arenaTimer.mins).padStart(2, '0')}:{String(arenaTimer.secs).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => setSubmitChallenge(currentChallenge)}
                        size="lg"
                        className="w-full sm:w-auto rounded-xl py-7 px-8 text-base font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:scale-[1.02] transition-all"
                      >
                        <Upload className="mr-2 w-5 h-5" /> Submit Solution
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => activeRound && setSelectedChallenge(currentChallenge)}
                      disabled={!activeRound || arenaActive}
                      size="lg"
                      className={`w-full rounded-2xl py-6 text-base font-black transition-all ${
                        activeRound && !arenaActive
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-xl shadow-orange-500/25 hover:scale-[1.02]'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      {activeRound ? (
                        arenaActive ? 'Another challenge is in progress' : <><Zap className="ml-2 w-5 h-5" /> Register &amp; Enter Arena</>
                      ) : (
                        <>Opens {nextWindowLabel}</>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-5">
                {/* Skills you'll practice */}
                <div className="rounded-2xl border border-border bg-background p-6">
                  <p className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Skills You'll Practice
                  </p>
                  <ul className="space-y-2.5">
                    {currentChallenge.skills.map(skill => (
                      <li key={skill} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How submission works */}
                <div className="rounded-2xl border border-border bg-background p-6">
                  <p className="font-black text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                    <Send className="w-4 h-4 text-indigo-500" />
                    How It Works
                  </p>
                  <ol className="space-y-4">
                    {[
                      { icon: Flame, label: 'Register & start', desc: 'Timer begins immediately' },
                      { icon: Code2, label: 'Build your solution', desc: 'Push to a public GitHub repo' },
                      { icon: Upload, label: 'Submit before time', desc: 'Provide repo + 1 min demo video' },
                      { icon: Trophy, label: 'Get reviewed', desc: 'Feedback sent via email' },
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                          <step.icon className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{step.label}</p>
                          <p className="text-xs text-muted-foreground">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Other stream previews */}
                <div className="rounded-2xl border border-border bg-background p-6">
                  <p className="font-black text-sm uppercase tracking-widest mb-4">Other Streams</p>
                  <div className="space-y-3">
                    {streams.filter(s => s.id !== activeStream).map(s => {
                      const c = liveChallenges.find(ch => ch.stream === s.id)
                      return c ? (
                        <button
                          key={s.id}
                          onClick={() => setActiveStream(s.id)}
                          className={`w-full text-left p-3 rounded-xl ${s.bg} border ${s.border} hover:scale-[1.02] transition-transform`}
                        >
                          <div className={`flex items-center gap-1.5 ${s.color} font-bold text-xs mb-1`}>
                            <StreamIcon stream={s.id} />
                            {s.label}
                          </div>
                          <p className="text-sm font-semibold text-foreground">{c.title}</p>
                        </button>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">No challenges found for this window.</div>
          )}
        </div>
      </section>

      {/* ─── THE VERIFICATION ENGINE ──────────────────────────────────────── */}
      <section className="py-20 border-t border-border bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">The Verification Engine</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We don't just hand out participation trophies. Every solution submitted to the Code Arena goes through a strict 3-step verification process before adding points to your PAT profile.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileCode2,
                title: "1. Code Audit",
                desc: "We pull your GitHub repository and analyze the architecture, commit hygiene, and code quality. No copy-pasting allowed.",
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
              },
              {
                icon: PlaySquare,
                title: "2. Demo Verification",
                desc: "Your 1-minute video demo proves that the application actually works in a real browser or device, exactly as the problem statement requested.",
                color: "text-amber-500",
                bg: "bg-amber-500/10",
                border: "border-amber-500/20"
              },
              {
                icon: BadgeCheck,
                title: "3. Profile Boost",
                desc: "Approved submissions are permanently attached to your SkillCred public profile. HR managers can view the code and watch the demo instantly.",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20"
              }
            ].map((step, i) => (
              <div key={i} className="bg-background rounded-3xl border border-border p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 ${step.bg} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110`} />
                <div className={`w-14 h-14 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center mb-6 relative z-10`}>
                  <step.icon className={`w-7 h-7 ${step.color}`} />
                </div>
                <h3 className="text-xl font-black mb-3 relative z-10">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HIRING PARTNERS SPOTLIGHT ────────────────────────────────────── */}
      <section className="py-24 border-t border-border bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/20 border-0 uppercase tracking-widest text-xs font-black mb-6">
            Get Noticed
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Where Arena Winners Work</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Top performers in the Code Arena don't have to send cold emails. Our hiring partners actively recruit candidates who prove they can build and ship under pressure.
          </p>

          {/* Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20 items-center justify-items-center">
            {[
              { name: 'Zoho', img: '/zoho.png' },
              { name: 'Amazon', img: '/amazon.png' },
              { name: 'TCS', img: '/TCS.jpg' },
              { name: 'M2P Fintech', img: '/m2p.png' },
              { name: 'Crayon Data', img: '/Crayon-Data.png' },
              { name: 'Freshworks', img: '/freshworks.jpeg' },
            ].map((company, i) => (
              <div key={i} className="h-20 md:h-24 w-full flex items-center justify-center">
                <img src={company.img} alt={company.name} className="max-h-full max-w-[85%] object-contain" />
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
              <span className="text-2xl leading-none font-serif text-black mt-2">"</span>
            </div>
            <p className="text-xl md:text-3xl font-medium leading-relaxed italic text-gray-200 mb-8">
              We skip the first technical screening entirely for candidates who consistently dominate the SkillCred Code Arena. The proof is right there in their demos.
            </p>
            <div className="flex items-center justify-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="font-bold text-gray-400">PS</span>
              </div>
              <div>
                <p className="font-bold">Priya Sharma</p>
                <p className="text-sm text-gray-400">Engineering Manager, Freshworks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REGISTRATION MODAL ───────────────────────────────────────────── */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-background border border-border rounded-3xl p-7 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => { setSelectedChallenge(null); setFormStatus('idle') }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-lg"
            >
              ✕
            </button>

            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-2">You're In! ⚔️</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  The timer has started. You have {selectedChallenge.difficulty === 'Warm-up' ? '2 hours' : '4 hours'} to submit your solution.
                </p>
                <p className="font-bold text-amber-500 mb-8">{selectedChallenge.title}</p>
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-black"
                  onClick={() => setSelectedChallenge(null)}
                >
                  Return &amp; Start Building
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mb-3 ${
                    selectedChallenge.difficulty === 'Warm-up'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}>
                    {selectedChallenge.difficulty === 'Warm-up' ? '🔥 Warm-up' : '⚔️ Arena'}
                  </div>
                  <h3 className="text-xl font-black mb-1">Enter the Arena</h3>
                  <p className="text-muted-foreground text-sm">
                    Register for <strong className="text-foreground">{selectedChallenge.title}</strong>. Your timer starts immediately.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="arena-name" className="text-sm font-bold">Full Name</Label>
                    <Input id="arena-name" name="name" required placeholder="Your name" className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="arena-email" className="text-sm font-bold">Email</Label>
                    <Input id="arena-email" name="email" type="email" required placeholder="you@example.com" className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="arena-phone" className="text-sm font-bold">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
                    <Input id="arena-phone" name="phone" type="tel" placeholder="+91 98765 43210" className="rounded-xl" />
                  </div>
                  <Button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black rounded-2xl py-6 text-base shadow-lg shadow-orange-500/25 hover:scale-[1.02] transition-all"
                  >
                    {formStatus === 'submitting' ? 'Registering…' : 'Start Timer & Enter →'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ─── SUBMISSION MODAL ───────────────────────────────────────────── */}
      {submitChallenge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-background border border-border rounded-3xl p-7 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => { setSubmitChallenge(null); setSubmitStatus('idle') }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-lg"
            >
              ✕
            </button>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-2">Solution Submitted!</h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Your work for <strong>{submitChallenge.title}</strong> has been sent to our review team. You will receive feedback on <strong>{participantData.email}</strong> shortly.
                </p>
                <Button
                  className="w-full bg-muted text-foreground hover:bg-muted/80 rounded-2xl font-black"
                  onClick={() => setSubmitChallenge(null)}
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-black mb-1">Submit Your Solution</h3>
                  <p className="text-muted-foreground text-sm">
                    Time to shine! Submit your work for <strong>{submitChallenge.title}</strong>.
                  </p>
                </div>

                <form onSubmit={handleSubmission} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="githubLink" className="text-sm font-bold flex items-center gap-2">
                      <Github className="w-4 h-4" /> GitHub Repository URL
                    </Label>
                    <Input id="githubLink" name="githubLink" type="url" required placeholder="https://github.com/yourusername/repo" className="rounded-xl" />
                    <p className="text-xs text-muted-foreground">Make sure the repository is public.</p>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="demoVideo" className="text-sm font-bold flex items-center gap-2">
                      <Target className="w-4 h-4" /> 1-Minute Demo Video
                    </Label>
                    <Input id="demoVideo" name="demoVideo" type="file" accept="video/mp4,video/webm,video/quicktime" required className="rounded-xl file:text-amber-500 file:bg-amber-500/10 file:border-0 file:rounded-md file:px-3 file:py-1 cursor-pointer" />
                    <p className="text-xs text-muted-foreground">Showcase your working solution in under 60 seconds (max 50MB).</p>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black rounded-2xl py-6 text-base shadow-lg shadow-emerald-500/25 hover:scale-[1.02] transition-all mt-2"
                  >
                    {submitStatus === 'submitting' ? 'Uploading & Submitting…' : 'Send for Review'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
