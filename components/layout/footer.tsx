import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
    return (
        <footer className="bg-secondary border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-muted-foreground text-sm">
                            Learn. Build. Verify. <br />
                            The ultimate platform for skill verification and career growth.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Platform</h3>
                        <ul className="space-y-2">
                            <li><Link href="/#streams" className="text-muted-foreground hover:text-primary transition-colors text-sm">Streams</Link></li>
                            <li><Link href="/#mentors" className="text-muted-foreground hover:text-primary transition-colors text-sm">Mentors</Link></li>
                            <li><Link href="/#hr" className="text-muted-foreground hover:text-primary transition-colors text-sm">For Recruiters</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
                            <li><Link href="/refund-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">Refund & Cancellation Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center text-muted-foreground text-sm">
                    <p className="mb-2">
                        24/9, Gandhi Street, Vanuvampet, Chennai 600091 <br />
                        <a href="tel:+918870314954" className="hover:text-primary transition-colors">+91 8870314954</a> | <a href="mailto:support@skillcred.in" className="hover:text-primary transition-colors">support@skillcred.in</a>
                    </p>
                    <p>&copy; {new Date().getFullYear()} SkillCred. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
