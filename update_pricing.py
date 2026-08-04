import re

file_path = "components/public/stream-pricing-components.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove regularBase, regularAddon, regularTotal definitions
content = re.sub(r'\s*regularBase: \d+,', '', content)
content = re.sub(r'\s*regularAddon: \d+,', '', content)
content = re.sub(r'\s*regularTotal: \d+', '', content)
content = re.sub(r'\s*regularBase: number;', '', content)
content = re.sub(r'\s*regularAddon: number;', '', content)
content = re.sub(r'\s*regularTotal: number;', '', content)

# 2. Remove struck-through pricing from StreamHeroPricing
content = re.sub(
    r'<span className="text-lg md:text-xl line-through[^>]+>.*?₹\{data\.regularBase\.toLocaleString\(\'en-IN\'\)\}.*?</span>',
    '',
    content,
    flags=re.DOTALL
)

# 3. Fix Scarcity in StreamHeroPricing
content = content.replace(
    "⚡ 20 seats • Cohort starts {COHORT_START_DATE} • Pilot pricing ends {PILOT_PRICING_END_DATE}",
    "⚡ Cohort starts {COHORT_START_DATE}"
)

# 4. Fix Scarcity in StreamBottomCTA
content = content.replace(
    "20 seats. First 20 students, pilot pricing.",
    "Lock in Your Pilot Pricing"
)
content = content.replace(
    "Pilot cohort pricing. Only 20 seats available.",
    "Pilot cohort pricing available."
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Pricing components updated.")
