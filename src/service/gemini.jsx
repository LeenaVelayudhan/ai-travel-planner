import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables (same as your trip generation)
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Define the model (this is what you asked about!)
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", // Your model name
});

// Configuration for responses
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",, // Changed to plain text for chatbot simplicity
};

// Create a chat session (no predefined history for the chatbot)
export const chatSession = model.startChat({
  generationConfig,
  history: [], // Empty history; we'll add messages dynamically
});