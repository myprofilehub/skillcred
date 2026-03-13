import 'dotenv/config';
import fs from 'fs';
import path from 'path';
// @ts-ignore
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

async function main() {
    const filePath = path.resolve(__dirname, '..', 'uploads', 'Streamwise Syllabus.pdf');
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    // Write to a text file so we can read it
    const outPath = path.resolve(__dirname, '..', 'uploads', 'syllabus-text.txt');
    fs.writeFileSync(outPath, data.text, 'utf-8');
    console.log(`Extracted ${data.numpages} pages. Written to ${outPath}`);
    console.log(data.text.substring(0, 3000));
}

main().catch(console.error);
