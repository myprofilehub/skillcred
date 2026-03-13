"use client";

import { useState } from "react";
import { registerForWorkshop } from "@/app/actions/investor-actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

export function WorkshopRegistrationButton({ workshopId }: { workshopId: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            const result = await registerForWorkshop(workshopId);
            if (result.success) {
                toast.success("Successfully registered for workshop!");
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Failed to register");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={handleRegister} className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            Register Now
        </Button>
    );
}
