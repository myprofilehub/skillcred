import os

# 1. Fix price-lock page
price_lock_path = "app/price-lock/page.tsx"
with open(price_lock_path, 'r', encoding='utf-8') as f:
    pl_content = f.read()

# We need to change the pricing data and layout to show the PAT Tier pricing
# and remove the regularPrice/savings logic.
new_programs_str = """
const programs = [
    {
        name: "Product Engineering",
        slug: "standard",
        duration: "8–10 Weeks",
        color: "purple",
        pilotPrice: "₹9,999",
        patPrice: "₹12,999",
        streams: ["Full Stack Dev", "AI/ML", "Mobile Dev"],
    },
    {
        name: "Data & Platform Engineering",
        slug: "fast-track",
        duration: "5–6 Weeks",
        color: "blue",
        pilotPrice: "₹6,999",
        patPrice: "₹9,499",
        streams: ["DevOps & Cloud", "Data Eng", "Data Science"],
    },
    {
        name: "Embedded & Security Engineering",
        slug: "capstone",
        duration: "4–5 Weeks",
        color: "green",
        pilotPrice: "₹4,999",
        patPrice: "₹6,999",
        streams: ["Cybersecurity", "IoT & Embedded"],
    },
];
"""

# Replace programs array
import re
pl_content = re.sub(r'const programs = \[.*?\];', new_programs_str.strip(), pl_content, flags=re.DOTALL)

# Replace the Price Comparison card UI in price-lock
new_pricing_ui = """
                                        {/* Price Comparison */}
                                        <div className="space-y-3 mb-6">
                                            <div className={`flex items-center justify-between p-3 rounded-lg ${colors.bg} ${colors.border}`}>
                                                <span className="text-sm text-muted-foreground">Standalone Cohort</span>
                                                <span className={`text-lg font-bold ${colors.text}`}>{program.pilotPrice}</span>
                                            </div>
                                            <div className={`flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20`}>
                                                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> With PAT Credential</span>
                                                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{program.patPrice}</span>
                                            </div>
                                        </div>
"""

pl_content = re.sub(
    r'\{\/\* Price Comparison \*\/\}.*?\{\/\* Lock Button \*\/\}',
    new_pricing_ui + '\n                                        {/* Lock Button */}',
    pl_content,
    flags=re.DOTALL
)

with open(price_lock_path, 'w', encoding='utf-8') as f:
    f.write(pl_content)

print("Updated price-lock page.")


# 2. Add conversion event to enroll/page.tsx
enroll_path = "app/enroll/page.tsx"
if os.path.exists(enroll_path):
    with open(enroll_path, 'r', encoding='utf-8') as f:
        en_content = f.read()
    
    # Check if we need to add the GA event inside the payment handler
    # The handler looks like handler: async function (response: any) { ... toast.success ... }
    # We will inject the gtag inside it.
    gtag_inject = """
                    // Fire Deposit Conversion Event
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'conversion', {
                            'send_to': 'G-4KBMF9RCY4/deposit_conversion',
                            'value': 500.0,
                            'currency': 'INR'
                        });
                    }
    """
    if "deposit_conversion" not in en_content:
        en_content = en_content.replace(
            "toast.success('🎉 Application submitted successfully!');",
            gtag_inject + "\n                    toast.success('🎉 Application submitted successfully!');"
        )
        en_content = en_content.replace(
            "toast.success('🎉 Your pilot price is locked! We\\'ll be in touch soon.');",
            gtag_inject + "\n                    toast.success('🎉 Your pilot price is locked! We\\'ll be in touch soon.');"
        )
        with open(enroll_path, 'w', encoding='utf-8') as f:
            f.write(en_content)
    print("Updated enroll page with conversion.")


# 3. Create Legal Pages
legal_template = """import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";

export default function {ComponentName}() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />
            <section className="py-32 container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold font-heading mb-8">{title}</h1>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p>Last updated: August 2026</p>
                    <p>This is a placeholder page for {title}. Please replace with your actual legal content.</p>
                    <h2>1. General Information</h2>
                    <p>Details regarding {title.lower()} go here.</p>
                </div>
            </section>
            <Footer />
        </main>
    );
}
"""

with open("app/terms/page.tsx", 'w', encoding='utf-8') as f:
    f.write(legal_template.replace('{ComponentName}', 'TermsPage').replace('{title}', 'Terms of Service'))
    
with open("app/refund-policy/page.tsx", 'w', encoding='utf-8') as f:
    f.write(legal_template.replace('{ComponentName}', 'RefundPolicyPage').replace('{title}', 'Refund & Cancellation Policy'))

# Create directories if they don't exist
os.makedirs("app/terms", exist_ok=True)
os.makedirs("app/refund-policy", exist_ok=True)

with open("app/terms/page.tsx", 'w', encoding='utf-8') as f:
    f.write(legal_template.replace('{ComponentName}', 'TermsPage').replace('{title}', 'Terms of Service'))
    
with open("app/refund-policy/page.tsx", 'w', encoding='utf-8') as f:
    f.write(legal_template.replace('{ComponentName}', 'RefundPolicyPage').replace('{title}', 'Refund & Cancellation Policy'))

print("Legal pages created.")
