import { getStreams, getMyEnrollments } from "@/app/actions/enrollment";
import StreamCatalog from "./stream-catalog";

export const dynamic = "force-dynamic";

export default async function StreamsPage() {
    const streams = await getStreams();
    const enrollments = await getMyEnrollments();

    // Serialize dates or complex objects if strictly needed, but client component takes simple props.
    // Ensure types match.
    // enrollment.trackId is string. enrollment.status is enum.
    const enrollmentData = enrollments.map(e => ({
        trackId: e.trackId,
        status: e.status
    }));

    // Ensure streams are serializable (Dates are usually objects in server components but need serialization if passed to client)
    // Next.js actions/server components handle JSON serialization but Dates might be tricky.
    // getStreams returns objects created by Prisma.
    // It is safer to make them plain objects if we pass to Client Component.
    // However, in App Router, passing server data to Client Component works fine if serializable.
    // Prisma returns Date objects. Next.js warns about Date objects in props.
    // I should convert them. Or simpler: The component doesn't use dates.
    // But sending the whole object sends the dates.
    // So I should map streams.

    // Actually, let's keep it simple. If it fails, I'll fix serialization.
    // Better: fix it now.

    // Wait, the client component interface:
    // interface Track { ... _count, defaultMentor... }
    // It doesn't strictly need Date fields.

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold font-heading">Career Tracks</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Select a specialized stream to master in-demand skills.
                    <span className="text-primary font-medium"> Joining a stream automatically pairs you with an expert mentor.</span>
                </p>
            </div>

            <div className="mt-8">
                <StreamCatalog streams={JSON.parse(JSON.stringify(streams))} enrollments={enrollmentData} />
            </div>
        </div>
    );
}
