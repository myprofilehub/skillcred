import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { fetchClassrooms } from "@/app/actions/google-classroom";
import { RosterClassroomCard } from "@/components/dashboard/roster-classroom-card";
import { Card, CardContent } from "@/components/ui/card";

export default async function MentorStudentsPage() {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");

    // Fetch classrooms to list them for selection
    const classrooms = await fetchClassrooms();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Student Roster</h1>
                <p className="text-muted-foreground">
                    Select a classroom to view detailed student performance, attendance logs, and verifications.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(classrooms) && classrooms.length > 0 ? (
                    classrooms.map((course: any) => (
                        <RosterClassroomCard
                            key={course.id}
                            course={course}
                            studentCount={course.students?.length || 0}
                            href={`/dashboard/mentor/students/${course.id}`} // Takes user to the new Roster Layout
                        />
                    ))
                ) : (
                    <Card className="col-span-full py-10 border-dashed">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                            <p className="text-muted-foreground mb-4">No active Google Classrooms found.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
