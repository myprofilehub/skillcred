import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
    getPortfolio,
    checkPortfolioUnlockStatus
} from "@/app/actions/portfolio";
import PortfolioClient from "./client-portfolio";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    // Check unlock status (and auto-unlock if eligible)
    await checkPortfolioUnlockStatus();

    // Fetch portfolio data
    const result = await getPortfolio();

    if ("error" in result) {
        return (
            <div className="p-8 text-center text-red-500">
                <h2 className="text-xl font-bold">Error Loading Portfolio</h2>
                <p>{result.error}</p>
            </div>
        );
    }

    return (
        <PortfolioClient
            portfolio={result.portfolio}
            isUnlocked={result.portfolio?.isUnlocked || false}
            studentName={session.user.name || "Student"}
        />
    );
}
