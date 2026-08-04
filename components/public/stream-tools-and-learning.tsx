'use client';

import React from 'react';
import { Briefcase, Database, CheckCircle2, Brain, Layers, MessageSquare } from "lucide-react";

interface ToolItem {
  name: string;
  sub: string;
  color: string;
}

interface StreamToolsAndLearningProps {
  slug: string;
  accentColor: "orange" | "blue" | "green" | "purple";
  tools: ToolItem[];
}

const accentColors = {
  orange: {
    border: "border-orange-500/20",
    bg: "bg-orange-500/5",
    badgeBg: "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
    text: "text-orange-600 dark:text-orange-400",
  },
  blue: {
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
    badgeBg: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
    text: "text-blue-600 dark:text-blue-400",
  },
  green: {
    border: "border-green-500/20",
    bg: "bg-green-500/5",
    badgeBg: "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
    text: "text-green-600 dark:text-green-400",
  },
  purple: {
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
    badgeBg: "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
    text: "text-purple-600 dark:text-purple-400",
  }
};

const learningFeatures = [
  { title: "Live Mentor Sessions", desc: "Project-led guidance", icon: Briefcase },
  { title: "Real Production Code", desc: "Work with industry-standard codebases", icon: Database },
  { title: "Weekly Milestones", desc: "Track progress regularly", icon: CheckCircle2 },
  { title: "Recorded Lessons", desc: "For concept revision", icon: Brain },
  { title: "Step-by-step", desc: "Guided project building", icon: Layers },
  { title: "Doubt Support", desc: "Clear your queries with mentors", icon: MessageSquare },
];

export function StreamToolsAndLearning({ slug, accentColor, tools }: StreamToolsAndLearningProps) {
  const styles = accentColors[accentColor] || accentColors.orange;

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200 text-slate-900 relative overflow-hidden dark:bg-[#080d1a] dark:border-white/5 dark:text-slate-100">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Tools You Will Master */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2 text-slate-950 dark:text-white">Tools You Will Master</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                The essential industry tools and frameworks you will work with throughout this track.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool) => (
                <div 
                  key={tool.name} 
                  className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-center transition-colors hover:bg-slate-100/50 dark:bg-slate-900/60 dark:border-white/5 dark:hover:bg-slate-900/80"
                >
                  <span className={`text-sm font-bold ${tool.color}`}>{tool.name}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{tool.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: How You Will Learn */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2 text-slate-950 dark:text-white">How You Will Learn</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Our structured project-first pedagogy designed to build practical engineering capability.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {learningFeatures.map((item, i) => (
                <div 
                  key={i} 
                  className="flex gap-3.5 p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-100/50 dark:border-white/5 dark:bg-slate-900/40 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <div className={`p-2.5 rounded-lg ${styles.badgeBg} h-fit`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-950 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
