require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function main() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // We can't easily list models via the SDK v0.24 unless we do a REST call,
  // let's just do a fetch to the REST API.
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
  const json = await res.json();
  console.log(json.models.map(m => m.name).join("\n"));
}
main();
