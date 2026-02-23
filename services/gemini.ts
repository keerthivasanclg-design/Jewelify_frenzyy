
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Fix: Simplified initialization to use the environment variable directly.
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getAuraResponse = async (
  prompt: string,
  base64Image?: string
): Promise<{ text: string; sources?: { title: string; uri: string }[] }> => {
  // Fix: Create a fresh instance for the call to ensure correct state.
  const ai = getAIClient();
  const model = "gemini-3-flash-preview";

  const systemInstruction = `You are "Aura", the elite AI concierge for "Aura Jewelry Atelier". 
  Your tone is sophisticated, knowledgeable, and helpful. 
  You specialize in:
  1. Identifying jewelry styles from images of outfits.
  2. Recommending jewelry based on skin tone, occasion (weddings, galas, daily wear), and current trends.
  3. Explaining gemstones and precious metals.
  
  If the user asks about current trends, use your internal search capabilities to provide up-to-date fashion advice.
  Always be concise and elegant in your responses.`;

  try {
    const parts: any[] = [{ text: prompt }];
    if (base64Image) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      });
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    // Fix: Access the .text property directly (not a method).
    const text = response.text || "I apologize, but I am unable to process that request right now.";
    // Fix: Extracted grounding sources correctly as per guidelines.
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '#'
    })) || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "I'm having a brief moment of reflection. Please try again in a moment." };
  }
};
