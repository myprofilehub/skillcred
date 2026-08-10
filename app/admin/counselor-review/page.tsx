import { prisma } from "@/lib/db";
import { GenerateTokenForm } from "./generate-token-form";
import { AssessmentViewer } from "./assessment-viewer";

export const dynamic = "force-dynamic";

export default async function AdminReviewPage() {
  const assessments = await prisma.counselorAssessment.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Counselor Assessment Review</h1>
        
        <GenerateTokenForm />

        <AssessmentViewer assessments={assessments} />
      </div>
    </div>
  );
}
