"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link, Copy } from "lucide-react";

export function GenerateTokenForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Name and email are required");
      return;
    }

    setLoading(true);
    setGeneratedUrl("");
    
    try {
      const res = await fetch("/api/admin/counselor/generate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to generate token");
      
      const url = `${window.location.origin}/apply/counselor?t=${data.token}`;
      setGeneratedUrl(url);
      setName("");
      setEmail("");
      toast.success("Token generated successfully!");
      
      // Refresh the page to show the new assessment in the list below
      // but give them time to copy the link first
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm mb-12">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Link className="w-5 h-5 mr-2 text-blue-600" />
        Generate Assessment Link
      </h2>
      
      <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="text-sm font-medium mb-1 block text-slate-700 dark:text-slate-300">Candidate Name</label>
          <Input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="e.g. John Doe"
            disabled={loading}
          />
        </div>
        <div className="flex-1 w-full">
          <label className="text-sm font-medium mb-1 block text-slate-700 dark:text-slate-300">Candidate Email</label>
          <Input 
            type="email"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="e.g. john@example.com"
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full md:w-auto">
          {loading ? "Generating..." : "Generate Link"}
        </Button>
      </form>

      {generatedUrl && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="truncate w-full font-mono text-sm text-green-800 dark:text-green-300">
            {generatedUrl}
          </div>
          <Button onClick={copyToClipboard} variant="outline" size="sm" className="shrink-0 bg-white dark:bg-slate-800">
            <Copy className="w-4 h-4 mr-2" /> Copy Link
          </Button>
        </div>
      )}
    </div>
  );
}
