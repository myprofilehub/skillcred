import { LandingNavbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingInterestForm } from "@/components/landing/interest-form";
import { FeaturesSection } from "@/components/landing/features";
import { CareerPaths } from "@/components/landing/career-paths";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { QuerySection } from "@/components/landing/query-section";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/logo";
import { prisma } from "@/lib/db";

export default async function LandingPage() {
  const tracks = await prisma.track.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
    },
    orderBy: { title: "asc" }
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <LandingNavbar />

      <main>
        <HeroSection />
        <LandingInterestForm tracks={tracks} />
        <FeaturesSection />
        <HowItWorksSection />
        <CareerPaths />
        <QuerySection />
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Logo width={120} height={35} />
            </div>
            <p className="text-muted-foreground max-w-sm">
              The AI-powered accreditation platform for modern engineers.
              Stop verifying resumes. Start verifying skills.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">Career Tracks</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Mentorship</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2026 SkillCred Inc.</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-indigo-400 transition-colors"><Twitter className="w-4 h-4" /></Link>
            <Link href="#" className="hover:text-indigo-400 transition-colors"><Github className="w-4 h-4" /></Link>
            <Link href="#" className="hover:text-indigo-400 transition-colors"><Linkedin className="w-4 h-4" /></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
