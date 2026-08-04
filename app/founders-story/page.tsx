import Link from "next/link"
import Image from "next/image"
import { LandingNavbar } from "@/components/landing/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Quote } from "lucide-react"
import { RequestCallbackModal } from "@/components/public/request-callback-modal"

export const metadata = {
  title: "Founder's Story | SkillCred",
  description: "The story behind SkillCred — by Ganesan M, Founder, Chennai.",
}

export default function FoundersStoryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden mb-8 shadow-xl shadow-orange-500/20 border-4 border-background ring-4 ring-amber-500/20">
            <Image
              src="/founder.png"
              alt="Ganesan M — Founder, SkillCred"
              width={176}
              height={176}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            The Story Behind <span className="text-amber-500">SkillCred</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-1 font-medium">Ganesan M</p>
          <p className="text-sm text-muted-foreground uppercase tracking-widest">Founder · Chennai</p>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">

            {/* 01 — The Problem I Saw */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-amber-500 font-black text-lg">01</span>
                <div className="h-px flex-1 bg-amber-500/20" />
              </div>
              <h2 className="text-3xl font-bold mb-8 tracking-tight">The Problem I Saw</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  The same thing happened every batch. For seven years I taught programming, AI and machine learning — to engineering students, to working professionals, to people paying real money for a change in their circumstances. Students would finish everything asked of them. Attendance, assignments, the capstone, the certificate. Then they would sit in an interview, get asked why they had built something the way they built it, and have no answer.
                </p>
                <p>
                  Not because they were weak. Because nobody had ever asked them before.
                </p>
                <p>
                  That is the part of this industry I want to be honest about, having worked inside it. Tech education has quietly become a content delivery business. Record the hours, ship the videos, issue the certificate on completion. It scales beautifully and it measures the wrong thing — completion is a measure of persistence, not of capability. So we graduate people who know the syntax and have never once had to defend a decision out loud.
                </p>
              </div>

              {/* Pull quote */}
              <div className="my-10 pl-6 border-l-4 border-amber-500 relative">
                <Quote className="absolute -left-3 -top-2 w-5 h-5 text-amber-500 bg-background" />
                <p className="text-xl font-semibold text-foreground italic leading-relaxed">
                  The gap in the market is not knowledge. Knowledge has never been cheaper. The gap is judgment, and judgment is invisible on a certificate.
                </p>
              </div>
            </div>

            {/* 02 — Why I Built SkillCred */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-amber-500 font-black text-lg">02</span>
                <div className="h-px flex-1 bg-amber-500/20" />
              </div>
              <h2 className="text-3xl font-bold mb-8 tracking-tight">Why I Built SkillCred</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  At some point the choice got simple. I could keep training people to build things that nobody would ever verify, or I could build the verification.
                </p>
                <p>
                  SkillCred rests on two ideas. The first is that projects should get harder in a specific direction: not more features, but less scaffolding. Our students move through four builds where the support is removed a piece at a time, until the final one is a team project with assigned roles and an open brief — the way the first year of an actual job works.
                </p>
                <p>
                  The second is the PAT, the Project Assessment Test, which ends in a live defense. A mentor who did not teach you questions you on your own work, then asks you to make a change you were not expecting, while they watch. There is no answer key. There is no version of that you can pass by copying a repository, and no automated platform on the market can replicate it, because scoring engines are built to grade things that have a correct answer.
                </p>
                <p>
                  I am not trying to teach anyone React or Python. That material is free and it is everywhere. I am trying to produce engineers who can weigh a trade-off, read the documentation instead of waiting for the video, and say out loud why they chose what they chose.
                </p>
              </div>
            </div>

            {/* 03 — What Makes Us Different */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-amber-500 font-black text-lg">03</span>
                <div className="h-px flex-1 bg-amber-500/20" />
              </div>
              <h2 className="text-3xl font-bold mb-4 tracking-tight">What Makes Us Different</h2>
              <p className="text-muted-foreground text-lg mb-10">Four decisions we made on purpose.</p>

              <div className="space-y-6">
                {[
                  {
                    title: "Projects that remove support, not tutorials that add it.",
                    body: "Four builds in a fixed order — guided, then independent, then paired on a shared codebase, then a team capstone. Each stage takes something away.",
                  },
                  {
                    title: "Live mentor-led sessions, not a video library.",
                    body: "You get unblocked in the moment it happens, by someone who can see your screen and asks what you think is wrong before telling you.",
                  },
                  {
                    title: "A credential that had to be earned in front of someone.",
                    body: "The PAT is scored against a published rubric and defended live. It reports what you could do, banded and specific — not that you were present.",
                  },
                  {
                    title: "Built backwards from the interview.",
                    body: "The assessment is modelled on how hiring actually filters candidates, so preparing for the credential and preparing for the job are the same activity.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/15 hover:border-amber-500/30 transition-colors">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 04 — A Personal Note */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-amber-500 font-black text-lg">04</span>
                <div className="h-px flex-1 bg-amber-500/20" />
              </div>
              <h2 className="text-3xl font-bold mb-8 tracking-tight">A Personal Note</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  I started in physics. Then atmospheric science, where I spent my time computing on data that was messy, incomplete and not arranged for anybody's convenience — there was no tutorial for what I needed to do, so I read papers and other people's code until I could do it myself. Then artificial intelligence, formally, years after I had already been working in it. At every one of those moves the certificate in my hand explained the wrong thing about me, and I had to show people rather than tell them.
                </p>
                <p>
                  Then I taught, for seven years. That was the real education. A room of students will find the exact point where your understanding runs out, and they will find it in front of everybody. You cannot bluff a class. You learn to be precise, or you learn to be quiet.
                </p>
                <p>
                  Looking back, four things made me an engineer and not one of them was on a syllabus. Having to work without a tutorial. Having to explain myself to people who were not obliged to be impressed. Being questioned in public, repeatedly, by people with no stake in my confidence. And having to build something that worked before anyone would believe I could.
                </p>
              </div>

              <div className="my-10 pl-6 border-l-4 border-amber-500 relative">
                <Quote className="absolute -left-3 -top-2 w-5 h-5 text-amber-500 bg-background" />
                <p className="text-xl font-semibold text-foreground italic leading-relaxed">
                  All four happened to me by accident, slowly, across seven years and three fields. That is the inefficiency I want to remove — not the difficulty, the difficulty is the entire point, but the waiting and the luck.
                </p>
              </div>

              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  So the way I teach now comes straight out of that. When a student asks me what is wrong with their code, I do not tell them. I ask what they think is wrong, and I let the silence sit, because that silence is where the engineer gets built. When they finish a project, they defend it to someone who did not teach them. When they are sure they are finished, we change the requirement. Almost everything uncomfortable about SkillCred is something that was done to me by circumstance, and worked.
                </p>
                <p>
                  I should be straight about where we are. SkillCred is early. We have run a small pilot cohort end to end — the full project sequence, real defenses, real scores — and we are opening our first full cohorts now. What we have is a method I believe in and evidence that it works at small scale. What we do not have yet is a decade of placement statistics, and I would rather say that than manufacture it.
                </p>
              </div>
            </div>

            {/* Closing statement */}
            <div className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 text-center">
              <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-6">
                Anyone can finish a course. The rare thing is building something and holding your ground when someone questions it.
              </p>
              <p className="text-muted-foreground text-lg">
                That is what we teach, what we test, and what our students leave with.
              </p>
              <div className="mt-8 pt-6 border-t border-amber-500/20">
                <p className="font-bold text-foreground">Ganesan M</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Founder, SkillCred</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-8 border-t border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">If this resonates with you, I&apos;d love to chat.</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <RequestCallbackModal>
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 h-12 text-lg cursor-pointer">
                    Request a Callback
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </RequestCallbackModal>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-lg" asChild>
                  <Link href="/streams">Explore Programs</Link>
                </Button>
              </div>
            </div>

          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
}
