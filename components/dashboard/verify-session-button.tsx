"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { verifySession } from "@/app/actions/attendance";
import { useToast } from "@/hooks/use-toast";

export function VerifySessionButton({ courseId, log }: { courseId: string, log: any }) {
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false); // Could also pass in initial state if check existed
    const { toast } = useToast();

    const handleVerify = async () => {
        setLoading(true);
        try {
            const result = await verifySession(courseId, log.id, {
                startTime: log.startTime,
                endTime: log.endTime,
                conferenceId: log.conferenceId
            });
            if (result.error) {
                toast({
                    variant: "destructive",
                    title: "Verification Failed",
                    description: result.error
                });
            } else {
                setVerified(true);
                toast({
                    title: "Session Verified",
                    description: "Session successfully verified."
                });
            }
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong."
            });
        } finally {
            setLoading(false);
        }
    };

    if (verified) {
        return (
            <Button size="sm" variant="outline" className="gap-2 text-green-600 border-green-200 bg-green-50" disabled>
                <CheckCircle2 className="w-4 h-4" /> Verified
            </Button>
        );
    }

    return (
        <Button size="sm" className="gap-2" onClick={handleVerify} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Verify Session
        </Button>
    );
}
