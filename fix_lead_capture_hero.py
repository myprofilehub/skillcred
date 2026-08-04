import re

file_path = "components/public/stream-lead-capture-hero.tsx"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove regularBase usage
content = re.sub(
    r'<span className="text-lg line-through text-slate-400 decoration-slate-300 decoration-2">\s*₹\{data\.regularBase\.toLocaleString\(\'en-IN\'\)\}\s*</span>',
    '',
    content
)

# Fix scarcity text
content = content.replace("⚡ Only 20 seats available at this price", "Special Pilot Pricing Available")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed stream lead capture hero.")
