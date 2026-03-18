const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

async function extract() {
    console.log("Extracting...");
    const filePath = path.join(__dirname, "../uploads/Skillcred Blueprint.docx");
    const result = await mammoth.extractRawText({path: filePath});
    const text = result.value; // The raw text
    fs.writeFileSync(path.join(__dirname, "../uploads/blueprint-text.txt"), text);
    console.log("Extracted " + text.length + " characters.");
}

extract().catch(console.error);
