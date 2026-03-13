import { InvestorSidebar } from "@/components/dashboard/investor-sidebar";

export default function InvestorDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-neutral-950">
            <InvestorSidebar />
            <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
                <div className="relative">
                    {/* Subtle ambient background blobs */}
                    <div className="fixed top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0 opacity-10">
                        <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-500 rounded-full filter blur-[150px]" />
                        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-[120px]" />
                    </div>
                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
