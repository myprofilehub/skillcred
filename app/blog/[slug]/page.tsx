import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/navbar";
import { Logo } from "@/components/logo";
import { getBlogPost, getBlogPosts } from "@/app/actions/blog-actions";
import { ArrowLeft, Clock, Calendar, Github, Twitter, Linkedin } from "lucide-react";

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    return { title: "Article Not Found | SkillCred Blog" };
  }
  return {
    title: `${post.title} | SkillCred Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const gradient =
    GRADIENT_MAP[post.coverColor || "indigo"] || GRADIENT_MAP.indigo;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <LandingNavbar />

      <main>
        {/* Hero Banner */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden">
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-br ${gradient} opacity-[0.08] rounded-full blur-[120px] pointer-events-none`}
          />

          <div className="max-w-3xl mx-auto relative z-10">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>

            {/* Stream badge */}
            {post.stream && (
              <div className="mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient} text-white shadow-lg`}
                >
                  <span className="opacity-80">
                    Stream {String(post.stream).padStart(2, "0")}
                  </span>
                  <span className="w-px h-3 bg-white/30" />
                  <span>{STREAM_NAMES[post.stream]}</span>
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl text-gray-400 mb-6">{post.subtitle}</p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              {post.publishedAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
              {post.author?.name && (
                <span>
                  by <span className="text-gray-300">{post.author.name}</span>
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-6">
          <div className={`h-px bg-gradient-to-r ${gradient} opacity-30`} />
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-6 py-12">
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-white
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-200
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
              prose-strong:text-white
              prose-li:text-gray-300
              prose-code:text-indigo-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
              prose-table:border-collapse
              prose-th:bg-white/5 prose-th:text-white prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:border prose-th:border-white/10
              prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-white/10 prose-td:text-gray-300
              prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-500/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1
              prose-hr:border-white/10
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Bottom nav */}
        <div className="max-w-3xl mx-auto px-6 pb-16">
          <div className="border-t border-white/10 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Logo width={120} height={35} />
            </div>
            <p className="text-muted-foreground max-w-sm">
              The AI-powered accreditation platform for modern engineers. Stop
              verifying resumes. Start verifying skills.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/enroll"
                  className="hover:text-white transition-colors"
                >
                  Enroll
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2026 SkillCred Inc.</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-indigo-400 transition-colors">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="hover:text-indigo-400 transition-colors">
              <Github className="w-4 h-4" />
            </Link>
            <Link href="#" className="hover:text-indigo-400 transition-colors">
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
