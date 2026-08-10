import { Suspense } from "react";
import AssessmentClient from "./assessment-client";

export const metadata = {
  title: "Career Counselor Assessment | SkillCred",
  description: "SkillCred Career Counselor Hiring Assessment",
};

export default function CounselorAssessmentPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <Suspense fallback={<div className="text-center p-12">Loading assessment...</div>}>
        <AssessmentClient />
      </Suspense>
    </main>
  );
}
