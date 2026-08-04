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

accent_map = {
    "full-stack-development": "orange",
    "ai-ml": "purple",
    "cybersecurity": "green",
    "data-engineering": "blue",
    "data-science": "blue",
    "devops-cloud": "blue",
    "iot-embedded": "green",
    "mobile-development": "purple"
}

for slug in stream_slugs:
    filepath = os.path.join(streams_dir, slug, 'page.tsx')
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    # Find the StreamPortfolioPreview tag and duplicate it for curriculum, roadmap, and default variants
    preview_match = re.search(r'(            <StreamPortfolioPreview[\s\S]*?\/>)', content)
    if preview_match:
        original_preview = preview_match.group(1)
        
        # Construct the three section instances
        curriculum_preview = original_preview.replace('<StreamPortfolioPreview', '<StreamPortfolioPreview variant="curriculum"')
        roadmap_preview = original_preview.replace('<StreamPortfolioPreview', '<StreamPortfolioPreview variant="roadmap"')
        default_preview = original_preview # variant defaults to "default"

        combined_previews = f"""{curriculum_preview}

{roadmap_preview}

{default_preview}"""

        content = content.replace(original_preview, combined_previews)

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"Applied triple portfolio layouts on page: {slug}")
