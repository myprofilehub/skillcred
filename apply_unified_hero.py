import os
import glob
import re

def update_stream_pages():
    pages = glob.glob('app/streams/*/page.tsx')
    
    for page in pages:
        with open(page, 'r') as f:
            content = f.read()

        # Add import for StreamLeadCaptureHero
        if 'StreamLeadCaptureHero' not in content:
            content = content.replace(
                'import { StreamHeroPricing, StreamUpsellPricing, StreamBottomCTA } from "@/components/public/stream-pricing-components";',
                'import { StreamUpsellPricing, StreamBottomCTA } from "@/components/public/stream-pricing-components";\nimport { StreamLeadCaptureHero } from "@/components/public/stream-lead-capture-hero";'
            )

        # Match the old grid block
        # The block we want to replace starts with: <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto mt-12">
        # And ends with the closing </div> of that grid.
        
        # Instead of parsing the whole grid, let's extract the props from StreamHeroPricing and StreamLeadForm inside it
        pricing_match = re.search(r'<StreamHeroPricing\s+slug="([^"]+)"\s+accentColor="([^"]+)"\s+bootcampName="([^"]+)"\s+syllabusUrl="([^"]+)"\s*/>', content)
        form_match = re.search(r'<StreamLeadForm trackName="([^"]+)" accentColor="([^"]+)" />', content)
        
        if pricing_match and form_match:
            slug = pricing_match.group(1)
            accentColor = pricing_match.group(2)
            bootcampName = pricing_match.group(3)
            syllabusUrl = pricing_match.group(4)
            trackName = form_match.group(1)
            
            # The pattern to replace the whole grid
            grid_pattern = r'<div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto mt-12">[\s\S]*?</div>\s*</div>\s*</div>'
            
            replacement = f'''<StreamLeadCaptureHero 
                        slug="{slug}" 
                        accentColor="{accentColor}" 
                        bootcampName="{bootcampName}" 
                        trackName="{trackName}" 
                        syllabusUrl="{syllabusUrl}" 
                    />'''
                    
            content = re.sub(grid_pattern, replacement, content)
            
            with open(page, 'w') as f:
                f.write(content)
            print(f"Applied unified hero to {page}")
        else:
            print(f"Could not find required props in {page}")

if __name__ == "__main__":
    update_stream_pages()
