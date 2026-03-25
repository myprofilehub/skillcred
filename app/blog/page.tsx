import { Metadata } from "next";
import { LandingNavbar } from "@/components/landing/navbar";
import { Logo } from "@/components/logo";
import { BlogCard } from "@/components/blog/blog-card";
import { getBlogPosts } from "@/app/actions/blog-actions";
import Link from "next/link";
import { Github, Twitter, Linkedin, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Blog | SkillCred — Project-Based Learning Insights",
  description:
    "Deep-dive technical articles on Fullstack, AI/ML, Cybersecurity, Data Engineering, DevOps, Mobile, IoT, and Data Science — learn what each SkillCred stream covers.",
};

export default async function BlogListingPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <LandingNavbar />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>SkillCred Technical Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Deep Dives Into{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Project-Based Learning
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Explore the 8 technical streams that power SkillCred&apos;s
              project-based curriculum. From fullstack web development to IoT
              systems — discover what you&apos;ll build, learn, and master.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  No articles published yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    tags={post.tags}
                    stream={post.stream}
                    readTime={post.readTime}
                    coverColor={post.coverColor}
                    publishedAt={post.publishedAt}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
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
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
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
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2026 SkillCred Inc.</div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="hover:text-indigo-400 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="hover:text-indigo-400 transition-colors"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="hover:text-indigo-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
