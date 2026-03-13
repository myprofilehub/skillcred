
import { getMyEnrollments } from "@/app/actions/enrollment";
import { getProjectCatalog } from "@/app/actions/curriculum-actions";
import { StudentProjectBrowser } from "@/components/dashboard/student/project-browser";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-dynamic';

export default async function StudentProjectsPage() {
    const enrollments = await getMyEnrollments();

    // Fetch catalogs for all enrolled tracks
    const catalogs = await Promise.all(
        enrollments.map(async (enrollment) => {
            const catalog = await getProjectCatalog(enrollment.track.slug);
            return {
                track: enrollment.track,
                projects: catalog.projects || []
            };
        })
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Project Library</h1>
                <p className="text-slate-400">Browse and select projects for your enrolled streams.</p>
            </div>
            <Separator className="bg-slate-800" />

            <StudentProjectBrowser catalogs={catalogs} />
        </div>
    );
}
