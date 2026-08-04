import os
import glob
import re

def fix_pages():
    pages = glob.glob('app/streams/*/page.tsx')
    
    for page in pages:
        with open(page, 'r') as f:
            content = f.read()
            
        # Add a closing div just before </section> in the HERO SECTION.
        # Since the error is around:
        #                     />
        #             </section>
        # Let's replace:
        # syllabusUrl="([^"]+)" \n                    />\n            </section>
        # with
        # syllabusUrl="\1" \n                    />\n                </div>\n            </section>
        
        pattern = r'(\s*syllabusUrl="[^"]*"\s*\/>)\s*<\/section>'
        replacement = r'\1\n                </div>\n            </section>'
        
        new_content = re.sub(pattern, replacement, content)
        
        if new_content != content:
            with open(page, 'w') as f:
                f.write(new_content)
            print(f"Fixed {page}")
        else:
            print(f"Skipped {page}")

if __name__ == "__main__":
    fix_pages()
