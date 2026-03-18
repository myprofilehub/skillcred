import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
    Users, 
    FileText, 
    Video, 
    Mail, 
    Briefcase, 
    Calendar,
    Code,
    Linkedin,
    Github,
    Play
} from "lucide-react";

export const metadata = {
    title: "Mentor Applications | Admin Dashboard"
};

export default async function MentorApplicationsPage() {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        redirect("/");
    }

    const applications = await prisma.mentorApplication.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const totalApps = applications.length;
    const pendingApps = applications.filter(a => a.status === 'PENDING').length;

    return (
        <div className="min-h-[calc(100vh-4rem)]">
            {/* Header Section */}
            <div className="mb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20 border border-cyan-400/20">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            Mentor Applications
                        </h1>
                        <p className="mt-3 text-sm text-cyan-100/60 font-medium">
                            Review and manage incoming technical mentor applications.
                        </p>
                    </div>
                    
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="bg-slate-900/40 backdrop-blur-md border border-cyan-500/10 rounded-xl p-4 flex-1 md:min-w-[160px] flex items-center gap-4 hover:border-cyan-500/30 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Apps</p>
                                <p className="text-2xl font-bold text-white">{totalApps}</p>
                            </div>
                        </div>
                        <div className="bg-slate-900/40 backdrop-blur-md border border-amber-500/10 rounded-xl p-4 flex-1 md:min-w-[160px] flex items-center gap-4 hover:border-amber-500/30 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending</p>
                                <p className="text-2xl font-bold text-white">{pendingApps}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Applications Grid */}
            <div className="pb-12">
                {applications.length === 0 ? (
                    <div className="text-center py-24 bg-slate-900/20 backdrop-blur-sm rounded-3xl border border-dashed border-cyan-500/20 max-w-2xl mx-auto">
                        <Users className="w-12 h-12 text-cyan-500/40 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-white">No applications yet</h3>
                        <p className="text-cyan-100/50 mt-2">When mentors apply, their applications will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {applications.map((app) => (
                            <div key={app.id} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-cyan-500/10 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 group flex flex-col shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_20px_rgba(6,182,212,0.05)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_30px_rgba(6,182,212,0.15)] relative">
                                
                                {/* Card Header */}
                                <div className="p-6 border-b border-cyan-500/10 bg-gradient-to-b from-slate-800/50 to-transparent relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
                                    <div className="flex justify-between items-start mb-5 relative z-10">
                                        <div className="flex items-center gap-4 max-w-[75%]">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
                                                {(app.firstName?.[0] || app.email[0]).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-white text-lg truncate drop-shadow-sm">
                                                    {app.firstName} {app.lastName}
                                                </h3>
                                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-100/60 truncate mt-0.5">
                                                    <Mail className="w-3.5 h-3.5 text-cyan-500/70" />
                                                    <span className="truncate">{app.email}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end shrink-0">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                app.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                                                app.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                            }`}>
                                                {app.status === 'PENDING' && <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse"></div>}
                                                {app.status}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-5 text-xs text-slate-400 font-medium bg-slate-950/30 px-3 py-2 rounded-lg border border-slate-800/50">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-cyan-500/50" />
                                            {app.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        {app.experience && (
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase className="w-4 h-4 text-amber-500/50" />
                                                <span className="truncate max-w-[120px] text-slate-300">{app.experience}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex-1 flex flex-col space-y-6 relative">
                                    {/* Domains */}
                                    <div>
                                        <p className="text-[10px] font-semibold text-cyan-500/50 uppercase tracking-widest mb-3">Expertise Domains</p>
                                        <div className="flex flex-wrap gap-2">
                                            {app.domains.map((domain, i) => (
                                                <span key={i} className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 backdrop-blur-sm shadow-[0_2px_10px_rgba(6,182,212,0.05)]">
                                                    {domain}
                                                </span>
                                            ))}
                                            {(!app.domains || app.domains.length === 0) && (
                                                <span className="text-sm text-slate-500 font-medium italic">Not specified</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tools */}
                                    {app.tools && (
                                        <div>
                                            <p className="text-[10px] font-semibold text-cyan-500/50 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                                <Code className="w-3.5 h-3.5" /> Tech Stack
                                            </p>
                                            <p className="text-sm text-slate-300 leading-relaxed line-clamp-2 bg-slate-950/40 p-3 rounded-xl border border-cyan-500/5 backdrop-blur-sm">{app.tools}</p>
                                        </div>
                                    )}

                                    {/* Social Links */}
                                    {(app.linkedinUrl || app.githubUrl) && (
                                        <div className="flex gap-2 pt-2">
                                            {app.linkedinUrl && (
                                                <a href={app.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600/50 px-3 py-2 rounded-lg border border-blue-500/20 transition-all shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                                                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                                                </a>
                                            )}
                                            {app.githubUrl && (
                                                <a href={app.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700 px-3 py-2 rounded-lg border border-slate-700 transition-all shadow-[0_0_10px_rgba(255,255,255,0.02)]">
                                                    <Github className="w-3.5 h-3.5" /> GitHub
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Card Footer (Actions) */}
                                <div className="p-4 bg-slate-900/60 border-t border-cyan-500/10 grid grid-cols-2 gap-3 mt-auto relative overflow-hidden backdrop-blur-md">
                                    {app.resumeUrl ? (
                                        <a 
                                            href={app.resumeUrl} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/50 border border-cyan-500/20 rounded-xl text-xs sm:text-sm font-semibold text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/40 transition-all shadow-[0_0_10px_rgba(6,182,212,0.05)]"
                                        >
                                            <FileText className="w-4 h-4" /> Resume
                                        </a>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900/50 border border-slate-800 border-dashed rounded-xl text-xs sm:text-sm font-semibold text-slate-600 cursor-not-allowed">
                                            <FileText className="w-4 h-4" /> No Resume
                                        </div>
                                    )}
                                    
                                    {app.videoUrl ? (
                                        <a 
                                            href={app.videoUrl} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 border border-transparent rounded-xl text-xs sm:text-sm font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] whitespace-nowrap"
                                        >
                                            <Play className="w-4 h-4 fill-current" /> Video Intro
                                        </a>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900/50 border border-slate-800 border-dashed rounded-xl text-xs sm:text-sm font-semibold text-slate-600 cursor-not-allowed whitespace-nowrap">
                                            <Video className="w-4 h-4" /> No Video
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
