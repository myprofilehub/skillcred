import os
import glob
import re

def update_stream_pages():
    pages = glob.glob('app/streams/*/page.tsx')
    
    for page in pages:
        with open(page, 'r') as f:
            content = f.read()

        # Extract slug, accentColor, bootcampName from StreamUpsellPricing
        upsell_match = re.search(r'<StreamUpsellPricing\s+slug="([^"]+)"\s+accentColor="([^"]+)"\s+bootcampName="([^"]+)"', content)
        if not upsell_match:
            print(f"Skipping {page} - could not find StreamUpsellPricing props")
            continue
            
        slug = upsell_match.group(1)
        accent_color = upsell_match.group(2)
        bootcamp_name = upsell_match.group(3)
        
        syllabus_url = f"/brochures/SkillCred_{slug.replace('-', '_').title()}_Brochure.pdf"

        # Find the StreamLeadForm block
        lead_form_pattern = r'<div className="mt-12">\s*<StreamLeadForm trackName="([^"]+)" accentColor="([^"]+)" />\s*</div>'
        lead_form_match = re.search(lead_form_pattern, content)
        
        if lead_form_match:
            track_name = lead_form_match.group(1)
            
            replacement = f'''<div className="grid md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto mt-12 text-left">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <StreamHeroPricing
                                slug="{slug}"
                                accentColor="{accent_color}"
                                bootcampName="{bootcamp_name}"
                                syllabusUrl="{syllabus_url}"
                            />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-center">Interested? Get a callback!</h3>
                            <StreamLeadForm trackName="{track_name}" accentColor="{accent_color}" />
                        </div>
                    </div>'''
            
            content = content.replace(lead_form_match.group(0), replacement)

            with open(page, 'w') as f:
                f.write(content)
            print(f"Updated {page}")
        else:
            print(f"Skipping {page} - no LeadForm found")

if __name__ == "__main__":
    update_stream_pages()
