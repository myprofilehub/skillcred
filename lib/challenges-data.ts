// ─────────────────────────────────────────────────────────────────────────────
// Code Arena — Challenge Data
// Twice-a-week schedule: Round A = Tuesday (Warm-up), Round B = Friday (Arena)
// Streams: Full Stack Development, AI & ML Engineering, Mobile Development
// ─────────────────────────────────────────────────────────────────────────────

import challengesData from './challenges.json'

export type Difficulty = 'Warm-up' | 'Arena'
export type Round = 'A' | 'B'
export type Stream = 'fullstack' | 'aiml' | 'mobile'

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: Difficulty   // Warm-up = Tuesday opener, Arena = Friday harder
  round: Round             // A = Tuesday, B = Friday
  stream: Stream
  weekNumber: number
  tags: string[]
  problemStatement: string
  expectedOutput: string
  skills: string[]
}

// Ensure the data from JSON is strongly typed
export const allChallenges: Challenge[] = challengesData as Challenge[]

export const streams: { id: Stream; label: string; color: string; bg: string; border: string }[] = [
  { id: 'fullstack', label: 'Full Stack Dev', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'aiml',      label: 'AI & ML Eng',   color: 'text-violet-500', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { id: 'mobile',    label: 'Mobile Dev',    color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
]

// ─── Schedule helpers ──────────────────────────────────────────────────────────

/** Returns the ISO week number for a date */
function getISOWeek(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

export interface ScheduleWindow {
  /** 1-indexed week within the 3-week cycle */
  cycleWeek: number
  /** A = Tuesday open, B = Friday open */
  activeRound: Round | null
  /** Day of week: 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat */
  todayDow: number
  /** ms until next window opens */
  msUntilNext: number
  /** label for next window */
  nextWindowLabel: string
}

export function getScheduleWindow(now: Date = new Date()): ScheduleWindow {
  const isoWeek = getISOWeek(now)
  const cycleWeek = ((isoWeek - 1) % 3) + 1   // 1, 2, or 3
  const dow = now.getDay()                      // 0=Sun … 6=Sat

  // Round A window: Tuesday 00:00 → Wednesday 23:59
  // Round B window: Friday 00:00 → Saturday 23:59
  let activeRound: Round | null = null
  if (dow === 2 || dow === 3) activeRound = 'A'
  if (dow === 5 || dow === 6) activeRound = 'B'

  // Compute next window
  const daysUntilNext = (() => {
    if (dow === 0) return 2  // Sun → Tue
    if (dow === 1) return 1  // Mon → Tue
    if (dow === 2) return 3  // Tue → Fri  (currently in A)
    if (dow === 3) return 2  // Wed → Fri
    if (dow === 4) return 1  // Thu → Fri
    if (dow === 5) return 4  // Fri → Tue  (currently in B)
    return 3                 // Sat → Tue
  })()

  const nextLabel = activeRound === 'A' ? 'Friday Arena Round' : 'Tuesday Warm-up Round'
  const msUntilNext = daysUntilNext * 24 * 60 * 60 * 1000

  return { cycleWeek, activeRound, todayDow: dow, msUntilNext, nextWindowLabel: nextLabel }
}

export function getChallengesForWindow(cycleWeek: number, round: Round): Challenge[] {
  return allChallenges.filter(c => c.weekNumber === cycleWeek && c.round === round)
}
