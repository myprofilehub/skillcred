import os

file_path = '/home/mg/Documents/skillcred/components/public/stream-pricing-components.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# We want to add the three new entries into STREAM_PRICING_DATA
# Product Engineering (standard) inherits from full-stack
# Fast-Track inherits from data-science
# Capstone inherits from cybersecurity

additions = """    "standard": {
        tier: 'A',
        duration: "8–10 Weeks",
        pilotBase: 9999,
        regularBase: 14999,
        pilotAddon: 3000,
        regularAddon: 4000,
        pilotTotal: 12999,
        regularTotal: 18999
    },
    "fast-track": {
        tier: 'B',
        duration: "5–6 Weeks",
        pilotBase: 6999,
        regularBase: 9999,
        pilotAddon: 2500,
        regularAddon: 3500,
        pilotTotal: 9499,
        regularTotal: 13499
    },
    "capstone": {
        tier: 'C',
        duration: "4–5 Weeks",
        pilotBase: 4999,
        regularBase: 6999,
        pilotAddon: 2000,
        regularAddon: 3000,
        pilotTotal: 6999,
        regularTotal: 9999
    },
"""

# Insert right after `export const STREAM_PRICING_DATA: Record<string, { ... }> = {\n`
content = content.replace("}> = {\n", "}> = {\n" + additions)

with open(file_path, 'w') as f:
    f.write(content)

print("Updated stream-pricing-components.tsx")
