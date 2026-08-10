"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AssessmentMediaRecorder } from "@/components/assessment/media-recorder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Download, FileText } from "lucide-react";

const mockLeads = [
  { id: 1, name: "Arun K.", age: 21, bg: "B.Tech IT (2024)", source: "Instagram Ad", note: "fees ah?" },
  { id: 2, name: "Priya S.", age: 24, bg: "B.Com (2021) - Non IT", source: "Facebook", note: "Need placement guarantee" },
  { id: 3, name: "Rahul M.", age: 28, bg: "BPO Support (3 Yrs)", source: "Google Search", note: "Is AI good for my age?" },
  { id: 4, name: "Divya R.", age: 22, bg: "B.E CSE (2023)", source: "Instagram Ad", note: "Can I get syllabus?" },
  { id: 5, name: "Sanjay V.", age: 19, bg: "12th Pass", source: "Facebook Ad", note: "Timepass enquiry" },
  { id: 6, name: "Meera T.", age: 25, bg: "M.Sc Physics", source: "Google Search", note: "Want to switch to IT" },
  { id: 7, name: "Karthik P.", age: 23, bg: "B.Tech Mech (2022)", source: "Instagram Ad", note: "Too expensive" },
  { id: 8, name: "Anitha J.", age: 26, bg: "TCS Manual Tester", source: "LinkedIn", note: "Looking for upskilling" },
  { id: 9, name: "Manoj D.", age: 21, bg: "B.C.A (2024)", source: "Instagram Ad", note: "Plz call me" },
  { id: 10, name: "Swathi N.", age: 29, bg: "Career Gap (4 Yrs)", source: "Facebook Ad", note: "Will companies hire me?" },
  { id: 11, name: "Gokul R.", age: 22, bg: "B.E ECE (2023)", source: "LinkedIn", note: "Want to learn Data Science" },
  { id: 12, name: "Lakshmi M.", age: 25, bg: "B.Sc Maths (2020)", source: "Google Search", note: "What is the duration?" },
  { id: 13, name: "Vijay S.", age: 27, bg: "Sales Exec (3 Yrs)", source: "Instagram Ad", note: "Can I do this part-time?" },
  { id: 14, name: "Nandhini P.", age: 20, bg: "B.Tech IT (2025)", source: "Facebook Ad", note: "Internship available?" },
  { id: 15, name: "Surya K.", age: 24, bg: "B.Com (2022)", source: "Google Search", note: "Is coding required?" },
  { id: 16, name: "Aisha T.", age: 23, bg: "B.E CSE (2022)", source: "Instagram Ad", note: "Need EMI options" },
  { id: 17, name: "Pratap V.", age: 26, bg: "Civil Engineer", source: "LinkedIn", note: "Future scope in AI?" },
  { id: 18, name: "Kavya J.", age: 22, bg: "B.B.A (2023)", source: "Facebook Ad", note: "Any demo classes?" },
  { id: 19, name: "Dinesh B.", age: 28, bg: "Freelancer", source: "Google Search", note: "Can I get a job abroad?" },
  { id: 20, name: "Sneha R.", age: 21, bg: "B.Tech EEE (2024)", source: "Instagram Ad", note: "Syllabus pdf send" },
];

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

  // Section 2 Timer — only ticks when on Section 2
  const isSection2Active = status === "STAGE_1_PASSED";
  
  useEffect(() => {
    if (!isSection2Active || timeLeftS2 <= 0) return;
    const timer = setTimeout(() => setTimeLeftS2(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [isSection2Active, timeLeftS2]);

  // Auto-submit Section 2 when timer runs out
  useEffect(() => {
    if (isSection2Active && timeLeftS2 === 0) {
      submitSection2();
    }
  }, [isSection2Active, timeLeftS2]);

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

  // SECTION 1: Knockouts & Voice
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

  // AUTO-FAIL Screen
  if (status === "STAGE_1_FAILED") {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 p-12 text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Thank you for your time</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Based on the initial criteria submitted, we won&apos;t be able to move forward with your application at this time. We are specifically looking for candidates matching certain location, timeline, and expectation criteria for this cohort. We wish you the best in your job search!
        </p>
        <p className="mt-8 text-sm text-slate-500 font-medium">Ganesan M | Co-Founder & CTO</p>
      </div>
    );
  }

  // SECTION 2: Written Scenarios
  if (status === "STAGE_1_PASSED") {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-white/10 p-8">
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h1 className="text-2xl font-bold">Section 2: Written Scenarios</h1>
          <div className="text-red-500 font-mono text-xl font-bold">
            {Math.floor(timeLeftS2 / 60)}:{(timeLeftS2 % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 p-4 rounded-lg mb-8 flex items-center justify-between">
          <div>
            <h3 className="font-semibold flex items-center"><FileText className="w-5 h-5 mr-2" /> Preparation Material</h3>
            <p className="text-sm mt-1 opacity-90">Please download and review our program guide before answering the following questions.</p>
          </div>
          <a href="/SkillCred_AI_ML_Track_Curriculum.pdf" download className="inline-flex items-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-100 text-blue-900 text-sm font-medium transition-colors">
            <Download className="w-4 h-4 mr-2" /> Download Guide (PDF)
          </a>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold mb-2">1. A final-year student from a tier-3 college replied: &quot;fees ah?&quot;</h3>
            <Textarea value={writtenQ1} onChange={e => setWrittenQ1(e.target.value)} placeholder="Type your WhatsApp reply..." />
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. A working professional (3 yrs support) asking whether AI/ML is worth it at his age</h3>
            <Textarea value={writtenQ2} onChange={e => setWrittenQ2(e.target.value)} placeholder="Type your WhatsApp reply..." />
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. A parent calling on behalf of their daughter, asking &quot;placement guarantee irukka?&quot;</h3>
            <Textarea value={writtenQ3} onChange={e => setWrittenQ3(e.target.value)} placeholder="Type your WhatsApp reply..." />
          </div>
          
          <div className="pt-6 border-t">
            <h3 className="font-semibold mb-4">Triage Table Analysis</h3>
            
            <div className="overflow-x-auto border rounded-lg mb-4">
              <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Lead Name</th>
                    <th className="px-4 py-3">Background</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Initial Note</th>
                    <th className="px-4 py-3">Your Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map((lead) => (
                    <tr key={lead.id} className="border-b dark:border-slate-700 bg-white dark:bg-slate-900">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{lead.name} ({lead.age})</td>
                      <td className="px-4 py-3">{lead.bg}</td>
                      <td className="px-4 py-3">{lead.source}</td>
                      <td className="px-4 py-3 italic">&quot;{lead.note}&quot;</td>
                      <td className="px-4 py-2">
                        <select
                          className="w-full px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          value={triageData[lead.id] || ""}
                          onChange={e => setTriageData(prev => ({ ...prev, [lead.id]: e.target.value }))}
                        >
                          <option value="">--</option>
                          <option value="1-hot">1 – Hot (Call Now)</option>
                          <option value="2-warm">2 – Warm (Call Today)</option>
                          <option value="3-nurture">3 – Nurture (Follow-up)</option>
                          <option value="4-cold">4 – Cold (Low Priority)</option>
                          <option value="5-disqualify">5 – Disqualify</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-500 mb-4 font-medium">Based on the recent leads table above, what does this list tell you about our ad targeting, and how would you prioritize calling them?</p>
            <Textarea value={triageInsight} onChange={e => setTriageInsight(e.target.value)} placeholder="Your insight on ad targeting and prioritization..." className="h-32" />
          </div>
        </div>

        <Button onClick={submitSection2} disabled={submitting} className="w-full mt-8">
          {submitting ? "Submitting..." : "Submit Section 2"}
        </Button>
      </div>
    );
  }

  // SECTION 3: Video Objections
  if (status === "STAGE_2_COMPLETED") {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-white/10 p-8">
        <h1 className="text-2xl font-bold mb-2">Section 3: Video Objections</h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          You will face 6 common objections in sequence. The active objection is highlighted below. Once you finish recording one, the next will unlock.
        </p>

        <div className="space-y-4">
          {objections.map((objectionText, idx) => {
            const isActive = idx === currentObjection;
            const isCompleted = idx < currentObjection;
            
            return (
              <div 
                key={idx} 
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  isActive ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 shadow-md" : 
                  isCompleted ? "border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10 opacity-75" : 
                  "border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 opacity-50"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-semibold ${isActive ? "text-blue-700 dark:text-blue-300" : isCompleted ? "text-green-700 dark:text-green-400" : "text-slate-500"}`}>
                    Objection {idx + 1} of 6
                  </h3>
                  {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                </div>
                
                <div className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-6">
                  {objectionText}
                </div>

                {isActive && (
                  <AssessmentMediaRecorder 
                    token={token!} 
                    type={`video_obj${idx + 1}`} 
                    isVideo={true} 
                    maxDurationSeconds={90} 
                    autoStartDelaySeconds={20}
                    onUploadComplete={(url) => {
                      setObjectionUrls(prev => ({ ...prev, [idx]: url }));
                      if (idx < 5) {
                        setCurrentObjection(c => c + 1);
                      }
                    }}
                  />
                )}
                
                {isCompleted && (
                  <div className="text-sm text-green-600 font-medium">Recording saved successfully.</div>
                )}
              </div>
            )
          })}
        </div>

        {currentObjection === 5 && objectionUrls[5] && (
          <Button onClick={submitSection3} disabled={submitting} className="w-full mt-8 bg-green-600 hover:bg-green-700">
            {submitting ? "Submitting Final..." : "Complete Assessment"}
          </Button>
        )}
      </div>
    );
  }

  // COMPLETION Screen
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
