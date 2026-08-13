const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" }});
async function test() {
  const finalPrompt = `Provide a final cumulative assessment for this candidate.
They scored:
- Voice: (Wait, we can't reliably inject it here without re-fetching, assume standard).
- Empathy: Checked in Section 2.
- Video Objection Scores: [null,null,null,null,null,null] out of 5.
Provide a cumulative Score from 0 to 100, and a 2-3 sentence final feedback verdict on whether they should be hired.
Format exactly as JSON: {"score": <number>, "feedback": "<string>"}`;
  const res = await model.generateContent(finalPrompt);
  console.log(res.response.text());
}
test().catch(console.error);
