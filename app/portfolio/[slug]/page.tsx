import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Globe, Calendar, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

export default async function PublicPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const portfolio = await prisma.portfolio.findUnique({
        where: { publicSlug: slug },
        include: {
            student: {
                include: { user: true }
            },
            projects: {
                orderBy: { createdAt: "desc" }
            }
        }
    });

    if (!portfolio || !portfolio.isPublic) {
        notFound();
    }

    const experience = portfolio.experience as any[] || [];
    const education = portfolio.education as any[] || [];

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
                {/* Header / Hero */}
                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <Avatar className="w-32 h-32 border-4 border-primary/20">
                        <AvatarImage src={portfolio.student.user.image || ""} />
                        <AvatarFallback className="text-4xl">{portfolio.student.user.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-4xl font-bold font-heading">{portfolio.student.user.name}</h1>
                            <p className="text-xl text-muted-foreground">{portfolio.headline || "Student at SkillCred"}</p>
                        </div>
                        {portfolio.bio && <p className="max-w-2xl text-muted-foreground/80 leading-relaxed">{portfolio.bio}</p>}

                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            {portfolio.linkedinUrl && (
                                <Link href={portfolio.linkedinUrl} target="_blank">
                                    <Button variant="outline" size="sm" className="gap-2 rounded-full">
                                        <Linkedin className="w-4 h-4" /> LinkedIn
                                    </Button>
                                </Link>
                            )}
                            {portfolio.githubUrl && (
                                <Link href={portfolio.githubUrl} target="_blank">
                                    <Button variant="outline" size="sm" className="gap-2 rounded-full">
                                        <Github className="w-4 h-4" /> GitHub
                                    </Button>
                                </Link>
                            )}
                            {portfolio.student.user.email && (
                                <Link href={`mailto:${portfolio.student.user.email}`}>
                                    <Button variant="outline" size="sm" className="gap-2 rounded-full">
                                        <Mail className="w-4 h-4" /> Contact
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left Column (Skills, Education) */}
                    <div className="space-y-8">
                        {/* Skills */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-primary" /> Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {portfolio.skills.map(skill => (
                                    <Badge key={skill} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        {education.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-primary" /> Education
                                </h3>
                                <div className="space-y-4">
                                    {education.map((edu, i) => (
                                        <Card key={i} className="bg-white/5 border-white/5">
                                            <CardContent className="p-4">
                                                <div className="font-semibold">{edu.school}</div>
                                                <div className="text-sm text-muted-foreground">{edu.degree}</div>
                                                <div className="text-xs text-muted-foreground mt-1">{edu.year}</div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column (Projects, Experience) */}
                    <div className="md:col-span-2 space-y-12">
                        {/* Projects */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold border-b border-white/10 pb-4">Featured Projects</h2>
                            <div className="grid gap-6">
                                {portfolio.projects.map(project => (
                                    <Card key={project.id} className="bg-white/5 border-white/10 overflow-hidden hover:border-primary/20 transition-colors">
                                        <CardContent className="p-6 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-bold">{project.title}</h3>
                                                <div className="flex gap-2">
                                                    {project.projectUrl && (
                                                        <Link href={project.projectUrl} target="_blank">
                                                            <Globe className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                                                        </Link>
                                                    )}
                                                    {project.githubUrl && (
                                                        <Link href={project.githubUrl} target="_blank">
                                                            <Github className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground">{project.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.skills.map(skill => (
                                                    <Badge key={skill} variant="outline" className="text-xs bg-primary/5 border-primary/10">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        {experience.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold border-b border-white/10 pb-4">Experience</h2>
                                <div className="space-y-6">
                                    {experience.map((exp, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-lg">{exp.title}</h3>
                                                    <div className="text-primary">{exp.company}</div>
                                                </div>
                                                <div className="text-sm text-muted-foreground whitespace-nowrap">
                                                    {exp.startDate} - {exp.endDate}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
