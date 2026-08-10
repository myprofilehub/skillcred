"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CounselorAssessment } from "@prisma/client";
import { saveAdminNotes } from "@/actions/admin-actions";
import { toast } from "sonner";

interface AssessmentViewerProps {
  assessments: CounselorAssessment[];
}

export function AssessmentViewer({ assessments }: AssessmentViewerProps) {
  const [selectedId, setSelectedId] = useState<string>(
    assessments.length > 0 ? assessments[0].id : ""
  );
  const [isPending, startTransition] = useTransition();

  if (assessments.length === 0) {
    return <div className="text-slate-500">No assessments found.</div>;
  }

  const selectedAssessment = assessments.find(a => a.id === selectedId) || assessments[0];
  const a = selectedAssessment;

  const handleNotesChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    if (newNotes === a.adminNotes) return; // don't save if unchanged

    startTransition(async () => {
      const res = await saveAdminNotes(a.id, newNotes);
      if (res.success) {
        toast.success("Notes saved successfully");
        // Opt: we'd ideally mutate the state here if we wanted it perfectly in sync, 
        // but since we get data via server components, it's mostly fine for this view.
      } else {
        toast.error("Failed to save notes");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Selector */}
      <div className="bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block text-slate-700 dark:text-slate-300">
            Select Candidate to Review
          </label>
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger className="w-full md:w-96">
              <SelectValue placeholder="Select a candidate" />
            </SelectTrigger>
            <SelectContent>
              {assessments.map((assessment) => (
                <SelectItem key={assessment.id} value={assessment.id}>
                  {assessment.candidateName || `Token: ${assessment.token.substring(0, 8)}...`}
                  {assessment.candidateEmail ? ` (${assessment.candidateEmail})` : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-slate-500 text-right">
          <p>Total Submissions: {assessments.length}</p>
        </div>
      </div>

      {/* Selected Assessment Details */}
      {a && (
        <div className="bg-white dark:bg-white border border-slate-200 dark:border-slate-200 rounded-xl p-8 shadow-sm">
          
          {a.cumulativeScore !== null && (
            <div className="mb-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${a.cumulativeScore >= 80 ? 'bg-green-100 text-green-700' : a.cumulativeScore < 50 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                  {a.cumulativeScore}/100
                </div>
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">Cumulative AI Verdict</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium">{a.cumulativeFeedback}</p>
            </div>
          )}

          <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100 dark:border-slate-200">
            <div>
              <h2 className="text-xl font-bold mb-1">
                {a.candidateName ? a.candidateName : `Token: ${a.token.substring(0, 8)}...`}
              </h2>
              {a.candidateEmail && (
                <p className="text-sm text-slate-500 mb-3">{a.candidateEmail}</p>
              )}
              <div className="flex space-x-2">
                <Badge variant={a.status === "STAGE_3_COMPLETED" ? "default" : "secondary"}>
                  {a.status.replace(/_/g, " ")}
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
            <div className="space-y-4 bg-slate-50 dark:bg-slate-100/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Voice Answers</h3>
                {a.voiceScore !== null && (
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    a.voiceScore >= 4 ? 'bg-green-100 text-green-700' :
                    a.voiceScore <= 2 ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    AI Score: {a.voiceScore}/5
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Tamil (Introduce yourself)</p>
                {a.voiceTamilUrl ? (
                  <audio controls src={a.voiceTamilUrl} className="w-full" />
                ) : <p className="text-sm text-slate-500">No recording</p>}
              </div>
              <div>
                <p className="text-sm font-medium mb-2">English (Why join us)</p>
                {a.voiceEnglishUrl ? (
                  <audio controls src={a.voiceEnglishUrl} className="w-full" />
                ) : <p className="text-sm text-slate-500">No recording</p>}
              </div>
              
              {a.voiceFeedback && (
                <div className="pt-2">
                  <p className="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-white p-2 border border-slate-200 dark:border-slate-300 rounded">
                    <span className="font-semibold text-xs text-slate-500 uppercase block mb-1">AI Feedback</span>
                    {a.voiceFeedback}
                  </p>
                </div>
              )}
            </div>

            {/* Written Answers & Triage */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Written Answers</h3>
                {a.empathyScore !== null && (
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    a.empathyScore >= 8 ? 'bg-green-100 text-green-700' :
                    a.empathyScore < 5 ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    AI Empathy Score: {a.empathyScore}/10
                  </div>
                )}
              </div>
              {a.empathyFeedback && (
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 p-3 rounded-lg text-sm border border-blue-100 dark:border-blue-800">
                  <span className="font-semibold">AI Empathy Insight: </span>
                  {a.empathyFeedback}
                </div>
              )}
              <div className="text-sm space-y-2">
                <div className="bg-slate-100 dark:bg-slate-100 p-3 rounded">
                  <p className="font-semibold mb-1">Q1: Student Inquiry about Fees</p>
                  <p>{a.writtenQ1}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-100 p-3 rounded">
                  <p className="font-semibold mb-1">Q2: Working Professional Inquiry on AI/ML</p>
                  <p>{a.writtenQ2}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-100 p-3 rounded">
                  <p className="font-semibold mb-1">Q3: Parent Inquiry on Placement Guarantee</p>
                  <p className={a.guaranteeFlag ? "text-red-600 font-medium" : ""}>{a.writtenQ3}</p>
                </div>
              </div>

              {a.triageScore !== null && (
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-md text-slate-800 dark:text-slate-200">AI Triage Analysis</h3>
                    <div className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs font-bold">
                      Score: {a.triageScore}/10
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white p-3 rounded border border-slate-100 dark:border-slate-200">
                    {a.triageFeedback}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Videos */}
          <div className="space-y-4 border-t pt-8">
            <h3 className="font-semibold text-lg mb-4">Objection Handling Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { url: a.objection1Url, score: a.objection1Score, label: "Obj 1: Guarantee a job?" },
                { url: a.objection2Url, score: a.objection2Score, label: "Obj 2: ₹9,999 is too much" },
                { url: a.objection3Url, score: a.objection3Score, label: "Obj 3: No coding background" },
                { url: a.objection4Url, score: a.objection4Score, label: "Obj 4: Discuss with parents" },
                { url: a.objection5Url, score: a.objection5Score, label: "Obj 5: Recognised certificate?" },
                { url: a.objection6Url, score: a.objection6Score, label: "Obj 6: Trust a new company?" }
              ].map((obj, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-100/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium">{obj.label}</p>
                    {obj.score !== null && (
                      <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                        {obj.score}/5
                      </span>
                    )}
                  </div>
                  {obj.url ? (
                    <video controls src={obj.url} className="w-full rounded bg-black aspect-video object-cover" />
                  ) : (
                    <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-sm text-slate-500">No video</div>
                  )}
                  {obj.score === null && (
                    <div className="mt-3">
                      <label className="text-xs font-medium text-slate-500">Manual Score</label>
                      <input type="range" min="1" max="5" defaultValue="3" className="w-full mt-1 opacity-50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Final Notes */}
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-200">
            <h3 className="font-semibold text-lg mb-4">Reviewer Notes</h3>
            <textarea 
              className="w-full p-4 rounded-lg border border-slate-200 dark:border-slate-300 bg-white dark:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" 
              rows={4} 
              defaultValue={a.adminNotes || ""}
              onBlur={handleNotesChange}
              disabled={isPending}
              placeholder="Enter final notes and observations... (auto-saves when you click outside)"
            />
          </div>
        </div>
      )}
    </div>
  );
}
