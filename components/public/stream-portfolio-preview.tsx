'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, ShieldCheck, CheckCircle2, ArrowUpRight, Github, Code, ExternalLink, Trophy } from "lucide-react";

import { ProjectRoadmap, MiniProjectsCard } from "./project-roadmap";

interface ProjectMock {
  title: string;
  desc: string;
  tech: string[];
  metrics: { name: string; score: number }[];
  githubUrl: string;
  liveUrl: string;
}

interface StreamPortfolioPreviewProps {
  slug: string;
  accentColor: "orange" | "blue" | "green" | "purple";
  skills: string[];
  outcomes: string[];
  projects: ProjectMock[];
  variant?: "roadmap" | "default";
}

const accentColors = {
  orange: {
    border: "border-orange-500/20 hover:border-orange-500/40",
    bg: "bg-orange-500/5",
    badgeBg: "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30",
    fillBg: "bg-orange-500/10 dark:bg-orange-500/20",
    text: "text-orange-600 dark:text-orange-400",
    btn: "bg-orange-600 hover:bg-orange-700",
    glow: "shadow-orange-500/5"
  },
  blue: {
    border: "border-blue-500/20 hover:border-blue-500/40",
    bg: "bg-blue-500/5",
    badgeBg: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
    fillBg: "bg-blue-500/10 dark:bg-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    btn: "bg-blue-600 hover:bg-blue-700",
    glow: "shadow-blue-500/5"
  },
  green: {
    border: "border-green-500/20 hover:border-green-500/40",
    bg: "bg-green-500/5",
    badgeBg: "bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30",
    fillBg: "bg-green-500/10 dark:bg-green-500/20",
    text: "text-green-600 dark:text-green-400",
    btn: "bg-green-600 hover:bg-green-700",
    glow: "shadow-green-500/5"
  },
  purple: {
    border: "border-purple-500/20 hover:border-purple-500/40",
    bg: "bg-purple-500/5",
    badgeBg: "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30",
    fillBg: "bg-purple-500/10 dark:bg-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    btn: "bg-purple-600 hover:bg-purple-700",
    glow: "shadow-purple-500/5"
  }
};

