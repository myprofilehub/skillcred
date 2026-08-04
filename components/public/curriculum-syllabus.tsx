import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { RM_PBL_CURRICULUM } from "@/lib/curriculum-data";

interface CurriculumSyllabusProps {
    trackSlug: string;
    accentColor?: string; // e.g. "purple", "cyan", "orange"
}

const colorMap: Record<string, { border: string; bg: string; text: string; icon: string }> = {
    purple: { border: "border-purple-200", bg: "bg-purple-50", text: "text-purple-700", icon: "text-purple-600" },
    cyan: { border: "border-cyan-200", bg: "bg-cyan-50", text: "text-cyan-700", icon: "text-cyan-600" },
    orange: { border: "border-orange-200", bg: "bg-orange-50", text: "text-orange-700", icon: "text-orange-600" },
    green: { border: "border-green-200", bg: "bg-green-50", text: "text-green-700", icon: "text-green-600" },
    blue: { border: "border-blue-200", bg: "bg-blue-50", text: "text-blue-700", icon: "text-blue-600" },
    red: { border: "border-red-200", bg: "bg-red-50", text: "text-red-700", icon: "text-red-600" },
    yellow: { border: "border-yellow-200", bg: "bg-yellow-50", text: "text-yellow-700", icon: "text-yellow-600" },
    pink: { border: "border-pink-200", bg: "bg-pink-50", text: "text-pink-700", icon: "text-pink-600" },
};

export function CurriculumSyllabus({ trackSlug, accentColor = "purple" }: CurriculumSyllabusProps) {
    const streamSlugToDbSlug: Record<string, string> = {
        "full-stack-development": "full-stack-development",
        "ai-ml": "ai-ml",
        "cybersecurity": "cybersecurity",
        "data-engineering": "data-engineering",
        "devops-cloud": "devops-cloud",
        "mobile-development": "mobile-development",
        "iot-embedded": "iot-embedded",
        "data-science": "data-science",
    };
    
    const dbSlug = streamSlugToDbSlug[trackSlug] || trackSlug;
    const curriculumData = RM_PBL_CURRICULUM[dbSlug];
    const colors = colorMap[accentColor] || colorMap.purple;

    if (!curriculumData) {
        return null;
    }

    return (
        <div className="w-full">
            <Card className="border border-slate-200 shadow-md bg-white overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 p-6 md:p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Stream Profile: {curriculumData.title}</h3>
                    <p className="text-slate-600">Specific requirements and weighting for this exact stream.</p>
                </div>
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Prerequisites</h4>
                            <p className="text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                {curriculumData.prerequisites}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Drill Thread & Depth</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-slate-600"><span className="font-semibold text-slate-900">Tier {curriculumData.tier}</span> — {curriculumData.duration} duration</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-slate-600">{curriculumData.drillThread}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Assessment Weighting</h4>
                            <div className={`p-4 rounded-lg border ${colors.border} ${colors.bg}`}>
                                <p className={`text-sm font-medium ${colors.text}`}>
                                    {curriculumData.weighting}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Primary Defense Focus</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {curriculumData.defenseFocus}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
