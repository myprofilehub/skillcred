"use client";

import { useState } from "react";
import { createPreRecordedVideo, deleteRecording, toggleRecordingVisibility } from "@/app/actions/admin-recordings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Video, Plus, Trash2, Eye, EyeOff, Loader2, Link as LinkIcon } from "lucide-react";

export function RecordingsList({ initialRecordings, tracks }: { initialRecordings: any[], tracks: any[] }) {
    const [recordings, setRecordings] = useState(initialRecordings);
    
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        url: "",
        trackId: "",
        isPublic: true
    });

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this recording?")) return;
        
        toast.loading("Deleting...", { id: "delete" });
        const res = await deleteRecording(id);
        if (res.success) {
            setRecordings(prev => prev.filter(r => r.id !== id));
            toast.success("Recording deleted", { id: "delete" });
        } else {
            toast.error(res.error || "Failed to delete", { id: "delete" });
        }
    }

    const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
        toast.loading("Updating...", { id: "visibility" });
        const res = await toggleRecordingVisibility(id, !currentStatus);
        
        if (res.success) {
            setRecordings(prev => prev.map(r => r.id === id ? { ...r, isPublic: !currentStatus } : r));
            toast.success("Visibility updated", { id: "visibility" });
        } else {
            toast.error(res.error || "Failed to update", { id: "visibility" });
        }
    }

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.url || !formData.trackId) {
            toast.error("Please fill in required fields");
            return;
        }

        setIsSubmitting(true);
        toast.loading("Uploading...", { id: "upload" });
        
        const res = await createPreRecordedVideo(formData);
        
        setIsSubmitting(false);
        if (res.success) {
            // Optimistic update - in a real app would fetch or use returned data
            const fullTrack = tracks.find(t => t.id === formData.trackId);
            setRecordings([{ ...res.recording, track: fullTrack }, ...recordings]);
            
            toast.success("Video uploaded successfully!", { id: "upload" });
            setIsUploadOpen(false);
            setFormData({ title: "", description: "", url: "", trackId: "", isPublic: true });
        } else {
            toast.error(res.error || "Upload failed", { id: "upload" });
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div></div>
                <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2 font-semibold">
                            <Plus className="w-4 h-4" />
                            Upload Video
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Upload Pre-Recorded Video</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpload} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Video Title *</Label>
                                <Input 
                                    id="title" 
                                    placeholder="e.g. Intro to Node.js"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    className="bg-slate-800 border-white/10"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="url">Video URL (YouTube/Drive) *</Label>
                                <Input 
                                    id="url" 
                                    placeholder="https://..."
                                    value={formData.url}
                                    onChange={e => setFormData({...formData, url: e.target.value})}
                                    className="bg-slate-800 border-white/10"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Select Stream/Track *</Label>
                                <Select 
                                    value={formData.trackId} 
                                    onValueChange={v => setFormData({...formData, trackId: v})}
                                >
                                    <SelectTrigger className="bg-slate-800 border-white/10">
                                        <SelectValue placeholder="Choose a track..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-white/10">
                                        {tracks.map(t => (
                                            <SelectItem key={t.id} value={t.id} className="text-white hover:bg-slate-800 focus:bg-slate-800">
                                                {t.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="desc">Description (Optional)</Label>
                                <textarea 
                                    id="desc" 
                                    placeholder="Brief summary of the video..."
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full h-24 bg-slate-800 border border-white/10 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white"
                                />
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <Checkbox 
                                    id="isPublic" 
                                    checked={formData.isPublic}
                                    onCheckedChange={(c) => setFormData({...formData, isPublic: c as boolean})}
                                    className="border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                                />
                                <Label htmlFor="isPublic" className="font-normal text-slate-300">
                                    Make video public immediately
                                </Label>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <Button type="button" variant="ghost" onClick={() => setIsUploadOpen(false)} className="hover:bg-slate-800 hover:text-white">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting} className="bg-cyan-600 hover:bg-cyan-500 text-white">
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    {isSubmitting ? "Uploading..." : "Save Video"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="bg-slate-900/60 border-cyan-500/20">
                <CardHeader className="border-b border-white/5 pb-4">
                    <CardTitle className="text-xl font-semibold text-white">All Recordings</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {recordings.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center text-slate-400">
                            <Video className="w-12 h-12 mb-3 opacity-20" />
                            <p>No video recordings found.</p>
                        </div>
                    ) : (
                        <div className="divide-y text-sm divide-white/5">
                            {recordings.map((rec) => (
                                <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`p-2 rounded-lg ${rec.type === 'PRE_RECORDED' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                            <Video className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white mb-1 line-clamp-1">{rec.title}</h4>
                                            <div className="flex items-center gap-3 text-xs text-slate-400">
                                                <Badge variant="outline" className="bg-black/20 border-white/10 font-normal">
                                                    {rec.type === 'PRE_RECORDED' ? 'Library Upload' : 'Live Class'}
                                                </Badge>
                                                <span>{new Date(rec.createdAt).toLocaleDateString()}</span>
                                                {rec.track && <span className="text-cyan-400/80">&bull; {rec.track.title}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <a href={rec.url} target="_blank" rel="noopener noreferrer">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10" title="Watch Video">
                                                <LinkIcon className="w-4 h-4" />
                                            </Button>
                                        </a>

                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => handleToggleVisibility(rec.id, rec.isPublic)}
                                            className={`h-8 w-8 ${rec.isPublic ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-500/10'}`} 
                                            title={rec.isPublic ? "Public (Click to hide)" : "Hidden (Click to publish)"}
                                        >
                                            {rec.isPublic ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </Button>
                                        
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => handleDelete(rec.id)}
                                            className="h-8 w-8 text-red-400/50 hover:text-red-400 hover:bg-red-400/10" 
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
