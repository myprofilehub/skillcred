import { getTrackCurriculum } from "@/app/actions/curriculum-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Settings, Video, Code2 } from "lucide-react";
import { unstable_noStore } from "next/cache";

export async function CurriculumSyllabus({ trackSlug }: { trackSlug: string }) {
    unstable_noStore();
    const track = await getTrackCurriculum(trackSlug);
    
    console.log("CurriculumSyllabus Render:", trackSlug);
    console.log("Track resolved:", track ? track.title : "NULL");
    console.log("Courses length:", track?.courses?.length);

    if (!track || !track.courses || track.courses.length === 0) {
        return null;
    }

    // Sort or arrange courses if needed.
    // Assuming they are Standard (8w), Fast Track (4w), Capstone (2w)
    const sortedCourses = [...track.courses].sort((a, b) => {
        // Simple heuristic: Standard first, Fast next, Capstone last
        if (a.title.includes("Standard")) return -1;
        if (b.title.includes("Standard")) return 1;
        if (a.title.includes("Fast")) return -1;
        if (b.title.includes("Fast")) return 1;
        return 0;
    });

    return (
        <div className="w-full">
            <div className="w-full">
                <div className="text-center md:text-left mb-8">
                    <Badge variant="outline" className="mb-4">DETAILED SYLLABUS</Badge>
                    <h2 className="text-3xl font-bold font-heading mb-4">Curriculum by Program</h2>
                    <p className="text-muted-foreground text-lg">Choose your learning pace and explore the week-by-week structure.</p>
                </div>

                <Tabs defaultValue={sortedCourses[0]?.id} className="w-full">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto mb-8 bg-black/40 border border-white/10 p-1">
                        {sortedCourses.map((course) => {
                            let displayName = course.title;
                            if (course.title.includes("Standard")) displayName = "Standard (8 weeks)";
                            else if (course.title.includes("Fast Track")) displayName = "Fast Track (4 weeks)";
                            else if (course.title.includes("Capstone")) displayName = "Capstone Track (2 Weeks)";
                            
                            return (
                                <TabsTrigger 
                                    key={course.id} 
                                    value={course.id}
                                    className="py-3 data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all font-medium"
                                >
                                    {displayName}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>

                    {sortedCourses.map((course) => (
                        <TabsContent key={course.id} value={course.id} className="focus-visible:outline-none">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-indigo-500/20 rounded text-indigo-400">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-2xl font-bold">{course.title}</h3>
                                </div>
                                <p className="text-muted-foreground mb-8">{course.description}</p>

                                <div className="w-full">
                                    {course.modules.map((module) => (
                                        <div key={module.id} className="border-white/10 border-b last:border-0 pb-4 mb-4 last:mb-0">
                                            <div className="px-4 pt-4 pb-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-left w-full pr-4">
                                                    <Badge variant="secondary" className="w-fit">{module.title}</Badge>
                                                </div>
                                            </div>
                                            <div className="px-4 pb-2">
                                                <ul className="space-y-3">
                                                    {module.lessons.map((lesson) => (
                                                        <li key={lesson.id} className="flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-white/5">
                                                            <div className="mt-0.5 text-indigo-400">
                                                                {lesson.type === "VIDEO" && <Video className="w-4 h-4" />}
                                                                {lesson.type === "READING" && <BookOpen className="w-4 h-4" />}
                                                                {lesson.type === "ASSIGNMENT" && <Code2 className="w-4 h-4" />}
                                                                {(!lesson.type || lesson.type === "QUIZ") && <Settings className="w-4 h-4" />}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">{lesson.title}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}

