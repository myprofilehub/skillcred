import os
import glob
import re

colors = ['pink', 'red', 'green', 'blue', 'teal', 'indigo', 'orange', 'cyan', 'amber', 'yellow', 'emerald', 'rose']

def fix_pages():
    pages = glob.glob('app/streams/*/page.tsx')
    
    for page in pages:
        with open(page, 'r') as f:
            content = f.read()
            
        for color in colors:
            content = re.sub(f'text-{color}-300', f'text-{color}-800', content)
            content = re.sub(f'text-{color}-400', f'text-{color}-700', content)
            
        with open(page, 'w') as f:
            f.write(content)
        print(f"Fixed colors in {page}")

if __name__ == "__main__":
    fix_pages()
