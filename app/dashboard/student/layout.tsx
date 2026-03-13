import { Sidebar } from "@/components/dashboard/sidebar";
import { UserStateProvider } from "@/components/providers/user-state-provider";

export default function StudentDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden">
            {/* Ambient Background specific to Student Dashboard if needed, or keep generic one in root */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] opacity-30 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[128px] opacity-30 animate-pulse" />
            </div>

            <UserStateProvider>
                <Sidebar />

                <main className="lg:ml-64 relative z-10 transition-all duration-300">
                    <div className="container mx-auto p-4 lg:p-8 pt-20 lg:pt-8 min-h-screen">
                        {children}
                    </div>
                </main>
            </UserStateProvider>
        </div>
    );
}
