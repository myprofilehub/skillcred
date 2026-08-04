import re

file_path = "components/public/stream-hero-action-card.tsx"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove regularBase usage
content = re.sub(
    r'<span className="text-sm line-through text-slate-400 decoration-slate-300 dark:decoration-slate-600 decoration-2">\s*₹\{data\.regularBase\.toLocaleString\(\'en-IN\'\)\}\s*</span>',
    '',
    content
)

# Remove regularTotal usage
content = re.sub(
    r'<span className="text-sm line-through text-slate-400 decoration-slate-300 dark:decoration-slate-600 decoration-2">\s*₹\{data\.regularTotal\.toLocaleString\(\'en-IN\'\)\}\s*</span>',
    '',
    content
)

# Fix scarcity text
content = content.replace("⚡ Pilot pricing: Only 20 seats available", "Special Pilot Pricing")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed stream hero action card.")
