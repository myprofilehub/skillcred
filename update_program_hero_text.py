import re

def replace_hero_content(file_path, new_badge, new_title, new_desc, new_streams, accent_color, track_name, bootcamp_name):
    with open(file_path, 'r') as f:
        content = f.read()

    # The content we want to replace is everything inside the container div up to the StreamLeadCaptureHero
    # Structure:
    # <div className="container relative z-10 mx-auto px-4 text-center">
    # ... everything in here ...
    # </div>
    
    container_pattern = r'(<div className="container relative z-10 mx-auto px-4 text-center">)[\s\S]*?(<\/div>)'
    
    title_html = f'''\\1
                    <Badge variant="outline" className="mb-6 border-{accent_color}-500/30 text-{accent_color}-400 bg-{accent_color}-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        {new_badge}
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        {new_title}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
                        {new_desc}
                    </p>
                    <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-10">
                        Streams included: <span className="text-foreground dark:text-foreground dark:text-white font-medium">{new_streams}</span>
                    </p>
                \\2'''
                
    content = re.sub(container_pattern, title_html, content, count=1)
    
    # Also update the StreamLeadCaptureHero attributes in case they are wrong
    hero_pattern = r'<StreamLeadCaptureHero([^>]+)\/>'
    
    def replacer(match):
        return f'<StreamLeadCaptureHero slug="{file_path.split("/")[-2]}" accentColor="{accent_color}" bootcampName="{bootcamp_name}" trackName="{track_name}" />'
    
    content = re.sub(hero_pattern, replacer, content)

    with open(file_path, 'w') as f:
        f.write(content)
    print(f"Fixed {file_path}")

replace_hero_content(
    'app/programs/standard/page.tsx',
    new_badge='8–10 Weeks · Product Engineering',
    new_title='Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">Engineering</span>',
    new_desc='Our most comprehensive program. Built for aspiring engineers targeting product companies — where the hiring bar is set by timed DSA, cold machine-coding, and live problem-solving under pressure.',
    new_streams='Full Stack Development · AI/ML Engineering · Mobile Development',
    accent_color='purple',
    track_name='Product Engineering Program',
    bootcamp_name='Product Engineering'
)

replace_hero_content(
    'app/programs/fast-track/page.tsx',
    new_badge='5–6 Weeks · Data & Platform Engineering',
    new_title='Data & Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Engineering</span>',
    new_desc='An accelerated, intense building experience focusing on SQL, infrastructure & system-design.',
    new_streams='DevOps & Cloud · Data Engineering · Data Science',
    accent_color='blue',
    track_name='Data & Platform Engineering Program',
    bootcamp_name='Data & Platform Engineering'
)

replace_hero_content(
    'app/programs/capstone/page.tsx',
    new_badge='4–5 Weeks · Embedded & Security Engineering',
    new_title='Embedded & Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Engineering</span>',
    new_desc="The most targeted program we offer. Interviews in these domains test real-world scenario judgment — not algorithm memorisation. You'll be drilled on SOC triage shifts and hardware-debug cycles until they feel routine.",
    new_streams='Cybersecurity · IoT & Embedded Systems',
    accent_color='green',
    track_name='Embedded & Security Engineering Program',
    bootcamp_name='Embedded & Security Engineering'
)
