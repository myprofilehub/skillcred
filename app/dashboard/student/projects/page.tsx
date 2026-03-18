
import { getMyEnrollments } from "@/app/actions/enrollment";
import { getStudentCurriculumProgress } from "@/app/actions/curriculum-actions";
import { StudentProjectBrowser } from "@/components/dashboard/student/project-browser";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-dynamic';

export default async function StudentProjectsPage() {
    const enrollments = await getMyEnrollments();

    // Fetch progress-enriched catalogs for all enrolled tracks
    const catalogs = await Promise.all(
        enrollments.map(async (enrollment) => {
            const result = await getStudentCurriculumProgress(enrollment.track.slug);

            if ("error" in result) {
                return {
                    track: enrollment.track,
                    projects: [],
                    progress: { total: 0, completed: 0, percentage: 0, patEligible: false }
                };
            }

            return {
                track: result.track!,
                projects: result.projects || [],
                progress: result.progress!
            };
        })
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Project Library</h1>
                <p className="text-slate-400">Browse and track progress on your enrolled stream projects.</p>
            </div>
            <Separator className="bg-slate-800" />

            <StudentProjectBrowser catalogs={catalogs} />
        </div>
    );
}
