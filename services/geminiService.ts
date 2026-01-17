import { GoogleGenAI } from "@google/genai";
import { AspectRatio, ImageStyle } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an image based on the prompt and configuration.
 */
export const generateImage = async (
  prompt: string,
  style: ImageStyle,
  aspectRatio: AspectRatio,
  quality: 'standard' | 'high'
): Promise<string> => {
  try {
    // Construct a rich prompt based on style
    const enhancedPrompt = `Generate an image with the following description: "${prompt}". 
    Style: ${mapStyleToEnglish(style)}. 
    Ensure high quality, detailed, and visually appealing results.`;

    // Select model based on quality/request
    // As per guidelines: 'gemini-2.5-flash-image' for general, 'gemini-3-pro-image-preview' for high quality
    const modelId = quality === 'high' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          { text: enhancedPrompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          // imageSize is only for pro model, but let's leave it default (1K) for compatibility
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};

// Helper to translate Arabic styles to English for the model prompt
const mapStyleToEnglish = (style: ImageStyle): string => {
  switch (style) {
    case ImageStyle.REALISTIC: return "Photorealistic, highly detailed, 8k";
    case ImageStyle.ANIME: return "Anime style, Japanese animation, vibrant";
    case ImageStyle.CINEMATIC: return "Cinematic lighting, movie scene, dramatic";
    case ImageStyle.ILLUSTRATION: return "Digital illustration, artstation, smooth";
    case ImageStyle.SIMPLE: return "Minimalist, simple lines, clean";
    case ImageStyle.ABSTRACT: return "Abstract art, surreal, conceptual";
    case ImageStyle.CLASSIC: return "Classic art, oil painting style, museum quality";
    case ImageStyle.NEON: return "Neon lights, cyberpunk, glowing, dark background";
    case ImageStyle.CYBERPUNK: return "Cyberpunk, futuristic, high tech";
    case ImageStyle.OIL_PAINTING: return "Oil painting, textured, canvas";
    default: return "Photorealistic";
  }
};