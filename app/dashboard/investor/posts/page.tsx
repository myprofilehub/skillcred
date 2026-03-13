"use client";

import { useState, useEffect } from "react";
import { getActiveInvestorPosts, createInvestorPost } from "@/app/actions/investor-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PlusCircle, Loader2, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function InvestorPostsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "FUNDING",
        deadline: ""
    });

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const data = await getActiveInvestorPosts();
        setPosts(data);
        setIsLoading(false);
    };

    const handleCreate = async () => {
        if (!formData.title || !formData.description) {
            toast.error("Please fill in required fields");
            return;
        }

        setIsCreating(true);
        try {
            const result = await createInvestorPost(formData);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Post created successfully!");
                setIsOpen(false);
                setFormData({ title: "", description: "", type: "FUNDING", deadline: "" });
                loadPosts();
            }
        } catch (error) {
            toast.error("Failed to create post");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">My Posts</h1>
                    <p className="text-neutral-400">Manage your calls for startups and requirements</p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/20">
                            <PlusCircle className="w-4 h-4" /> Create New Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-900 border-amber-500/20 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-white">Create New Requirement</DialogTitle>
                            <DialogDescription className="text-neutral-400">Post a call for startups or investment opportunities</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Title</label>
                                <Input
                                    placeholder="e.g. Seed Funding for AI Startups"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Type</label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(val) => setFormData({ ...formData, type: val })}
                                >
                                    <SelectTrigger className="bg-neutral-800 border-amber-500/20 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-800 border-amber-500/20">
                                        <SelectItem value="FUNDING">Funding</SelectItem>
                                        <SelectItem value="MENTORSHIP">Mentorship</SelectItem>
                                        <SelectItem value="INCUBATION">Incubation</SelectItem>
                                        <SelectItem value="CHALLENGE">Challenge</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Description</label>
                                <Textarea
                                    placeholder="Describe your requirements..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Deadline (Optional)</label>
                                <Input
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    className="bg-neutral-800 border-amber-500/20 text-white"
                                />
                            </div>
                            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white" onClick={handleCreate} disabled={isCreating}>
                                {isCreating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Publish Post
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-amber-400" /></div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.length === 0 ? (
                        <div className="col-span-3 text-center py-12 text-neutral-500 border rounded-lg border-dashed border-amber-500/20 bg-neutral-900/50">
                            No active posts found. Create one to get started.
                        </div>
                    ) : (
                        posts.map((post: any) => (
                            <Card key={post.id} className="relative bg-neutral-900/80 border-amber-500/10 backdrop-blur-sm hover:border-amber-500/30 transition-colors">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/20 text-xs">
                                                {post.type}
                                            </Badge>
                                            <CardTitle className="pt-2 text-white">{post.title}</CardTitle>
                                        </div>
                                    </div>
                                    <CardDescription className="text-neutral-500">
                                        Posted on {format(new Date(post.createdAt), "MMM d, yyyy")}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-neutral-400 line-clamp-3 mb-4">
                                        {post.description}
                                    </p>
                                    {post.deadline && (
                                        <p className="text-xs text-amber-400 font-medium">
                                            Deadline: {format(new Date(post.deadline), "MMM d, yyyy")}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
