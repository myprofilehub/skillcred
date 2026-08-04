import re

file_path = "components/public/lp-hero-form.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add isWebinarLoading state
if 'const [isWebinarLoading' not in content:
    content = content.replace(
        'const [isDemoOpen, setIsDemoOpen] = useState(false);',
        'const [isDemoOpen, setIsDemoOpen] = useState(false);\n    const [isWebinarLoading, setIsWebinarLoading] = useState(false);'
    )

# Add handleWebinarSubmit function
handle_webinar = """
    async function handleWebinarSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsWebinarLoading(true);

        const formData = new FormData(e.currentTarget);
        const context = `Webinar Registration: ${trackName} | Source: ${utms.source} | Medium: ${utms.medium} | Campaign: ${utms.campaign} | GCLID: ${utms.gclid}`;
        formData.append("track", context);

        try {
            const res = await submitLead(formData);
            if (res.success) {
                toast.success("Registered successfully! Check your email for the Zoom link.");
                setIsDemoOpen(false);
            } else {
                toast.error(res.error || "Failed to register.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsWebinarLoading(false);
        }
    }
"""
if 'async function handleWebinarSubmit' not in content:
    content = content.replace(
        'async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {',
        handle_webinar + '\n    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {'
    )

# Replace the frontend-only form with the real one
old_form_regex = r'<form onSubmit=\{\(e\) => \{ e\.preventDefault\(\); toast\.success\("Registered successfully! Check your email for the Zoom link\."\); setIsDemoOpen\(false\); \}\} className="space-y-4 pt-4">.*?<\/form>'

new_form = """<form onSubmit={handleWebinarSubmit} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="demo-name">Full Name</Label>
                                    <Input id="demo-name" name="name" required placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="demo-email">Email Address</Label>
                                    <Input id="demo-email" name="email" type="email" required placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="demo-phone">Phone Number</Label>
                                    <Input id="demo-phone" name="phone" type="tel" required placeholder="+91 9876543210" />
                                </div>
                                <Button type="submit" disabled={isWebinarLoading} className={`w-full bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white font-bold h-12`}>
                                    {isWebinarLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register Now"}
                                </Button>
                            </form>"""

content = re.sub(old_form_regex, new_form, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
