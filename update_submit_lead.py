import re

file_path = "app/actions/submit-lead.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add import db from "@/lib/db"
if 'import db' not in content:
    content = content.replace('"use server"', '"use server"\n\nimport { db } from "@/lib/db";')

# Add Prisma insert before Brevo fetch
prisma_insert = """
  try {
    await db.lead.create({
      data: {
        name,
        email,
        phone,
        track,
      },
    });
  } catch (dbError) {
    console.error("Failed to save lead to database:", dbError);
    // Continue executing so we still attempt the Brevo email
  }
"""

if 'db.lead.create' not in content:
    content = content.replace(
        '  try {\n    const res = await fetch("https://api.brevo.com/v3/smtp/email"',
        prisma_insert + '\n  try {\n    const res = await fetch("https://api.brevo.com/v3/smtp/email"'
    )

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
