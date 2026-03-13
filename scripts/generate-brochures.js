const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

const streams = [
    { id: 'mobile-development', title: 'Mobile Development' },
    { id: 'iot-embedded', title: 'IoT & Embedded Systems' },
    { id: 'full-stack-development', title: 'Full Stack Development' },
    { id: 'devops-cloud', title: 'DevOps & Cloud' },
    { id: 'data-science', title: 'Data Science & Analytics' },
    { id: 'data-engineering', title: 'Data Engineering' },
    { id: 'cybersecurity', title: 'Cybersecurity' },
    { id: 'ai-ml', title: 'AI & Machine Learning' }
];

const dir = path.join(__dirname, '..', 'public', 'brochures');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

streams.forEach(stream => {
    const doc = new PDFDocument();
    const filePath = path.join(dir, `${stream.id}-brochure.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(28).text(`SkillCred ${stream.title} Track`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Master ${stream.title} with Real-World Projects`, { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(12).text(`Welcome to the ${stream.title} Track at SkillCred. This brochure outlines the comprehensive curriculum, projects, and career outcomes designed to make you industry-ready.`, { align: 'justify' });
    doc.moveDown(2);

    doc.fontSize(16).text('Program Highlights', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12)
        .text('• Live Mentor Support & Guidance')
        .text('• 5 Industry-Grade Projects')
        .text('• Project Assessment Test (PAT) Format')
        .text('• HR-Ready Verified Portfolio')
        .text('• Dedicated Mock Interviews');

    doc.moveDown(2);
    doc.fontSize(16).text('Prepare for Top Tech Jobs', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text('By the end of this track, you will have built a verifiable portfolio of projects that recruiters value over traditional theoretical exams.');

    doc.moveDown(4);
    doc.fontSize(14).text('Enroll today and start building your future at SkillCred.com', { align: 'center', color: 'blue' });

    doc.end();
    console.log(`Generated ${stream.id}-brochure.pdf`);
});
