"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { togglePublish, deleteBlogPost } from "@/app/actions/blog-actions";
import { toast } from "sonner";
import { Pencil, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";

const STREAM_NAMES: Record<number, string> = {
  1: "Fullstack",
  2: "AI/ML",
  3: "Cybersecurity",
  4: "Data Engineering",
  5: "DevOps",
  6: "Mobile",
  7: "IoT",
  8: "Data Science",
};

interface Post {
  id: string;
  slug: string;
  title: string;
  stream: number | null;
  published: boolean;
  publishedAt: Date | null;
  updatedAt: Date;
  readTime: number;
  tags: string[];
}

export function BlogAdminTable({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleTogglePublish(id: string) {
    setLoadingId(id);
    try {
      const result = await togglePublish(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.published ? "Published!" : "Unpublished");
        router.refresh();
      }
    } catch {
      toast.error("Failed to update");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setLoadingId(id);
    try {
      const result = await deleteBlogPost(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Post deleted");
        router.refresh();
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setLoadingId(null);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 border border-white/10 rounded-xl bg-white/[0.02]">
        <p className="text-gray-500 mb-4">No blog posts yet</p>
        <Link
          href="/dashboard/admin/blog/new"
          className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
        >
          Create your first article →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-white/10 rounded-xl bg-white/[0.02]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left px-4 py-3 text-gray-400 font-medium">Title</th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">Stream</th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">Status</th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">Updated</th>
            <th className="text-right px-4 py-3 text-gray-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
            >
              <td className="px-4 py-3">
                <div className="font-medium text-white max-w-xs truncate">
                  {post.title}
                </div>
                <div className="text-xs text-gray-500 font-mono mt-0.5">
                  /blog/{post.slug}
                </div>
              </td>
              <td className="px-4 py-3">
                {post.stream ? (
                  <span className="text-gray-300">
                    {String(post.stream).padStart(2, "0")} — {STREAM_NAMES[post.stream]}
                  </span>
                ) : (
                  <span className="text-gray-500">General</span>
                )}
              </td>
              <td className="px-4 py-3">
                {post.published ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Eye className="w-3 h-3" />
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-500/10 text-gray-400 border border-gray-500/20">
                    <EyeOff className="w-3 h-3" />
                    Draft
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-400 text-xs">
                {new Date(post.updatedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      title="View on site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                  <Link
                    href={`/dashboard/admin/blog/${post.id}/edit`}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleTogglePublish(post.id)}
                    disabled={loadingId === post.id}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                    title={post.published ? "Unpublish" : "Publish"}
                  >
                    {post.published ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={loadingId === post.id}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
