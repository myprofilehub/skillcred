"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

const GRADIENT_MAP: Record<string, string> = {
  indigo: "from-indigo-500 to-blue-600",
  emerald: "from-emerald-500 to-teal-600",
  rose: "from-rose-500 to-pink-600",
  amber: "from-amber-500 to-orange-600",
  violet: "from-violet-500 to-purple-600",
  cyan: "from-cyan-500 to-sky-600",
  lime: "from-lime-500 to-green-600",
  fuchsia: "from-fuchsia-500 to-pink-600",
};

const STREAM_NAMES: Record<number, string> = {
  1: "Fullstack Development",
  2: "AI & Machine Learning",
  3: "Cybersecurity",
  4: "Data Engineering",
  5: "DevOps & Cloud",
  6: "Mobile Development",
  7: "IoT & Embedded Systems",
  8: "Data Science & Analytics",
};

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  stream: number | null;
  readTime: number;
  coverColor: string | null;
  publishedAt: Date | null;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  tags,
  stream,
  readTime,
  coverColor,
}: BlogCardProps) {
  const gradient = GRADIENT_MAP[coverColor || "indigo"] || GRADIENT_MAP.indigo;

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10">
        {/* Gradient top strip */}
        <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

        <div className="p-6 flex flex-col h-full">
          {/* Stream badge */}
          {stream && (
            <div className="mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient} text-white shadow-lg`}>
                <span className="opacity-80">Stream {String(stream).padStart(2, "0")}</span>
                <span className="w-px h-3 bg-white/30" />
                <span>{STREAM_NAMES[stream]}</span>
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-grow">
            {excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-gray-300 border border-white/5"
              >
                {tag}
              </span>
            ))}
            {tags.length > 5 && (
              <span className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-gray-500">
                +{tags.length - 5}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime} min read</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
              Read Article
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
