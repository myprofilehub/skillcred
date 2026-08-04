import os
import re

directory = "app/lp"

for folder in os.listdir(directory):
    path = os.path.join(directory, folder, "page.tsx")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()

        # Remove StreamBottomCTA import
        content = re.sub(r'import\s+{\s*StreamBottomCTA\s*}\s+from\s+"@/components/public/stream-pricing-components";\n?', '', content)

        # Find the trackName and accentColor used in the first LpHeroForm
        match = re.search(r'<LpHeroForm\s+trackName="([^"]+)"\s+accentColor="([^"]+)"\s*/>', content)
        if match:
            trackName = match.group(1)
            accentColor = match.group(2)

            # Replace the StreamBottomCTA block with LpHeroForm wrapped in a section
            replacement = f"""
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4 text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Ready to start?</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Get the curriculum and see if the {trackName} is right for you.</p>
                </div>
                <div className="w-full text-left">
                    <LpHeroForm trackName="{trackName}" accentColor="{accentColor}" />
                </div>
            </section>
"""
            # StreamBottomCTA might have different props, so we just match the tag
            content = re.sub(r'<StreamBottomCTA[^>]*/>', replacement, content, flags=re.DOTALL)
            
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
