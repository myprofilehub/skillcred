import os
import re

file_path = "components/public/lp-hero-form.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add Dialog imports
if 'import { Dialog' not in content:
    content = content.replace('import { toast } from "sonner";', 
        'import { toast } from "sonner";\nimport { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";')

# Add isDemoOpen state
if 'const [isDemoOpen, setIsDemoOpen] = useState(false);' not in content:
    content = content.replace('const [isLoading, setIsLoading] = useState(false);',
        'const [isLoading, setIsLoading] = useState(false);\n    const [isDemoOpen, setIsDemoOpen] = useState(false);')

# Replace getTrackTitle logic inside component
track_title_logic = """
    function getTrackTitle(name: string) {
        if (name.includes("Full Stack")) return "Become a Fullstack Engineer";
        if (name.includes("AI & ML")) return "Become an AI & ML Engineer";
        if (name.includes("Mobile")) return "Become a Mobile Engineer";
        if (name.includes("Data Science")) return "Become a Data Scientist";
        if (name.includes("Data Engineering")) return "Become a Data Engineer";
        if (name.includes("DevOps")) return "Become a Cloud/DevOps Engineer";
        if (name.includes("Cybersecurity")) return "Become a Security Engineer";
        if (name.includes("IoT")) return "Become an Embedded Engineer";
        return "Master Engineering";
    }
"""
if 'function getTrackTitle' not in content:
    content = content.replace('const isProductEngineering =', track_title_logic + '\n    const isProductEngineering =')

# Update the Pricing Card HTML
# We need to insert the dynamic title and the Dialog button
# We'll use regex to replace the interior of the pricing card.

new_pricing_card = """            {/* Pricing Card */}
            <div className="bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden text-left flex flex-col justify-center">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}-500/10 blur-[40px] -z-10`} />
                <div className="mb-2">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                        {getTrackTitle(trackName)}
                    </h2>
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className={`w-5 h-5 text-${accentColor}-500`} />
                        <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cohort + PAT Bundle</span>
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                        ₹{pricing}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Program Pricing (Pilot Cohort)</p>
                    <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Includes Live Mentor Support</span></li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Guaranteed Project Verification</span></li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span>100% Online Format</span></li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Placement Assistance</span></li>
                    </ul>

                    <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
                        <DialogTrigger asChild>
                            <Button className={`w-full mt-8 bg-${accentColor}-100 hover:bg-${accentColor}-200 text-${accentColor}-700 font-bold h-12 text-lg`}>
                                Request a Demo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Register for Live Webinar</DialogTitle>
                                <DialogDescription>
                                    Join our next Open House to see a live walkthrough of the platform and curriculum.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={(e) => { e.preventDefault(); toast.success("Registered successfully! Check your email for the Zoom link."); setIsDemoOpen(false); }} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="demo-name">Full Name</Label>
                                    <Input id="demo-name" required placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="demo-email">Email Address</Label>
                                    <Input id="demo-email" type="email" required placeholder="john@example.com" />
                                </div>
                                <Button type="submit" className={`w-full bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white font-bold h-12`}>Register Now</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>"""

content = re.sub(r'\{\/\*\s*Pricing Card\s*\*\/\}.*?</div>\s*</div>', new_pricing_card, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
