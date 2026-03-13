import { MentorSidebar } from "@/components/dashboard/mentor-sidebar";

export default function MentorDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <MentorSidebar />
            <main className="pl-64 min-h-screen">
                <div className="max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
