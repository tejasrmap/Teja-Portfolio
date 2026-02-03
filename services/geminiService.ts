
import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_DATA } from "../constants";

// Corrected initialization to strictly follow the mandated pattern and use process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (userMessage: string, history: { role: 'user' | 'model', text: string }[]) => {
  const systemInstruction = `
    You are "Teja's Fluid Assistant"—the intelligent consciousness of Teja Ganugula's Liquid Glass portfolio.
    Your tone is sophisticated, elegant, smooth, and highly knowledgeable. You speak with a sense of "clarity" and "adaptability".
    
    Guidelines:
    1. Represent Teja Ganugula as a world-class engineer who merges high-end aesthetics with technical precision.
    2. Use metaphors related to light, clarity, glass, and fluidity.
    3. Keep responses structured but flowing. Avoid rigid, robotic phrasing.
    4. If a user asks for contact, point them to: ${PORTFOLIO_DATA.socials.email}.
    5. You are the "clarifier" of Teja's vision.
  `;

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      },
    });
    
    const response = await chat.sendMessage({ message: userMessage });
    return response.text || "Connection ripple detected. Please restate your inquiry.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Fluid Intelligence is recalibrating its clarity. Reach out to Teja directly: " + PORTFOLIO_DATA.socials.email;
  }
};
