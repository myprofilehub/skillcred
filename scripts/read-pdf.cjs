const fs = require('fs');
const path = require('path');

async function main() {
    const filePath = path.resolve(__dirname, '..', 'uploads', 'PBL_Syllabus.pdf');
    const dataBuffer = fs.readFileSync(filePath);

    // Manual text extraction from PDF - parse the raw PDF content
    const text = dataBuffer.toString('utf-8', 0, dataBuffer.length);

    // Extract text between BT and ET operators (PDF text objects)
    const textParts = [];
    const matches = text.matchAll(/\(([^)]+)\)/g);
    for (const m of matches) {
        const decoded = m[1].replace(/\\n/g, '\n').replace(/\\r/g, '');
        if (decoded.length > 1 && !decoded.match(/^[\\x00-\\x1f]+$/)) {
            textParts.push(decoded);
        }
    }

    const outPath = path.resolve(__dirname, '..', 'uploads', 'syllabus-text.txt');
    const output = textParts.join(' ');
    fs.writeFileSync(outPath, output, 'utf-8');
    console.log('Written ' + textParts.length + ' text fragments to ' + outPath);
    console.log(output.substring(0, 8000));
}

main().catch(console.error);
