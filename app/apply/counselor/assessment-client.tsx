"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AssessmentMediaRecorder } from "@/components/assessment/media-recorder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AssessmentClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t");
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  
  // Section 1 State
  const [noticePeriod, setNoticePeriod] = useState("");
  const [currentCTC, setCurrentCTC] = useState("");
  const [expectedCTC, setExpectedCTC] = useState("");
  const [chennaiOnsite, setChennaiOnsite] = useState<string>("yes");
  const [yearsSales, setYearsSales] = useState("");
  const [voiceTamilUrl, setVoiceTamilUrl] = useState("");
  const [voiceEnglishUrl, setVoiceEnglishUrl] = useState("");

  // Section 2 State
  const [writtenQ1, setWrittenQ1] = useState("");
  const [writtenQ2, setWrittenQ2] = useState("");
  const [writtenQ3, setWrittenQ3] = useState("");
  const [triageInsight, setTriageInsight] = useState("");
  // Simple triage data (20 rows) - initializing with dummy data for UI brevity
  const [triageData, setTriageData] = useState<Record<string, string>>({});
  const [timeLeftS2, setTimeLeftS2] = useState(25 * 60);

  // Section 3 State
  const [currentObjection, setCurrentObjection] = useState(0);
  const [objectionUrls, setObjectionUrls] = useState<Record<string, string>>({});
  
  const objections = [
    '"Will you guarantee me a job?"',
    '"₹9,999 is too much — Udemy has this for ₹499"',
    '"I have no coding background at all"',
    '"Let me discuss with my parents and call back"',
    '"Is this recognised? Any certificate value?"',
    '"Why should I trust a new company?"'
  ];

  useEffect(() => {
    if (token) {
      fetch(`/api/apply/counselor?token=${token}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            toast.error(data.error);
            setStatus("INVALID");
          } else {
            setStatus(data.assessment.status);
          }
          setLoading(false);
        })
        .catch(() => {
          setStatus("ERROR");
          setLoading(false);
        });
    } else {
      setStatus("INVALID");
      setLoading(false);
    }
  }, [token]);

  // Section 2 Timer
  useEffect(() => {
    if (status === "STAGE_1_PASSED" && timeLeftS2 > 0) {
      const timer = setTimeout(() => setTimeLeftS2(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (status === "STAGE_1_PASSED" && timeLeftS2 === 0) {
      submitSection2();
    }
  }, [status, timeLeftS2]);

  const submitSection1 = async () => {
    if (!noticePeriod || !currentCTC || !expectedCTC || !yearsSales || !voiceTamilUrl || !voiceEnglishUrl) {
      toast.error("Please complete all fields and recordings.");
      return;
    }
    
    setSubmitting(true);
    const res = await fetch("/api/apply/counselor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        section: "1",
        payload: {
          noticePeriod, currentCTC, expectedCTC, chennaiOnsite: chennaiOnsite === "yes", yearsSales, voiceTamilUrl, voiceEnglishUrl
        }
      })
    });
    const data = await res.json();
    if (data.success) {
      setStatus(data.status);
    }
    setSubmitting(false);
  };

  const submitSection2 = async () => {
    setSubmitting(true);
    const res = await fetch("/api/apply/counselor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        section: "2",
        payload: {
          writtenQ1, writtenQ2, writtenQ3, triageData, triageInsight
        }
      })
    });
    const data = await res.json();
    if (data.success) {
      setStatus(data.status);
    }
    setSubmitting(false);
  };

  const submitSection3 = async () => {
    setSubmitting(true);
    const res = await fetch("/api/apply/counselor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        section: "3",
        payload: {
          objection1Url: objectionUrls[0],
          objection2Url: objectionUrls[1],
          objection3Url: objectionUrls[2],
          objection4Url: objectionUrls[3],
          objection5Url: objectionUrls[4],
          objection6Url: objectionUrls[5],
        }
      })
    });
    const data = await res.json();
    if (data.success) {
      setStatus(data.status);
    }
    setSubmitting(false);
  };

  if (loading) return <div className="text-center p-12">Loading...</div>;
  if (status === "INVALID" || status === "ERROR") return <div className="text-center p-12 text-red-500">Invalid or expired assessment link.</div>;

  if (status === "PENDING") {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-white/10 p-8">
        <h1 className="text-3xl font-bold mb-6">Career Counselor Assessment</h1>
        <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300">
          <p>Welcome. This asynchronous assessment consists of 3 sections.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Expected Total Time:</strong> ~45 minutes.</li>
            <li><strong>Video & Audio Required:</strong> You will need a working microphone and camera.</li>
            <li><strong>Timed Answers:</strong> Sections 2 and 3 have strict timers and auto-submit.</li>
          </ul>
          <p className="mt-8">We review all submissions within 48 hours.</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Section 1: Knockouts & Voice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Notice Period (Days)</label>
              <Input value={noticePeriod} onChange={e => setNoticePeriod(e.target.value)} type="number" placeholder="e.g. 30" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Chennai On-site Available?</label>
              <Select value={chennaiOnsite} onValueChange={setChennaiOnsite}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Current CTC (LPA)</label>
              <Input value={currentCTC} onChange={e => setCurrentCTC(e.target.value)} type="number" placeholder="e.g. 4.5" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Expected CTC (LPA)</label>
              <Input value={expectedCTC} onChange={e => setExpectedCTC(e.target.value)} type="number" placeholder="e.g. 6.0" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Years in Consultative Sales</label>
              <Input value={yearsSales} onChange={e => setYearsSales(e.target.value)} type="number" placeholder="e.g. 2" />
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <AssessmentMediaRecorder 
              token={token!} type="audio_ta" isVideo={false} maxDurationSeconds={60} label="Voice Answer (Tamil): Introduce yourself in 60s"
              onUploadComplete={setVoiceTamilUrl}
            />
            <AssessmentMediaRecorder 
              token={token!} type="audio_en" isVideo={false} maxDurationSeconds={60} label="Voice Answer (English): Why do you want to join us?"
              onUploadComplete={setVoiceEnglishUrl}
            />
          </div>

          <Button onClick={submitSection1} disabled={submitting} className="w-full">
            {submitting ? "Submitting..." : "Submit Section 1"}
          </Button>
        </div>
      </div>
    );
  }

  if (status === "STAGE_1_FAILED") {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 p-12 text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Thank you for your time</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Based on the initial criteria submitted, we won't be able to move forward with your application at this time. We are specifically looking for candidates matching certain location, timeline, and expectation criteria for this cohort. We wish you the best in your job search!
        </p>
        <p className="mt-8 text-sm text-slate-500 font-medium">Ganesan M | Co-Founder & CTO</p>
      </div>
    );
  }

  if (status === "STAGE_1_PASSED") {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-white/10 p-8">
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h1 className="text-2xl font-bold">Section 2: Written Scenarios</h1>
          <div className="text-red-500 font-mono text-xl font-bold">
            {Math.floor(timeLeftS2 / 60)}:{(timeLeftS2 % 60).toString().padStart(2, '0')}
          </div>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold mb-2">1. A final-year student from a tier-3 college replied: "fees ah?"</h3>
            <Textarea value={writtenQ1} onChange={e => setWrittenQ1(e.target.value)} placeholder="Type your WhatsApp reply..." />
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. A working professional (3 yrs support) asking whether AI/ML is worth it at his age</h3>
            <Textarea value={writtenQ2} onChange={e => setWrittenQ2(e.target.value)} placeholder="Type your WhatsApp reply..." />
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. A parent calling on behalf of their daughter, asking "placement guarantee irukka?"</h3>
            <Textarea value={writtenQ3} onChange={e => setWrittenQ3(e.target.value)} placeholder="Type your WhatsApp reply..." />
          </div>
          
          <div className="pt-6 border-t">
            <h3 className="font-semibold mb-2">Triage Table Analysis</h3>
            <p className="text-sm text-slate-500 mb-4">Based on the 20 leads provided (simplified for this UI), what does the list tell you about our ad targeting?</p>
            <Textarea value={triageInsight} onChange={e => setTriageInsight(e.target.value)} placeholder="Your insight on ad targeting..." className="h-32" />
          </div>
        </div>

        <Button onClick={submitSection2} disabled={submitting} className="w-full mt-8">
          {submitting ? "Submitting..." : "Submit Section 2"}
        </Button>
      </div>
    );
  }

  if (status === "STAGE_2_COMPLETED") {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-white/10 p-8">
        <h1 className="text-2xl font-bold mb-6">Section 3: Video Objections</h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          You will face 6 common objections. For each, you will have 20 seconds to read the objection, followed by 90 seconds of mandatory auto-recording. There are no re-records.
        </p>

        {currentObjection < 6 ? (
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 rounded-xl text-center text-xl font-medium">
              Objection {currentObjection + 1}: {objections[currentObjection]}
            </div>
            
            <AssessmentMediaRecorder 
              key={currentObjection}
              token={token!} 
              type={`video_obj${currentObjection + 1}`} 
              isVideo={true} 
              maxDurationSeconds={90} 
              autoStartDelaySeconds={20}
              onUploadComplete={(url) => {
                setObjectionUrls(prev => ({ ...prev, [currentObjection]: url }));
                if (currentObjection === 5) {
                  // Wait state before submit
                } else {
                  setCurrentObjection(c => c + 1);
                }
              }}
            />
            
            {currentObjection === 5 && objectionUrls[5] && (
              <Button onClick={submitSection3} disabled={submitting} className="w-full mt-4">
                {submitting ? "Submitting Final..." : "Complete Assessment"}
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center p-8">Processing...</div>
        )}
      </div>
    );
  }

  if (status === "STAGE_3_COMPLETED") {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 p-12 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Assessment Complete</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          Thank you for completing the comprehensive assessment. We are a small founding team and you will matter here. Ganesan will personally review every submission. We will get back to you within 48 hours.
        </p>
        <p className="mt-8 text-sm text-slate-500 font-medium">Ganesan M | Co-Founder & CTO</p>
      </div>
    );
  }

  return null;
}
