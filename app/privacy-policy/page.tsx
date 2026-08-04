import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SkillCred",
  description: "Learn about how SkillCred handles and protects your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background dark:bg-background dark:bg-black text-foreground dark:text-foreground dark:text-white selection:bg-indigo-500/30">
      <LandingNavbar />
      
      <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight text-foreground dark:text-foreground dark:text-white">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-muted-foreground">
              Last Updated: April 6, 2026
            </p>
          </div>

          <div className="prose prose-invert prose-indigo max-w-none space-y-12 text-muted-foreground dark:text-muted-foreground dark:text-gray-300">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground dark:text-foreground dark:text-white border-b border-border dark:border-border dark:border-white/10 pb-2">1. Introduction</h2>
              <p>
                Welcome to SkillCred ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website skillcred.in and use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground dark:text-foreground dark:text-white border-b border-border dark:border-border dark:border-white/10 pb-2">2. Information We Collect</h2>
              <div className="space-y-4 pl-4 border-l-2 border-primary/30">
                <p>
                  <strong className="text-foreground dark:text-foreground dark:text-white block mb-1">Personal Data:</strong> We may collect personally identifiable information, such as your name, email address, and professional background when you register for an account or enroll in a stream.
                </p>
                <p>
                  <strong className="text-foreground dark:text-foreground dark:text-white block mb-1">Usage Data:</strong> We automatically collect information about how you interact with our platform, including IP addresses, browser types, and pages viewed.
                </p>
                <p>
                  <strong className="text-foreground dark:text-foreground dark:text-white block mb-1">Assessment Data:</strong> Information related to your performance in skill assessments, projects, and simulations is collected to provide accreditation services.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground dark:text-foreground dark:text-white border-b border-border dark:border-border dark:border-white/10 pb-2">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service, including monitoring usage.</li>
                <li>To manage your Account and enrollment in various skill streams.</li>
                <li>To verify your skills and provide performance-based accreditation.</li>
                <li>To connect you with potential mentors and recruiters.</li>
                <li>To communicate with you about updates, security alerts, and promotional offers.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground dark:text-foreground dark:text-white border-b border-border dark:border-border dark:border-white/10 pb-2">4. Data Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers, and we use industry-standard encryption for data in transit and at rest. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground dark:text-foreground dark:text-white border-b border-border dark:border-border dark:border-white/10 pb-2">5. Third-Party Services</h2>
              <p>
                We may use third-party services (such as payment processors or analytics providers) to facilitate our Service. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground dark:text-foreground dark:text-white border-b border-border dark:border-border dark:border-white/10 pb-2">6. Your Rights</h2>
              <p>
                Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete the data we hold about you. You can manage most of your data through your account settings or by contacting us directly.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground dark:text-foreground dark:text-white border-b border-border dark:border-border dark:border-white/10 pb-2">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-secondary/50 p-6 rounded-lg border border-border dark:border-border dark:border-white/5">
                <p className="font-semibold text-foreground dark:text-foreground dark:text-white">SkillCred Support</p>
                <p>Email: support@skillcred.in</p>
                <p>Website: skillcred.in</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
