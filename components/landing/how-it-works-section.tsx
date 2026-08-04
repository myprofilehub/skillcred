"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock, Laptop, Briefcase, Rocket } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Lock Your Seat", desc: "Pay a fully refundable ₹500 deposit to secure your spot in the next cohort.", icon: Lock },
    { num: "02", title: "Access LMS", desc: "Get immediate access to your dedicated workspace and pre-read materials.", icon: Laptop },
    { num: "03", title: "Build Portfolio", desc: "Work on live, mentor-supported projects to build a verifiable portfolio.", icon: Rocket },
    { num: "04", title: "Get Hired", desc: "Clear the PAT to enter our exclusive hiring pool for top tech companies.", icon: Briefcase },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="outline" className="mb-4 text-amber-700 bg-amber-50 border-amber-200 font-bold px-4 py-1">Zero Risk Entry</Badge>
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-slate-900 tracking-tight">
          How <span className="text-amber-500">SkillCred</span> Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-1/8 w-3/4 h-0.5 bg-slate-100 z-0 transform translate-x-[12.5%]" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 group">
              <div className="w-24 h-24 mx-auto bg-white border-2 border-slate-100 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-amber-300 transition-all duration-300 relative overflow-hidden">
                <step.icon className="w-10 h-10 text-amber-500" />
                <div className="absolute top-1 right-2 text-xs font-black text-slate-100">{step.num}</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
              <p className="text-slate-600 text-sm px-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-20 text-center">
          <Button size="lg" className="h-14 px-10 text-lg bg-slate-900 hover:bg-slate-800 text-white font-black shadow-lg" asChild>
            <Link href="/enroll">
              Start Your Journey
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
