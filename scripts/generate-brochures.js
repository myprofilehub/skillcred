const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

const streams = [
    { id: 'ai-ml', title: 'AI & Machine Learning', file: 'SkillCred_AI_ML_Brochure.pdf' },
    { id: 'cybersecurity', title: 'Cybersecurity', file: 'SkillCred_Cyber_Brochure.pdf' },
    { id: 'data-engineering', title: 'Data Engineering', file: 'SkillCred_DataEng_Brochure.pdf' },
    { id: 'data-science', title: 'Data Science & Analytics', file: 'SkillCred_DataSci_Brochure.pdf' },
    { id: 'devops-cloud', title: 'DevOps & Cloud', file: 'SkillCred_DevOps_Brochure.pdf' },
    { id: 'full-stack-development', title: 'Full Stack Development', file: 'SkillCred_Fullstack_4p.pdf' },
    { id: 'iot-embedded', title: 'IoT & Embedded Systems', file: 'SkillCred_IoT_Brochure.pdf' },
    { id: 'mobile-development', title: 'Mobile Development', file: 'SkillCred_Mobile_Brochure.pdf' },
];

// Program schedule details
// Weekday Batch: 3 hours/day × 5 days/week
// Weekend Batch: 6 hours/day × 2 days/week (Sat + Sun)
const programs = [
    {
        name: 'Fast Track — 4 Weeks',
        weekday: { hoursPerDay: 3, daysPerWeek: 5, weeks: 4, totalHours: 60 },
        weekend: { hoursPerDay: 6, daysPerWeek: 2, weeks: 4, totalHours: 48 },
    },
    {
        name: 'Standard — 8 Weeks',
        weekday: { hoursPerDay: 3, daysPerWeek: 5, weeks: 8, totalHours: 120 },
        weekend: { hoursPerDay: 6, daysPerWeek: 2, weeks: 8, totalHours: 96 },
    },
    {
        name: 'Capstone Track — 2 Weeks',
        weekday: { hoursPerDay: 3, daysPerWeek: 5, weeks: 2, totalHours: 30 },
        weekend: { hoursPerDay: 6, daysPerWeek: 2, weeks: 2, totalHours: 24 },
    },
];

const dir = path.join(__dirname, '..', 'public', 'brochures');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

streams.forEach(stream => {
    const doc = new PDFDocument({ margin: 50 });
    const filePath = path.join(dir, stream.file);
    doc.pipe(fs.createWriteStream(filePath));

    // ── Header ──────────────────────────────────────────────────────────
    doc.fontSize(26).font('Helvetica-Bold')
        .text(`SkillCred — ${stream.title}`, { align: 'center' });
    doc.moveDown(0.3);
    doc.fontSize(13).font('Helvetica')
        .text('Learn. Build. Verify. Get Hired.', { align: 'center' });
    doc.moveDown(1.5);

    // ── Intro ────────────────────────────────────────────────────────────
    doc.fontSize(11).font('Helvetica')
        .text(
            `Welcome to the ${stream.title} Track at SkillCred. This brochure outlines the ` +
            `curriculum structure, program schedule, projects, and career outcomes designed ` +
            `to make you industry-ready.`,
            { align: 'justify' }
        );
    doc.moveDown(1.5);

    // ── Program Highlights ───────────────────────────────────────────────
    doc.fontSize(15).font('Helvetica-Bold').text('Program Highlights', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica')
        .text('• Live Mentor Support & Guidance')
        .text('• 5 Industry-Grade Projects')
        .text('• Project Assessment Test (PAT) Format')
        .text('• HR-Ready Verified Portfolio')
        .text('• Dedicated Mock Interviews');
    doc.moveDown(1.5);

    // ── Session Duration & Schedule ──────────────────────────────────────
    doc.fontSize(15).font('Helvetica-Bold').text('Session Duration & Schedule', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica')
        .text(
            'Each program is available in two batch modes — Weekday and Weekend — ' +
            'so you can choose the pace that fits your routine.',
            { align: 'justify' }
        );
    doc.moveDown(1);

    programs.forEach(program => {
        // Program name
        doc.fontSize(12).font('Helvetica-Bold').text(program.name);
        doc.moveDown(0.3);

        // Weekday row
        doc.fontSize(11).font('Helvetica')
            .text(
                `  Weekday Batch  :  ${program.weekday.hoursPerDay} hours/day  ×  ` +
                `${program.weekday.daysPerWeek} days/week  ×  ${program.weekday.weeks} weeks  ` +
                `=  ${program.weekday.totalHours} total hours  (Mon – Fri)`
            );

        // Weekend row
        doc.fontSize(11).font('Helvetica')
            .text(
                `  Weekend Batch  :  ${program.weekend.hoursPerDay} hours/day  ×  ` +
                `${program.weekend.daysPerWeek} days/week  ×  ${program.weekend.weeks} weeks  ` +
                `=  ${program.weekend.totalHours} total hours  (Sat + Sun)`
            );
        doc.moveDown(0.8);
    });

    doc.moveDown(0.5);

    // ── Career Outcomes ──────────────────────────────────────────────────
    doc.fontSize(15).font('Helvetica-Bold').text('Career Outcomes', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica')
        .text(
            `By the end of this track, you will have built a verifiable portfolio of projects ` +
            `that recruiters value over traditional theoretical exams. ` +
            `Our students have gone on to roles at top tech companies across India and abroad.`,
            { align: 'justify' }
        );
    doc.moveDown(2);

    // ── Footer CTA ───────────────────────────────────────────────────────
    doc.fontSize(13).font('Helvetica-Bold')
        .fillColor('blue')
        .text('Enroll today at SkillCred.com/enroll', { align: 'center' });

    doc.end();
    console.log(`✓ Generated ${stream.file}`);
});
