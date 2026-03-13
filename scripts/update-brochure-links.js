const fs = require('fs');
const path = require('path');

const streamToBrochure = {
    'ai-ml': 'SkillCred_AI_ML_Brochure.pdf',
    'cybersecurity': 'SkillCred_Cyber_Brochure.pdf',
    'data-engineering': 'SkillCred_DataEng_Brochure.pdf',
    'data-science': 'SkillCred_DataSci_Brochure.pdf',
    'devops-cloud': 'SkillCred_DevOps_Brochure.pdf',
    'full-stack-development': 'SkillCred_Fullstack_4p.pdf',
    'iot-embedded': 'SkillCred_IoT_Brochure.pdf',
    'mobile-development': 'SkillCred_Mobile_Brochure.pdf'
};

Object.entries(streamToBrochure).forEach(([stream, newBrochure]) => {
    const file = path.join(__dirname, '..', 'app', 'streams', stream, 'page.tsx');
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Replace both Hero and Footer CTAs that link to the old brochure
        const oldHrefRegex = new RegExp(`href="/brochures/${stream}-brochure.pdf"`, 'g');
        content = content.replace(oldHrefRegex, `href="/brochures/${newBrochure}"`);

        fs.writeFileSync(file, content);
        console.log(`Updated CTA links in ${stream} to ${newBrochure}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
