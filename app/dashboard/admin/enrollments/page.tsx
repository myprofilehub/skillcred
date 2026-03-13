import { getEnrollmentsForAdmin } from "@/app/actions/admin-actions";
import { EnrollmentsList } from "./enrollments-list";
import { GraduationCap } from "lucide-react";

export default async function AdminEnrollmentsPage() {
    const { enrollments, mentors } = await getEnrollmentsForAdmin();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-cyan-400" />
                    Enrollments
                </h1>
                <p className="text-slate-400 mt-1">
                    Manage paid student enrollments and assign mentors
                </p>
            </div>

            <EnrollmentsList initialEnrollments={enrollments as any} mentors={mentors as any} />
        </div>
    );
}
