"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost } from "@/app/actions/blog-actions";
import { toast } from "sonner";

const COVER_COLORS = [
  { value: "indigo", label: "Indigo", bg: "bg-indigo-500" },
  { value: "emerald", label: "Emerald", bg: "bg-emerald-500" },
  { value: "rose", label: "Rose", bg: "bg-rose-500" },
  { value: "amber", label: "Amber", bg: "bg-amber-500" },
  { value: "violet", label: "Violet", bg: "bg-violet-500" },
  { value: "cyan", label: "Cyan", bg: "bg-cyan-500" },
  { value: "lime", label: "Lime", bg: "bg-lime-500" },
  { value: "fuchsia", label: "Fuchsia", bg: "bg-fuchsia-500" },
];

const STREAM_OPTIONS = [
  { value: 0, label: "None (General)" },
  { value: 1, label: "01 — Fullstack Development" },
  { value: 2, label: "02 — AI & Machine Learning" },
  { value: 3, label: "03 — Cybersecurity" },
  { value: 4, label: "04 — Data Engineering" },
  { value: 5, label: "05 — DevOps & Cloud" },
  { value: 6, label: "06 — Mobile Development" },
  { value: 7, label: "07 — IoT & Embedded Systems" },
  { value: 8, label: "08 — Data Science & Analytics" },
];

interface BlogAdminFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    slug: string;
    subtitle: string | null;
    excerpt: string;
    content: string;
    tags: string[];
    stream: number | null;
    readTime: number;
    coverColor: string | null;
    published: boolean;
  };
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function BlogAdminForm({ mode, initialData }: BlogAdminFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [slugManual, setSlugManual] = useState(mode === "edit");

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [tagsStr, setTagsStr] = useState(
    initialData?.tags.join(", ") || ""
  );
  const [stream, setStream] = useState(initialData?.stream || 0);
  const [readTime, setReadTime] = useState(initialData?.readTime || 5);
  const [coverColor, setCoverColor] = useState(
    initialData?.coverColor || "indigo"
  );
  const [published, setPublished] = useState(
    initialData?.published || false
  );

  // Auto-generate slug from title when creating
  useEffect(() => {
    if (mode === "create" && !slugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, mode, slugManual]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      toast.error("Title, excerpt, and content are required");
      return;
    }

    setLoading(true);
    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const data = {
      title,
      slug: slug || slugify(title),
      subtitle: subtitle || undefined,
      excerpt,
      content,
      tags,
      stream: stream || undefined,
      readTime,
      coverColor,
      published,
    };

    try {
      let result;
      if (mode === "create") {
        result = await createBlogPost(data);
      } else {
        result = await updateBlogPost(initialData!.id, data);
      }

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          mode === "create"
            ? "Blog post created!"
            : "Blog post updated!"
        );
        router.push("/dashboard/admin/blog");
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. The Complete Guide to Fullstack Development"
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Slug
          {!slugManual && mode === "create" && (
            <span className="text-gray-500 ml-2">(auto-generated)</span>
          )}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setSlugManual(true);
              setSlug(slugify(e.target.value));
            }}
            placeholder="fullstack-development"
            className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
          />
          {slugManual && mode === "create" && (
            <button
              type="button"
              onClick={() => {
                setSlugManual(false);
                setSlug(slugify(title));
              }}
              className="px-3 py-2 text-xs rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition"
            >
              Auto
            </button>
          )}
        </div>
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Subtitle
        </label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Optional subtitle or tagline"
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Excerpt *
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short summary shown on the blog listing page"
          rows={2}
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
          required
        />
      </div>

      {/* Row: Stream + Read Time + Cover Color */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Stream
          </label>
          <select
            value={stream}
            onChange={(e) => setStream(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {STREAM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-gray-900">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Read Time (min)
          </label>
          <input
            type="number"
            value={readTime}
            onChange={(e) => setReadTime(Number(e.target.value))}
            min={1}
            max={60}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Cover Accent
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            {COVER_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCoverColor(c.value)}
                className={`w-8 h-8 rounded-full ${c.bg} transition-all ${
                  coverColor === c.value
                    ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110"
                    : "opacity-50 hover:opacity-80"
                }`}
                title={c.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Tags{" "}
          <span className="text-gray-500">(comma-separated)</span>
        </label>
        <input
          type="text"
          value={tagsStr}
          onChange={(e) => setTagsStr(e.target.value)}
          placeholder="React, Node.js, PostgreSQL, Docker"
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Content (HTML) *
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="<h2>Introduction</h2><p>Write your article in HTML...</p>"
          rows={20}
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y font-mono text-sm"
          required
        />
      </div>

      {/* Published */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-5 h-5 rounded bg-white/5 border-white/10 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer"
        />
        <span className="text-sm text-gray-300">
          Publish immediately{" "}
          <span className="text-gray-500">
            (visible on public /blog)
          </span>
        </span>
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Saving..."
            : mode === "create"
            ? "Create Article"
            : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/admin/blog")}
          className="px-6 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
