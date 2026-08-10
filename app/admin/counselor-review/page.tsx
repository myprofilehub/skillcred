import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { GenerateTokenForm } from "./generate-token-form";

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

        {assessments.length === 0 ? (
          <div className="text-slate-500">No assessments found.</div>
        ) : (
          <div className="space-y-12">
            {assessments.map(a => (
              <div key={a.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold mb-1">
                      {a.candidateName ? a.candidateName : `Token: ${a.token.substring(0, 8)}...`}
                    </h2>
                    {a.candidateEmail && (
                      <p className="text-sm text-slate-500 mb-3">{a.candidateEmail}</p>
                    )}
                    <div className="flex space-x-2">
                      <Badge variant={a.status === "STAGE_3_COMPLETED" ? "default" : "secondary"}>
                        {a.status}
                      </Badge>
                      {a.guaranteeFlag && (
                        <Badge variant="destructive">Guarantee Flag: HIT</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p>Notice: {a.noticePeriod} days</p>
                    <p>Current CTC: {a.currentCTC} | Expected: {a.expectedCTC}</p>
                    <p>Chennai Onsite: {a.chennaiOnsite ? "Yes" : "No"}</p>
                    <p>Sales Exp: {a.yearsSales} years</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Voice Answers */}
                  <div className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">Voice Answers</h3>
                    <div>
                      <p className="text-sm font-medium mb-2">Tamil (Introduce yourself)</p>
                      {a.voiceTamilUrl ? (
                        <audio controls src={a.voiceTamilUrl} className="w-full" />
                      ) : <p className="text-sm text-slate-400">No recording</p>}
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">English (Why join us)</p>
                      {a.voiceEnglishUrl ? (
                        <audio controls src={a.voiceEnglishUrl} className="w-full" />
                      ) : <p className="text-sm text-slate-400">No recording</p>}
                    </div>
                    <div className="pt-2">
                      <label className="text-sm font-medium">Fluency Score (1-5)</label>
                      <input type="range" min="1" max="5" defaultValue="3" className="w-full mt-2" />
                    </div>
                  </div>

                  {/* Written Answers */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Written Answers</h3>
                    <div className="text-sm space-y-2">
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded">
                        <p className="font-semibold mb-1">Q1: fees ah?</p>
                        <p>{a.writtenQ1}</p>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded">
                        <p className="font-semibold mb-1">Q2: Worth it at his age?</p>
                        <p>{a.writtenQ2}</p>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded">
                        <p className="font-semibold mb-1">Q3: Placement guarantee irukka?</p>
                        <p className={a.guaranteeFlag ? "text-red-600 font-medium" : ""}>{a.writtenQ3}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Videos */}
                <div className="space-y-4 border-t pt-8">
                  <h3 className="font-semibold text-lg mb-4">Objection Handling Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { url: a.objection1Url, label: "Obj 1: Guarantee a job?" },
                      { url: a.objection2Url, label: "Obj 2: ₹9,999 is too much" },
                      { url: a.objection3Url, label: "Obj 3: No coding background" },
                      { url: a.objection4Url, label: "Obj 4: Discuss with parents" },
                      { url: a.objection5Url, label: "Obj 5: Recognised certificate?" },
                      { url: a.objection6Url, label: "Obj 6: Trust a new company?" }
                    ].map((obj, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2">{obj.label}</p>
                        {obj.url ? (
                          <video controls src={obj.url} className="w-full rounded bg-black aspect-video object-cover" />
                        ) : (
                          <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-sm text-slate-500">No video</div>
                        )}
                        <div className="mt-3">
                          <label className="text-xs font-medium">Score (1-5)</label>
                          <input type="range" min="1" max="5" defaultValue="3" className="w-full mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Final Notes */}
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="font-semibold text-lg mb-4">Reviewer Notes</h3>
                  <textarea 
                    className="w-full p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" 
                    rows={4} 
                    placeholder="Enter final notes and observations..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
