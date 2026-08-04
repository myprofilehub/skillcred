import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// Define the challenge type matching the frontend
type Difficulty = 'Warm-up' | 'Arena'
type Round = 'A' | 'B'
type Stream = 'fullstack' | 'aiml' | 'mobile'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  round: Round
  stream: Stream
  weekNumber: number
  tags: string[]
  problemStatement: string
  expectedOutput: string
  skills: string[]
}

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Missing GEMINI_API_KEY environment variable.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function main() {
  const dataPath = path.join(__dirname, '../lib/challenges.json');
  let existingData: Challenge[] = [];
  
  if (fs.existsSync(dataPath)) {
    existingData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  }

  // Determine what week and round we should generate next
  // Find the highest week number in existing data
  const highestWeek = existingData.reduce((max, c) => Math.max(max, c.weekNumber), 0);
  
  // Decide round based on day of week this script is run
  // (Assuming it runs Sunday for Round A and Wednesday for Round B via cron)
  const todayDow = new Date().getUTCDay(); // 0=Sun, 1=Mon, ...
  
  let targetRound: Round = 'A';
  let targetWeek = highestWeek;

  if (todayDow === 0 || todayDow === 1) { // Sun/Mon run -> Tuesday Round A
    targetRound = 'A';
    // If we just finished a full week, increment week number
    if (highestWeek === 0 || existingData.some(c => c.weekNumber === highestWeek && c.round === 'B')) {
      targetWeek = highestWeek + 1;
    }
  } else { // Wed/Thu run -> Friday Round B
    targetRound = 'B';
    targetWeek = Math.max(1, highestWeek);
  }

  const difficulty = targetRound === 'A' ? 'Warm-up' : 'Arena';
  const duration = targetRound === 'A' ? '2 hours' : '4-6 hours';

  console.log(`Generating Week ${targetWeek}, Round ${targetRound} (${difficulty})`);

  const prompt = `
You are an expert technical interviewer and software engineering instructor.
Generate 3 distinct coding challenges for a hackathon-style "Code Arena".

Context for the challenges:
- Difficulty: ${difficulty} (Time budget: ${duration})
- Target Round: Round ${targetRound}

Please generate exactly 1 challenge for each of these 3 streams:
1. 'fullstack' (Node.js, React, databases, system design)
2. 'aiml' (Python, machine learning, data science, GenAI)
3. 'mobile' (React Native, iOS, Android, mobile architecture)

Return the output strictly as a JSON array of 3 objects matching this exact TypeScript interface:
interface Challenge {
  id: string // generate a unique id like fs-w${targetWeek}-${targetRound.toLowerCase()}, ai-w${targetWeek}-${targetRound.toLowerCase()}, mob-w${targetWeek}-${targetRound.toLowerCase()}
  title: string
  description: string // 1 sentence catchy description
  difficulty: '${difficulty}'
  round: '${targetRound}'
  stream: 'fullstack' | 'aiml' | 'mobile'
  weekNumber: ${targetWeek}
  tags: string[] // 3-4 technical tags
  problemStatement: string // Detailed paragraph explaining the problem to solve
  expectedOutput: string // Concrete definition of done (e.g. "GitHub repo with docker-compose" or "Working Expo snack")
  skills: string[] // 3-4 skills practiced
}
`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = result.response.text();
    const newChallenges: Challenge[] = JSON.parse(responseText);

    if (!Array.isArray(newChallenges) || newChallenges.length !== 3) {
      throw new Error("Invalid output format from LLM");
    }

    // Optional: Prune old challenges (Keep last 3 weeks = 18 challenges)
    // Keep challenges where weekNumber > targetWeek - 3
    let updatedData = existingData.filter(c => c.weekNumber > targetWeek - 3);
    
    // Add new ones
    updatedData = [...updatedData, ...newChallenges];

    // Write back to file
    fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));
    
    console.log(`Successfully generated and saved ${newChallenges.length} challenges for Week ${targetWeek} Round ${targetRound}.`);
  } catch (err) {
    console.error("Error generating challenges:", err);
    process.exit(1);
  }
}

main();
