import os
import re

file_path = "components/public/lp-hero-form.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's replace the main return statement of LpHeroForm.
# We will use regex to find the start of the return statement and replace it.

new_return = """    const isProductEngineering = trackName.includes("Full Stack") || trackName.includes("AI & ML") || trackName.includes("Mobile");
    const isDataPlatform = trackName.includes("Data Science") || trackName.includes("Data Engineering") || trackName.includes("DevOps");
    const pricing = isProductEngineering ? "9,999" : (isDataPlatform ? "6,999" : "4,999");

    return (
        <div className="grid md:grid-cols-2 gap-8 items-stretch w-full max-w-4xl mx-auto relative z-20">
            {/* Pricing Card */}
            <div className="bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden text-left flex flex-col justify-center">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}-500/10 blur-[40px] -z-10`} />
                <div className="mb-2">
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
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden text-left">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}-500/10 blur-[40px] -z-10`} />
                
                <h3 className="text-xl font-bold font-heading mb-2 text-slate-900 dark:text-white">Apply Now</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Enter your details to speak with an advisor about enrollment.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-900 dark:text-white font-semibold">Full Name <span className="text-red-500">*</span></Label>
                        <Input id="name" name="name" required placeholder="John Doe" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400" />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-900 dark:text-white font-semibold">Email Address <span className="text-red-500">*</span></Label>
                        <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-900 dark:text-white font-semibold">Phone Number <span className="text-red-500">*</span></Label>
                        <Input id="phone" name="phone" type="tel" required placeholder="+91 9876543210" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400" />
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                        <input type="checkbox" id="consent" name="consent" required className="mt-1 w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                        <Label htmlFor="consent" className="text-xs text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                            I agree to be contacted by phone and WhatsApp regarding this enquiry.
                        </Label>
                        <input type="hidden" name="consent_timestamp" value={new Date().toISOString()} />
                    </div>

                    <Button 
                        type="submit" 
                        className={`w-full mt-4 bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white font-bold h-12 text-lg shadow-lg shadow-${accentColor}-500/20`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>Request a Callback <ArrowRight className="w-5 h-5 ml-2" /></>
                        )}
                    </Button>
                </form>
                
                <p className="text-[10px] text-center text-slate-400 mt-4">
                    By submitting this form, you agree to our Terms and Privacy Policy.
                </p>
            </div>
        </div>
    );"""

# The return starts at line 58. We can use a regex to match from return ( down to the end of the file.
content = re.sub(r'    return \(\n        <div className="bg-white dark:bg-slate-900 shadow-2xl border.*?</form>\s*<p.*?</p>\s*</div>\s*\);\s*\}', new_return + '\n}', content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
