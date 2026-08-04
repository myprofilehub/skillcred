import os
import re

replacements = {
    'bg-black': 'bg-background dark:bg-black',
    'bg-black/10': 'bg-black/10 dark:bg-black/50',
    'bg-black/20': 'bg-muted dark:bg-black/20',
    'bg-black/40': 'bg-muted dark:bg-black/40',
    'bg-black/50': 'bg-muted/50 dark:bg-black/50',
    'bg-black/60': 'bg-muted/80 dark:bg-black/60',
    'bg-black/80': 'bg-background/80 dark:bg-black/80',
    'bg-black/95': 'bg-background dark:bg-black/95',
    'text-white': 'text-foreground dark:text-white',
    'text-slate-300': 'text-muted-foreground dark:text-slate-300',
    'text-slate-400': 'text-muted-foreground dark:text-slate-400',
    'text-gray-300': 'text-muted-foreground dark:text-gray-300',
    'text-gray-400': 'text-muted-foreground dark:text-gray-400',
    'border-white/5': 'border-border dark:border-white/5',
    'border-white/10': 'border-border dark:border-white/10',
    'border-white/20': 'border-border dark:border-white/20',
}

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for k in sorted(replacements.keys(), key=len, reverse=True):
        pattern = r'(?<![a-zA-Z0-9_-])' + re.escape(k) + r'(?![a-zA-Z0-9_-])'
        new_content = re.sub(pattern, replacements[k], new_content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('app/streams'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

