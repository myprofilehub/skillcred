import { getScheduleEvents } from "@/app/actions/schedule";
import { fetchClassrooms } from "@/app/actions/google-classroom";
import { CalendarView } from "@/components/dashboard/schedule/calendar-view";
import { ScheduleDialog } from "@/components/dashboard/schedule/schedule-dialog";
import { auth } from "@/auth";

export default async function SchedulePage() {
    const session = await auth();
    if (!session?.user) return <div>Unauthorized</div>;

    // Fetch Data
    const eventsRes = await getScheduleEvents();
    const events = eventsRes.events;
    const classroomsRes = await fetchClassrooms();
    const classrooms = Array.isArray(classroomsRes) ? classroomsRes : [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Class Schedule</h1>
                    <p className="text-muted-foreground">Manage your classes and view deadlines.</p>
                </div>
                <div className="flex gap-2">
                    <ScheduleDialog classrooms={classrooms || []} />
                </div>
            </div>

            {/* Calendar View */}
            <CalendarView events={events || []} />
        </div>
    );
}
