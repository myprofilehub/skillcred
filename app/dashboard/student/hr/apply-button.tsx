"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { applyToJob } from "@/app/actions/job-actions";
import { useRouter } from "next/navigation";

interface ApplyButtonProps {
    jobId: string;
}

export function ApplyButton({ jobId }: ApplyButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleApply = async () => {
        setLoading(true);
        try {
            const result = await applyToJob(jobId);
            if ("error" in result) {
                alert(result.error);
            } else {
                router.refresh();
            }
        } catch (error) {
            alert("Failed to apply");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleApply}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 gap-2"
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Send className="h-4 w-4" />
            )}
            Apply Now
        </Button>
    );
}
