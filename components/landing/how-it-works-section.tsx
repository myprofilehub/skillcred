"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Code2,
  Rocket,
  Award,
  Briefcase,
  Users,
  CheckCircle2,
  DollarSign,
  Search,
  Calendar,
  UserCheck,
  Building2,
  LineChart,
  Lightbulb,
  TrendingUp,
  Handshake,
  Landmark
} from "lucide-react";

export function HowItWorksSection() {
  const personas = {
    students: [
      { num: "01", title: "Choose Track", desc: "Select from 8 engineering streams like AI/ML or Full Stack.", icon: Code2 },
      { num: "02", title: "Build Projects", desc: "Complete 15+ real-world projects with mentor support.", icon: Rocket },
      { num: "03", title: "Get Verified", desc: "Code reviews by experts earn you verified credentials.", icon: CheckCircle2 },
      { num: "04", title: "Get Hired", desc: "Unlock the Career Hub and connect with top recruiters.", icon: Briefcase },
    ],
    hr: [
      { num: "01", title: "Post Jobs", desc: "Create job listings targeting specific technical skills.", icon: Briefcase },
      { num: "02", title: "Filter Talent", desc: "Search for candidates with VERIFIED project portfolios.", icon: Search },
      { num: "03", title: "Interview", desc: "Schedule technical rounds with pre-assessed candidates.", icon: Calendar },
      { num: "04", title: "Hire", desc: "Reduce time-to-hire by 50% with skill-based hiring.", icon: UserCheck },
    ],
    investors: [
      { num: "01", title: "Discover", desc: "Browse high-potential student startups and projects.", icon: Lightbulb },
      { num: "02", title: "Analyze", desc: "Review pitch decks, code quality, and market viability.", icon: LineChart },
      { num: "03", title: "Connect", desc: "Schedule meetings with founders directly.", icon: Users },
      { num: "04", title: "Invest", desc: "Fund the next generation of tech unicorns.", icon: TrendingUp },
    ],
  };

  return (
    <section id="how-it-works" className="py-24 bg-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="outline" className="mb-4 text-white">Workflow</Badge>
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-12">
          How <span className="text-indigo-400">SkillCred</span> Works
        </h2>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-black/50 border border-white/10 mb-12 h-auto p-1">
            <TabsTrigger value="students" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-2">Students</TabsTrigger>
            <TabsTrigger value="hr" className="data-[state=active]:bg-amber-600 data-[state=active]:text-black py-2">HR</TabsTrigger>
            <TabsTrigger value="investors" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white py-2">Investors</TabsTrigger>
          </TabsList>

          {Object.entries(personas).map(([key, steps]) => (
            <TabsContent key={key} value={key} className="mt-0 focus-visible:outline-none focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

                {steps.map((step, index) => (
                  <div key={index} className="relative z-10 group">
                    <div className="w-24 h-24 mx-auto bg-black border border-white/10 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6 shadow-xl group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/5" />
                      <step.icon className={`w-10 h-10 ${key === 'students' ? 'text-indigo-400' :
                        key === 'hr' ? 'text-amber-400' :
                          'text-purple-400'
                        }`} />
                      <div className="absolute top-2 right-2 text-xs font-mono text-muted-foreground opacity-50">{step.num}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm px-4">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Section CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" className="h-12 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-[0_0_15px_rgba(79,70,229,0.4)]" asChild>
            <Link href="/enroll">
              Join SkillCred
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
