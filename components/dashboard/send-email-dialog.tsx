"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { sendEmail } from "@/app/actions/email";
import { useToast } from "@/hooks/use-toast";

interface SendEmailDialogProps {
    studentName: string;
    studentEmail: string;
}

export function SendEmailDialog({ studentName, studentEmail }: SendEmailDialogProps) {
    const [open, setOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const { toast } = useToast();

    const handleSend = async () => {
        if (!subject || !body) {
            toast({
                variant: "destructive",
                title: "Missing fields",
                description: "Please enter a subject and message."
            });
            return;
        }

        setSending(true);
        try {
            const result = await sendEmail(studentEmail, subject, body);

            if (result.error) {
                toast({
                    variant: "destructive",
                    title: "Failed to send",
                    description: result.error
                });
            } else {
                setOpen(false);
                setSubject("");
                setBody("");
                toast({
                    title: "Email Sent",
                    description: `Successfully sent to ${studentName}.`
                });
            }
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong."
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="ghost" title="Send Email">
                    <Mail className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send Email</DialogTitle>
                    <DialogDescription>
                        Compose a message to {studentName} via Gmail.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="to" className="text-right text-xs">
                            To
                        </Label>
                        <Input id="to" value={studentEmail} disabled className="col-span-3 bg-muted" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right text-xs">
                            Subject
                        </Label>
                        <Input
                            id="subject"
                            placeholder="Feedback on Project..."
                            className="col-span-3"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message" className="text-xs">
                            Message
                        </Label>
                        <Textarea
                            id="message"
                            placeholder="Type your message here..."
                            className="h-32"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSend} disabled={sending} className="gap-2">
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Send Email
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
