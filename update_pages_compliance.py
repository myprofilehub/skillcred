import os
import re

directories = ['app/lp', 'app/streams']

fact_block_html = """
                    <div className="flex justify-center gap-6 mt-8 mb-4 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Next Cohort</span><span>Starts 1st</span></div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Duration</span><span>8-10 Weeks</span></div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center"><span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Format</span><span>100% Online</span></div>
                    </div>
"""

for d in directories:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file == 'page.tsx':
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Fix absolutely
                content = content.replace('"Absolutely — the track', '"The track')
                content = content.replace('Absolutely', 'Yes') # Just in case any other variations
                
                # Fix recruiter verified
                content = content.replace('Recruiter Verified', 'Built for Recruiter Review')
                
                # Fix assessment scores
                content = content.replace('assessment scores hiring managers trust', 'mentor-verified project defenses')

                # Fix Week 7 gap
                content = content.replace('Capstone (wk 8-10)', 'Capstone (wk 7-10)')
                content = content.replace('Capstone (wk 8–10)', 'Capstone (wk 7–10)')

                # Inject fact block
                if 'Next Cohort' not in content:
                    # Inject below the LpHeroForm or StreamHeroActionCard
                    # Actually, better to inject it right below the main paragraph in the hero section, before the checklist.
                    # Look for: <div className="flex flex-wrap justify-center gap-4 mb-12">
                    if '<div className="flex flex-wrap justify-center gap-4 mb-12">' in content:
                        content = content.replace(
                            '<div className="flex flex-wrap justify-center gap-4 mb-12">',
                            fact_block_html + '\n                    <div className="flex flex-wrap justify-center gap-4 mb-12">'
                        )

                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

print("Compliance updates applied to pages.")
