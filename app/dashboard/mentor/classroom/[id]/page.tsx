import { fetchGoogleClassroom, fetchCoursePeople, fetchCourseContent, fetchAnnouncements } from "@/app/actions/google-classroom";
import { PeopleTab } from "@/components/dashboard/people-tab";
import { ClassworkTab } from "@/components/dashboard/classwork-tab";
import { MarksTab } from "@/components/dashboard/marks-tab";
import { StreamTab } from "@/components/dashboard/stream-tab";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Users, MessageSquare, FileText, Settings, BookOpen, ExternalLink } from "lucide-react";
import { ClassroomHeader } from "@/components/dashboard/classroom-header";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const { id } = await params;

    if (!id) {
        return <div>Error: Invalid Course ID</div>;
    }

    const [courseData, peopleData, contentData, announcementsData] = await Promise.all([
        fetchGoogleClassroom(id),
        fetchCoursePeople(id),
        fetchCourseContent(id),
        fetchAnnouncements(id)
    ]);

    if ('error' in courseData && courseData.error) {
        return (
            <div className="p-8 text-center text-red-500 bg-red-500/10 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Error Loading Course</h2>
                <p>{String(courseData.error)}</p>
                <Link href="/dashboard/mentor/classroom">
                    <Button variant="outline" className="mt-4 gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Classroom
                    </Button>
                </Link>
            </div>
        );
    }

    const course = courseData as any;
    // Handle people data error or default to empty lists
    const people = ('error' in peopleData) ? { students: [], teachers: [] } : peopleData;
    const content = ('error' in contentData) ? { courseWork: [], topics: [] } : contentData;

    const announcements = Array.isArray(announcementsData) ? announcementsData : [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <ClassroomHeader course={course} />

            {/* Tabs Navigation */}
            <Tabs defaultValue="stream" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[600px] h-auto p-1 bg-muted/50">
                    <TabsTrigger value="stream" className="gap-2 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <MessageSquare className="w-4 h-4" /> Stream
                    </TabsTrigger>
                    <TabsTrigger value="classwork" className="gap-2 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <BookOpen className="w-4 h-4" /> Classwork
                    </TabsTrigger>
                    <TabsTrigger value="people" className="gap-2 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Users className="w-4 h-4" /> People
                    </TabsTrigger>
                    <TabsTrigger value="marks" className="gap-2 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <FileText className="w-4 h-4" /> Grades
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="stream" className="space-y-4">
                        <StreamTab courseId={id} announcements={announcements} user={session?.user} />
                    </TabsContent>

                    <TabsContent value="classwork" className="space-y-4">
                        <ClassworkTab courseId={id} content={content} />
                    </TabsContent>

                    <TabsContent value="people" className="space-y-4">
                        <PeopleTab courseId={id} people={people} />
                    </TabsContent>

                    <TabsContent value="marks" className="space-y-4">
                        <MarksTab courseId={id} courseWork={content.courseWork} students={people.students} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
