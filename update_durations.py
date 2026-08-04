import os
import re

durations = {
    "full-stack-development": "7-8 Weeks",
    "ai-ml": "7-8 Weeks",
    "mobile-development": "7-8 Weeks",
    "devops-cloud": "5-6 Weeks",
    "data-engineering": "5-6 Weeks",
    "data-science": "5-6 Weeks",
    "cybersecurity": "4-5 Weeks",
    "iot-embedded": "4-5 Weeks"
}

def update_pages(base_dir):
    for slug, duration in durations.items():
        page_path = os.path.join(base_dir, slug, "page.tsx")
        if os.path.exists(page_path):
            with open(page_path, 'r', encoding='utf-8') as f:
                content = f.read()
            # Replace whatever duration is currently there with the correct one
            # It currently says 7-8 Weeks because of my previous sed command
            content = re.sub(r'<span>7-8 Weeks</span>', f'<span>{duration}</span>', content)
            
            with open(page_path, 'w', encoding='utf-8') as f:
                f.write(content)

update_pages("app/streams")
update_pages("app/lp")

print("Done updating durations.")
