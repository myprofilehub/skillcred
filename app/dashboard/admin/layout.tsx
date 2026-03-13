import { AdminSidebar } from "@/components/dashboard/admin-sidebar";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8 bg-slate-950 relative">
                <div className="absolute inset-0 z-0">
                    <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500 opacity-20 blur-[100px]"></div>
                </div>
                <div className="relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
