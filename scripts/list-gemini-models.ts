
import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

async function main() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is not set.");
        return;
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

        console.log("Fetching models from:", url.replace(apiKey, 'HIDDEN_API_KEY'));

        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch models: ${response.status} ${response.statusText}`);
            const errorText = await response.text();
            console.error(errorText);
            return;
        }

        const data = await response.json();

        if (data.models) {
            console.log("\nAvailable Gemini Models:");
            console.log("========================");
            data.models.forEach((model: any) => {
                const name = model.name.replace('models/', '');
                const methods = model.supportedGenerationMethods?.join(', ') || 'N/A';
                console.log(`- ${name} (Methods: ${methods})`);
            });
        } else {
            console.log("No models found or unexpected response format.");
            console.log(JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

main();
