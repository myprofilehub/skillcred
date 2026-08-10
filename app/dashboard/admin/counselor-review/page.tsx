import { prisma } from "@/lib/db";
import { GenerateTokenForm } from "./generate-token-form";
import { AssessmentViewer } from "./assessment-viewer";

export const dynamic = "force-dynamic";

export default async function AdminReviewPage() {
  const assessments = await prisma.counselorAssessment.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Counselor Assessment Review</h1>
          <p className="text-slate-500">Review AI evaluations of counselor candidates</p>
        </div>
      </div>
        
      <GenerateTokenForm />

      <AssessmentViewer assessments={assessments} />
    </div>
  );
}
