import { LandingNavbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ProgramCatalog } from "@/components/landing/program-catalog";
import { CompanyBanner } from "@/components/landing/company-banner";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { QuerySection } from "@/components/landing/query-section";
import { HRInsightsTeaser } from "@/components/landing/hr-insights-teaser";
import { CodeArenaTeaser } from "@/components/landing/code-arena-teaser";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/logo";
import { prisma } from "@/lib/db";


export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500/30">
      <LandingNavbar />

      <main>
        <HeroSection />
        <CompanyBanner />
        
        <HRInsightsTeaser />
        
        <ProgramCatalog />
        <HowItWorksSection />
        
        <CodeArenaTeaser />
        <QuerySection />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-border py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Logo width={120} height={35} />
            </div>
            <p className="text-slate-400 max-w-sm">
              The AI-powered accreditation platform for modern engineers.
              Stop verifying resumes. Start verifying skills.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/programs" className="hover:text-white transition-colors">Programs</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/institutions" className="hover:text-white transition-colors">Institutions</Link></li>
              <li><Link href="/corporate" className="hover:text-white transition-colors">Corporate</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
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
