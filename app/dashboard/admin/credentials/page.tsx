"use client";

import { useState, useEffect } from "react";
import { createCredential, getAllCredentials, deleteCredential } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, PlusCircle, Copy, Check, Trash2, KeyRound } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function AdminCredentialsPage() {
    const [credentials, setCredentials] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Copy state
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        domain: "skillcred.in",
        password: "",
        role: "MENTOR" as "MENTOR" | "STUDENT",
    });

    useEffect(() => {
        loadCredentials();
    }, []);

    const loadCredentials = async () => {
        const data = await getAllCredentials();
        setCredentials(data);
        setIsLoading(false);
    };

    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let pass = "";
        for (let i = 0; i < 12; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData(prev => ({ ...prev, password: pass }));
    };

    const handleCreate = async () => {
        if (!formData.name || !formData.username || !formData.password || !formData.domain) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsCreating(true);
        try {
            const result = await createCredential(formData);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Credential created successfully!");
                setIsOpen(false);
                setFormData({
                    name: "",
                    username: "",
                    domain: "skillcred.in",
                    password: "",
                    role: "MENTOR"
                });
                loadCredentials();
            }
        } catch (error) {
            toast.error("Failed to create credential");
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this credential? This action cannot be undone.")) return;

        const result = await deleteCredential(userId);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Credential deleted");
            loadCredentials();
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success("Copied to clipboard");
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                        <KeyRound className="w-7 h-7 text-cyan-400" />
                        Credentials
                    </h1>
                    <p className="text-slate-400">Issue and manage account credentials for Mentors and Paid Students</p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/20 border border-cyan-500/20">
                            <PlusCircle className="w-4 h-4" /> Issue New Credential
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-cyan-500/20 text-white max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-white">Issue New Credential</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Create a new account with a custom domain email.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Role</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        type="button"
                                        variant={formData.role === "MENTOR" ? "default" : "outline"}
                                        className={formData.role === "MENTOR" ? "bg-cyan-600 hover:bg-cyan-700 border-cyan-500/20" : "border-slate-700 text-slate-400 bg-slate-950"}
                                        onClick={() => setFormData({ ...formData, role: "MENTOR" })}
                                    >
                                        Mentor
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={formData.role === "STUDENT" ? "default" : "outline"}
                                        className={formData.role === "STUDENT" ? "bg-cyan-600 hover:bg-cyan-700 border-cyan-500/20" : "border-slate-700 text-slate-400 bg-slate-950"}
                                        onClick={() => setFormData({ ...formData, role: "STUDENT" })}
                                    >
                                        Student (Paid)
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Full Name</label>
                                <Input
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-slate-950 border-cyan-500/20 text-white placeholder:text-slate-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Email Address</label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="bg-slate-950 border-cyan-500/20 text-white placeholder:text-slate-500 flex-1"
                                    />
                                    <Select
                                        value={formData.domain}
                                        onValueChange={(val) => setFormData({ ...formData, domain: val })}
                                    >
                                        <SelectTrigger className="w-[180px] bg-slate-950 border-cyan-500/20 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-cyan-500/20 text-white">
                                            <SelectItem value="skillcred.in">@skillcred.in</SelectItem>
                                            <SelectItem value="codequestzone.com">@codequestzone.com</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <p className="text-xs text-slate-500 font-mono">
                                    Full email: {formData.username ? `${formData.username}@${formData.domain}` : `...@${formData.domain}`}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Password</label>
                                <div className="flex gap-2">
                                    <Input
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="bg-slate-950 border-cyan-500/20 text-white font-mono"
                                        placeholder="Enter or generate password"
                                    />
                                    <Button type="button" variant="outline" onClick={generatePassword} className="border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 bg-slate-950">
                                        Generate
                                    </Button>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-500/20" onClick={handleCreate} disabled={isCreating}>
                                    {isCreating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Create Credential
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>
            ) : (
                <Card className="bg-slate-900/60 border-cyan-500/20 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Active Credentials</CardTitle>
                        <CardDescription className="text-slate-500">Manage manually issued accounts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1">
                            {credentials.length === 0 ? (
                                <div className="text-center py-12 text-slate-500 border rounded-lg border-dashed border-cyan-500/20 bg-slate-900/40">
                                    No credentials found. Issue one to get started.
                                </div>
                            ) : (
                                <div className="rounded-md border border-slate-800 overflow-hidden">
                                    <div className="grid grid-cols-12 gap-4 p-4 bg-slate-950/80 text-xs font-medium text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                                        <div className="col-span-3">NAME & EMAIL</div>
                                        <div className="col-span-2">ROLE</div>
                                        <div className="col-span-2">DETAILS</div>
                                        <div className="col-span-3">CREATED</div>
                                        <div className="col-span-2 text-right">ACTIONS</div>
                                    </div>
                                    {credentials.map((cred) => (
                                        <div key={cred.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-800 last:border-0 hover:bg-cyan-900/10 transition-colors">
                                            <div className="col-span-3 overflow-hidden">
                                                <div className="font-medium text-white truncate">{cred.name}</div>
                                                <div className="text-sm text-slate-400 truncate flex items-center gap-1 font-mono text-xs">
                                                    {cred.email}
                                                    <button
                                                        onClick={() => copyToClipboard(cred.email, `email-${cred.id}`)}
                                                        className="text-slate-600 hover:text-cyan-400 transition-colors"
                                                    >
                                                        {copiedId === `email-${cred.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <Badge className={
                                                    cred.role === "MENTOR" ? "bg-purple-500/10 text-purple-400 border-purple-500/20 border" :
                                                        "bg-blue-500/10 text-blue-400 border-blue-500/20 border"
                                                }>
                                                    {cred.role}
                                                </Badge>
                                            </div>
                                            <div className="col-span-2 text-sm text-slate-400">
                                                {cred.role === "STUDENT" && cred.studentProfile?.subscription === "PRO" && (
                                                    <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 bg-cyan-500/5">PAID TIER</Badge>
                                                )}
                                                {cred.role === "MENTOR" && (
                                                    <span className="truncate">{cred.mentorProfile?.specialization || "-"}</span>
                                                )}
                                            </div>
                                            <div className="col-span-3 text-sm text-slate-500 font-mono text-xs">
                                                {format(new Date(cred.createdAt), "MMM d, yyyy HH:mm")}
                                            </div>
                                            <div className="col-span-2 flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                                    onClick={() => handleDelete(cred.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