export function StreamPortfolioPreview({ slug, accentColor, skills, outcomes, projects, variant = "default" }: StreamPortfolioPreviewProps) {
  const styles = accentColors[accentColor] || accentColors.orange;
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="py-24 bg-white border-y border-slate-200 relative overflow-hidden text-slate-800 dark:bg-[#0a0f1d] dark:border-white/5 dark:text-slate-100">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {variant === "roadmap" && (
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-950 dark:text-white">
              Project Roadmap
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
              A rigorous 4-project spine that mirrors actual industry workflows, augmented by targeted add-on mini-projects.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-start">
          
          {variant === "roadmap" ? (
            /* Left Column - Project Roadmap (Core 4-Project Spine) */
            <div className="lg:col-span-6">
              <ProjectRoadmap trackSlug={slug} accentColor={accentColor} showMiniProjects={false} />
            </div>
          ) : (
            /* Left Column - Original Marketing Copy */
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className={`${styles.badgeBg}`}>
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Recruiter Verified
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-950 dark:text-white font-heading">
                  Your Portfolio Output
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  Your SkillCred portfolio isn't a static resume. It is a live, verified candidate profile showcasing working architectures, clean code, and assessment scores hiring managers trust.
                </p>
              </div>

              {/* Feature list */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start p-4 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-white/5 dark:bg-white/[0.02]">
                  <div className={`p-2 rounded-lg ${styles.badgeBg} h-fit`}>
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white text-sm">Verified PAT Score</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Recruiters filter candidates by actual competency scores across system design and code quality.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-white/5 dark:bg-white/[0.02]">
                  <div className={`p-2 rounded-lg ${styles.badgeBg} h-fit`}>
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white text-sm">Interactive Architecture Diagrams</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Showcase the real microservices and databases you designed and deployed, not just code snippets.</p>
                  </div>
                </div>
              </div>

              {/* Outcomes */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                <h4 className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-4">Target Career Roles</h4>
                <div className="flex flex-wrap gap-2">
                  {outcomes.map((role) => (
                    <Badge 
                      key={role} 
                      variant="outline" 
                      className="border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]"
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Right Column - Mini Projects OR Premium Recruiter View Mockup */}
          <div className={variant === "roadmap" ? "lg:col-span-6" : "lg:col-span-7"}>
            {variant === "roadmap" ? (
              <MiniProjectsCard trackSlug={slug} accentColor={accentColor} />
            ) : (
              <Card className="bg-white border-slate-200 shadow-2xl relative overflow-hidden text-slate-800 dark:bg-slate-900/80 dark:border-white/5 dark:text-slate-100">
              <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${styles.btn.replace("bg-", "from-").replace("hover:bg-", "to-")}`} />
              
              <CardHeader className="border-b border-slate-150 dark:border-white/5 pb-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm dark:bg-slate-800 dark:border-white/10 dark:text-white">
                      SC
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2">
                        Candidate #SC-7241
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500 dark:text-slate-400">PAT ID: pat_8291_active</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] uppercase font-bold tracking-wider dark:text-emerald-400">
                      ★ PAT Certified
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] dark:bg-white/5 dark:text-slate-300 dark:border-white/10">
                      Recruiter View
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* Skills Filters */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Recruiter Skill Matches:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-700 text-xs border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-white/5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Interactive Project Viewer */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Verified Project Catalog:</span>
                  
                  {/* Project Tabs */}
                  <div className="flex gap-1 overflow-x-auto pb-1 border-b border-slate-150 dark:border-white/5">
                    {projects.map((proj, idx) => (
                      <button
                        key={proj.title}
                        onClick={() => setActiveProject(idx)}
                        className={`px-3 py-1.5 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-all ${
                          activeProject === idx 
                            ? `${styles.fillBg} ${styles.text} border-t border-x border-slate-200 dark:border-white/10` 
                            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                        }`}
                      >
                        {proj.title}
                      </button>
                    ))}
                  </div>

                  {/* Project Detail Card */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4 dark:border-white/5 dark:bg-slate-950/50">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h5 className="font-bold text-sm text-slate-950 dark:text-white">{projects[activeProject].title}</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{projects[activeProject].desc}</p>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] whitespace-nowrap dark:text-emerald-400">
                        ✓ Mentor Verified
                      </Badge>
                    </div>

                    {/* Tech used */}
                    <div className="flex flex-wrap gap-1">
                      {projects[activeProject].tech.map((t) => (
                        <span key={t} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded dark:bg-slate-900 dark:border-white/5 dark:text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Scores */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-white/5">
                      {projects[activeProject].metrics.map((m) => (
                        <div key={m.name} className="bg-white p-2 rounded border border-slate-200 dark:bg-slate-900/50 dark:border-white/5">
                          <span className="text-[10px] text-slate-400 block">{m.name}</span>
                          <span className="font-bold text-xs text-slate-950 dark:text-white">{m.score}/100</span>
                        </div>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2">
                      <Button size="sm" variant="outline" className="h-8 text-xs border-slate-200 hover:bg-slate-100 text-slate-700 gap-1.5 dark:border-white/10 dark:hover:bg-white/5 dark:text-slate-200" asChild>
                        <a href={projects[activeProject].githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3.5 h-3.5" /> Repository <ArrowUpRight className="w-3 h-3 text-slate-400" />
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-xs border-slate-200 hover:bg-slate-100 text-slate-700 gap-1.5 dark:border-white/10 dark:hover:bg-white/5 dark:text-slate-200" asChild>
                        <a href={projects[activeProject].liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo <ArrowUpRight className="w-3 h-3 text-slate-400" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              </Card>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
