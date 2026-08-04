import os
import glob
import re

def update_stream_pages():
    pages = glob.glob('app/streams/*/page.tsx')
    
    for page in pages:
        with open(page, 'r') as f:
            content = f.read()

        # 1. Add import for StreamLeadForm and MentorAssessmentSummary
        if 'StreamLeadForm' not in content:
            content = content.replace(
                'import { StreamHeroPricing, StreamUpsellPricing, StreamBottomCTA } from "@/components/public/stream-pricing-components";',
                'import { StreamHeroPricing, StreamUpsellPricing, StreamBottomCTA } from "@/components/public/stream-pricing-components";\nimport { StreamLeadForm } from "@/components/public/stream-lead-form";\nimport { MentorAssessmentSummary } from "@/components/public/mentor-assessment-summary";'
            )
            
        # 2. Extract trackName from the badge in the Hero section (e.g. FULL STACK DEVELOPMENT TRACK)
        track_name_match = re.search(r'<Badge.*?>\s*(.*?)\s*TRACK\s*</Badge>', content, re.IGNORECASE)
        track_name = track_name_match.group(1).strip() if track_name_match else "This Track"
        # Make title case
        track_name = track_name.title()

        # Extract accent color from StreamHeroPricing
        accent_color_match = re.search(r'accentColor="([^"]+)"', content)
        accent_color = accent_color_match.group(1) if accent_color_match else "purple"

        # 3. Replace StreamHeroPricing with StreamLeadForm
        content = re.sub(
            r'<StreamHeroPricing[\s\S]*?/>',
            f'<div className="mt-12">\n                        <StreamLeadForm trackName="{track_name}" accentColor="{accent_color}" />\n                    </div>',
            content
        )

        # 4. Remove the huge "WHY & WHO" and "TOOLS & LEARNING" sections to tighten the page
        # They start with <section className="py-20 bg-secondary/20"> and end before {/* PROJECT ROADMAP */}
        content = re.sub(
            r'\{/\* WHY & WHO SECTION \*/\}[\s\S]*?\{/\* PROJECT ROADMAP \*/\}',
            '{/* PROJECT ROADMAP */}',
            content
        )

        # 5. Replace MENTOR & ASSESSMENT (PAT) section with MentorAssessmentSummary
        content = re.sub(
            r'\{/\* MENTOR & ASSESSMENT \(PAT\) \*/\}[\s\S]*?<StreamUpsellPricing',
            '<section className="py-20">\n                <div className="container mx-auto px-4">\n                    <MentorAssessmentSummary />\n                </div>\n            </section>\n\n            <StreamUpsellPricing',
            content
        )

        with open(page, 'w') as f:
            f.write(content)
        print(f"Updated {page}")

if __name__ == "__main__":
    update_stream_pages()
