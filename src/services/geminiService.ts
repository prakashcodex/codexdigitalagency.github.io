import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getChatResponse(message: string, history: any[]) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are 'Codex AI Buddy', a helpful assistant for Codex Digital Academy. Codex Digital Academy provides a 1-year transformation program for students to learn AI, Digital Skills, English Communication, and Mindset Development. The program costs ₹12,000. It features 100% LIVE interactive classes and a 52-week curriculum. You should answer questions about the academy and help students understand the value of future-proof skills.",
    },
    history: history,
  });

  const result = await chat.sendMessage({ message: message });
  return result.text;
}
