import os
import re

streams_dir = '/home/mg/Documents/skillcred/app/streams'
stream_slugs = [
    "full-stack-development",
    "ai-ml",
    "cybersecurity",
    "data-engineering",
    "data-science",
    "devops-cloud",
    "iot-embedded",
    "mobile-development"
]

for slug in stream_slugs:
    filepath = os.path.join(streams_dir, slug, 'page.tsx')
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    # Find all instances of StreamPortfolioPreview and replace them with exactly TWO instances:
    # 1. variant="roadmap" (Curriculum / Project Roadmap with Stream Profile card)
    # 2. variant="default" (Separate Portfolio Output section)

    # First, find one complete tag of StreamPortfolioPreview to get its props (slug, accentColor, skills, etc.)
    match = re.search(r'<StreamPortfolioPreview[\s\S]*?\/>', content)
    if not match:
        continue
    
    # Get a clean base version without any variant prop
    base_tag = match.group(0)
    base_tag = re.sub(r'\s*variant="[^"]+"', '', base_tag)
    
    # Create the two desired tags with standard 12-space indentation
    lines = base_tag.split('\n')
    indented_base = '\n'.join([("            " + line.lstrip()) if i > 0 else line for i, line in enumerate(lines)])
    
    roadmap_tag = indented_base.replace('<StreamPortfolioPreview', '            <StreamPortfolioPreview\n                variant="roadmap"')
    if not roadmap_tag.lstrip().startswith('<StreamPortfolioPreview'):
        roadmap_tag = '            ' + roadmap_tag.lstrip()

    default_tag = indented_base.replace('<StreamPortfolioPreview', '            <StreamPortfolioPreview\n                variant="default"')
    if not default_tag.lstrip().startswith('<StreamPortfolioPreview'):
        default_tag = '            ' + default_tag.lstrip()

    combined_sections = f"""{roadmap_tag}

            {{/* SEPARATE PORTFOLIO OUTPUT SECTION */}}
{default_tag}"""

    # Replace any contiguous block of StreamPortfolioPreview tags and intervening comments/whitespace
    pattern = r'(\s*<StreamPortfolioPreview[\s\S]*?\/>\s*)+'
    content = re.sub(pattern, f"\n\n{combined_sections}\n\n", content, count=1)

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"Updated page: {slug}")
