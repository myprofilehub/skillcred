import os
import glob
import re

def update_stream_pages():
    pages = glob.glob('app/streams/*/page.tsx')
    
    for page in pages:
        with open(page, 'r') as f:
            content = f.read()

        # Find the ugly grid block we added
        ugly_pattern = r'<div className="grid md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto mt-12 text-left">\s*<div className="bg-white/5 border border-white/10 rounded-2xl p-6">\s*<StreamHeroPricing([\s\S]*?)/>\s*</div>\s*<div className="bg-white/5 border border-white/10 rounded-2xl p-6">\s*<h3 className="text-xl font-bold mb-4 text-center">Interested\? Get a callback!</h3>\s*<StreamLeadForm([\s\S]*?)/>\s*</div>\s*</div>'
        
        def replacement_fn(m):
            pricing_props = m.group(1)
            form_props = m.group(2)
            
            return f'''<div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto mt-12">
                        <div className="w-full">
                            <StreamHeroPricing{pricing_props}/>
                        </div>
                        <div className="w-full max-w-md mx-auto">
                            <StreamLeadForm{form_props}/>
                        </div>
                    </div>'''

        new_content = re.sub(ugly_pattern, replacement_fn, content)

        if new_content != content:
            with open(page, 'w') as f:
                f.write(new_content)
            print(f"Cleaned {page}")
        else:
            print(f"Skipping {page} - did not match pattern")

if __name__ == "__main__":
    update_stream_pages()
