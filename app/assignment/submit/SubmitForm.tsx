"use client";

import { useState } from "react";

export default function SubmitForm({ token }: { token: string }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg({ type: "", text: "" });

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, repoUrl })
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg({ type: "error", text: data.error || "Failed to submit assignment." });
      } else {
        setMsg({ type: "success", text: "Assignment submitted successfully! The admin has been notified." });
        setRepoUrl("");
      }
    } catch (err) {
      setMsg({ type: "error", text: "An unexpected error occurred. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {msg.text && (
        <div className={`px-4 py-3 rounded-md text-sm ${msg.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {msg.text}
        </div>
      )}
      <div>
        <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700">GitHub Repository URL</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="url"
            name="repoUrl"
            id="repoUrl"
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-[#F26522] focus:border-[#F26522] sm:text-sm border-gray-300 border"
            placeholder="https://github.com/username/repo"
            required
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-[#F26522] hover:bg-[#d9551a] focus:outline-none disabled:opacity-70"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
}
