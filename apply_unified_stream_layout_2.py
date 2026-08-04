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

    # 1. Remove the Curriculum Syllabus section from the stream page
    # Since CurriculumSyllabus is now inside StreamPortfolioPreview, we don't need it on the page itself
    curriculum_pattern = r'\{\/\* CURRICULUM SYLLABUS \*\/\}[\s\S]*?<\/section>'
    content = re.sub(curriculum_pattern, '', content)

    # 2. Remove the PAT Section (PBL Model format with 100 marks breakdown)
    # We want to find the {/* PAT Section */} block inside the mentor section and remove it
    pat_section_pattern = r'\{\/\* PAT Section \*\/\}[\s\S]*?<\/div>\s*<\/section>'
    # We replace it with just the closing tags for the MENTOR section:
    # which is `</div>\n            </section>`
    content = re.sub(pat_section_pattern, '</div>\n            </section>', content)

    # 3. Clean up the unused import of CurriculumSyllabus
    content = content.replace('import { CurriculumSyllabus } from "@/components/public/curriculum-syllabus";', '')

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"Cleaned up stream page: {slug}")
