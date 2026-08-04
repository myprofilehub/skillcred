import os
import re

def process_page(file_path, slug, accent_color, track_name, bootcamp_name):
    with open(file_path, 'r') as f:
        content = f.read()

    # Import the hero component
    if 'StreamLeadCaptureHero' not in content:
        import_stmt = 'import { StreamLeadCaptureHero } from "@/components/public/stream-lead-capture-hero";\n'
        content = content.replace('import Link from "next/link";', import_stmt + 'import Link from "next/link";')

    # Remove the old buttons
    button_pattern = r'<div className="flex flex-col sm:flex-row gap-4 justify-center">[\s\S]*?<\/div>'
    content = re.sub(button_pattern, '', content)
    
    # Insert StreamLeadCaptureHero after the closing </div> of the container but before </section>
    # The structure is:
    #                 </div>
    #             </section>
    
    hero_pattern = r'(\s*)<\/div>\n\s*<\/section>'
    replacement = f'''\\1</div>\n\\1<div className="mt-12">\n\\1    <StreamLeadCaptureHero slug="{slug}" accentColor="{accent_color}" bootcampName="{bootcamp_name}" trackName="{track_name}" />\n\\1</div>\n            </section>'''
    
    content = re.sub(hero_pattern, replacement, content, count=1)
    
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"Updated {file_path}")

process_page(
    'app/programs/standard/page.tsx', 
    slug='standard', 
    accent_color='purple', 
    track_name='Product Engineering Program',
    bootcamp_name='Product Engineering'
)

process_page(
    'app/programs/fast-track/page.tsx', 
    slug='fast-track', 
    accent_color='blue', 
    track_name='Data Engineering & Analytics Program',
    bootcamp_name='Data Engineering & Analytics'
)

process_page(
    'app/programs/capstone/page.tsx', 
    slug='capstone', 
    accent_color='green', 
    track_name='Embedded & Security Engineering Program',
    bootcamp_name='Embedded & Security Engineering'
)

