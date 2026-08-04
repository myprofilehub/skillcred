import os
import re

def process_page(file_path, slug, accent_color, track_name, bootcamp_name):
    with open(file_path, 'r') as f:
        content = f.read()

    # Import the hero component
    if 'StreamLeadCaptureHero' not in content:
        import_stmt = 'import { StreamLeadCaptureHero } from "@/components/public/stream-lead-capture-hero";\n'
        content = content.replace('import Link from "next/link";', import_stmt + 'import Link from "next/link";')

    # Replace the Hero section
    # The hero section typically starts with <section className="relative pt-32 pb-20 overflow-hidden">
    # and ends with </section>
    
    hero_pattern = r'<section className="relative pt-32 pb-20 overflow-hidden">[\s\S]*?<\/section>'
    
    replacement = f'''<section className="relative pt-32 pb-0 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-{accent_color}-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-{accent_color}-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>
                
                <StreamLeadCaptureHero 
                    slug="{slug}" 
                    accentColor="{accent_color}" 
                    bootcampName="{bootcamp_name}" 
                    trackName="{track_name}" 
                />
            </section>'''
            
    new_content = re.sub(hero_pattern, replacement, content)
    
    with open(file_path, 'w') as f:
        f.write(new_content)
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

