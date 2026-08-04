import re

def update_structure(file_path, color):
    with open(file_path, 'r') as f:
        content = f.read()

    # We need to replace the entire card starting with <div className="bg-gradient-to-br... Program Structure ...
    # We can match from `<div className="bg-gradient-to-br` up to `</div>\n                    </div>`
    
    # We will just replace the classes on the card div and the text colors.
    
    # Replace background gradient and border
    content = re.sub(
        r'bg-gradient-to-br from-\w+-900/20 to-black rounded-3xl p-8 border border-\w+-500/20',
        f'bg-background rounded-3xl p-8 border border-{color}-500/20 shadow-sm relative overflow-hidden',
        content
    )
    
    # Replace top right glow
    content = re.sub(
        r'w-32 h-32 bg-\w+-500/20 blur-3xl rounded-full',
        f'w-64 h-64 bg-{color}-500/10 blur-[100px] rounded-full -top-10 -right-10',
        content
    )

    # Replace icon color
    content = re.sub(
        r'<Clock className="w-6 h-6 text-\w+-400" />',
        f'<Clock className="w-6 h-6 text-{color}-500" />',
        content
    )
    
    # Replace h4 text color
    content = re.sub(
        r'text-\w+-300',
        f'text-{color}-600 dark:text-{color}-400',
        content
    )
    
    # Replace text-muted-foreground inside this block to be clearer if needed, but text-muted-foreground 
    # on bg-background is usually fine.
    
    # Replace the h-px separator
    content = re.sub(
        r'bg-white/10',
        r'bg-border',
        content
    )

    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"Updated {file_path}")

update_structure('app/programs/standard/page.tsx', 'purple')
update_structure('app/programs/fast-track/page.tsx', 'blue')
update_structure('app/programs/capstone/page.tsx', 'green')
