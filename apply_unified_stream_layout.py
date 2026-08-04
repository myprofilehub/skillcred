import os
import re

streams_dir = '/home/mg/Documents/skillcred/app/streams'

stream_configs = {
    "full-stack-development": {
        "slug": "full-stack-development",
        "accent": "orange",
        "bootcamp_name": "Full Stack Development",
        "track_name": "Full Stack Development Track",
        "syllabus_url": "/brochures/SkillCred_Full_Stack_Development_Brochure.pdf"
    },
    "ai-ml": {
        "slug": "ai-ml",
        "accent": "purple",
        "bootcamp_name": "AI & ML Engineering",
        "track_name": "AI & ML Engineering Track",
        "syllabus_url": "/brochures/SkillCred_AIML_Engineering_Brochure.pdf"
    },
    "cybersecurity": {
        "slug": "cybersecurity",
        "accent": "green",
        "bootcamp_name": "Cybersecurity",
        "track_name": "Cybersecurity Track",
        "syllabus_url": "/brochures/SkillCred_Cybersecurity_Brochure.pdf"
    },
    "data-engineering": {
        "slug": "data-engineering",
        "accent": "blue",
        "bootcamp_name": "Data Engineering",
        "track_name": "Data Engineering Track",
        "syllabus_url": "/brochures/SkillCred_Data_Engineering_Brochure.pdf"
    },
    "data-science": {
        "slug": "data-science",
        "accent": "blue",
        "bootcamp_name": "Data Science",
        "track_name": "Data Science Track",
        "syllabus_url": "/brochures/SkillCred_Data_Science_Brochure.pdf"
    },
    "devops-cloud": {
        "slug": "devops-cloud",
        "accent": "blue",
        "bootcamp_name": "DevOps & Cloud",
        "track_name": "DevOps & Cloud Track",
        "syllabus_url": "/brochures/SkillCred_Devops_Cloud_Brochure.pdf"
    },
    "iot-embedded": {
        "slug": "iot-embedded",
        "accent": "green",
        "bootcamp_name": "IoT & Embedded",
        "track_name": "IoT & Embedded Track",
        "syllabus_url": "/brochures/SkillCred_IoT_Embedded_Brochure.pdf"
    },
    "mobile-development": {
        "slug": "mobile-development",
        "accent": "purple",
        "bootcamp_name": "Mobile Development",
        "track_name": "Mobile Development Track",
        "syllabus_url": "/brochures/SkillCred_Mobile_Development_Brochure.pdf"
    }
}

for slug, config in stream_configs.items():
    filepath = os.path.join(streams_dir, slug, 'page.tsx')
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Replace the HERO SECTION
    hero_pattern = r'\{\/\* HERO SECTION \*\/\}\s*<section className="relative pt-32 pb-20 overflow-hidden">[\s\S]*?<\/section>'
    new_hero = f"""{{/* HERO SECTION */}}
            <StreamLeadCaptureHero
                slug="{config['slug']}"
                accentColor="{config['accent']}"
                bootcampName="{config['bootcamp_name']}"
                trackName="{config['track_name']}"
                syllabusUrl="{config['syllabus_url']}"
            />"""
    content = re.sub(hero_pattern, new_hero, content)

    # 2. Replace the CURRICULUM & ROADMAP (TWO COLUMN) section with a clean full-width CurriculumSyllabus
    curriculum_pattern = r'\{\/\* CURRICULUM & ROADMAP.*? \*\/\}\s*<section className="py-20 bg-secondary/10">[\s\S]*?<\/section>'
    new_curriculum = f"""{{/* CURRICULUM SYLLABUS */}}
            <section className="py-20 bg-secondary/10">
                <div className="container mx-auto px-4 max-w-4xl">
                    <CurriculumSyllabus trackSlug="{config['slug']}" />
                </div>
            </section>"""
    content = re.sub(curriculum_pattern, new_curriculum, content)

    # 3. Replace the Bottom FAQs & CTA section
    faq_pattern = r'\{\/\* FAQs & CTA \*\/\}\s*<section className="py-20">[\s\S]*?<\/section>'
    
    # We want to extract just the FAQ list array inside the section so we don't lose the customized questions
    faq_list_match = re.search(r'(\[\s*\{\s*q:[\s\S]*?\}\s*\])', content)
    if faq_list_match:
        faq_list_str = faq_list_match.group(1)
        new_faq_and_cta = f"""{{/* FAQs & CTA */}}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {{
                            {faq_list_str}.map((faq, i) => (
                                <Card key={{i}} className="hover:bg-accent/5 transition-colors">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{{faq.q}}</CardTitle>
                                        <CardDescription>{{faq.a}}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))
                        }}
                    </div>
                </div>
            </section>

            <StreamBottomCTA
                slug="{config['slug']}"
                accentColor="{config['accent']}"
                bootcampName="{config['bootcamp_name']}"
            />"""
        content = re.sub(faq_pattern, new_faq_and_cta, content)

    # 4. Make sure imports are present and correct
    if "import { StreamLeadCaptureHero }" not in content:
        content = "import { StreamLeadCaptureHero } from \"@/components/public/stream-lead-capture-hero\";\n" + content
    if "import { StreamBottomCTA }" not in content:
        content = "import { StreamBottomCTA } from \"@/components/public/stream-pricing-components\";\n" + content

    # Clean up redundant imports if present
    content = content.replace('import { ProjectRoadmap } from "@/components/public/project-roadmap";', '')

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"Applied unified stream layout to: {slug}")
