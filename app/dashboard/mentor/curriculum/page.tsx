
import { getStreamsForAdmin } from "@/app/actions/curriculum-actions";
import { CurriculumManager } from "@/components/dashboard/admin/curriculum-manager";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-dynamic';

export default async function MentorCurriculumPage() {
    const streams = await getStreamsForAdmin();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Project Catalog</h1>
                <p className="text-slate-400">View and manage projects for your stream.</p>
            </div>
            <Separator className="bg-slate-800" />

            <CurriculumManager streams={streams} userRole="MENTOR" />
        </div>
    );
}
