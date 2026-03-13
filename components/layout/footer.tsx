import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold font-heading tracking-tight">
                                Skill<span className="text-primary">Cred</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Learn. Build. Verify. Get Hired. <br />
                            The ultimate platform for skill verification and career growth.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Platform</h3>
                        <ul className="space-y-2">
                            <li><Link href="#streams" className="text-muted-foreground hover:text-primary transition-colors text-sm">Streams</Link></li>
                            <li><Link href="#mentors" className="text-muted-foreground hover:text-primary transition-colors text-sm">Mentors</Link></li>
                            <li><Link href="#hr" className="text-muted-foreground hover:text-primary transition-colors text-sm">For Recruiters</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Blog</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Case Studies</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center text-muted-foreground text-sm">
                    &copy; {new Date().getFullYear()} SkillCred. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
