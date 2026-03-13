import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardRootPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    // Fallback: Check email if role is missing or incorrect
    if (session.user.role === "ADMIN") {
        redirect("/dashboard/admin");
    } else if (session.user.role === "MENTOR" || session.user.email === "admin@codequestzone.com") {
        redirect("/dashboard/mentor");
    } else if (session.user.role === "HR") {
        redirect("/dashboard/hr");
    } else if (session.user.role === "INVESTOR") {
        redirect("/dashboard/investor");
    } else {
        redirect("/dashboard/student");
    }
}
