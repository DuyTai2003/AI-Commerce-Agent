import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemPrompt, getSloganPrompt } from "./prompts";
import type { ProductOutput, Tone, ImageSloganOutput, SloganTone } from "./types";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function analyzeProductImage(
  base64Image: string,
  mimeType: string,
  tone: SloganTone
): Promise<ImageSloganOutput> {
  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 2048,
    },
  });

  const systemPrompt = getSloganPrompt(tone);

  const result = await model.generateContent([
    { text: systemPrompt },
    {
      inlineData: {
        mimeType,
        data: base64Image,
      },
    },
  ]);

  const responseText = result.response.text();

  let jsonStr = responseText.trim();
  if (jsonStr.startsWith("```json")) {
    jsonStr = jsonStr.slice(7);
  } else if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.slice(3);
  }
  if (jsonStr.endsWith("```")) {
    jsonStr = jsonStr.slice(0, -3);
  }
  jsonStr = jsonStr.trim();

  const parsed = JSON.parse(jsonStr) as ImageSloganOutput;

  if (!parsed.productName || !parsed.slogans || !parsed.style || !parsed.keywords) {
    throw new Error("Gemini image response missing required fields");
  }

  if (!Array.isArray(parsed.slogans) || parsed.slogans.length < 3) {
    throw new Error("Expected at least 3 slogans from image analysis");
  }

  return parsed;
}

export async function processProductData(
  rawText: string,
  tone: Tone
): Promise<ProductOutput> {
  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 4096,
    },
  });

  // Mặc định luôn dịch sang tiếng Việt
  const systemPrompt = getSystemPrompt(tone);

  const fullPrompt = `${systemPrompt}

DỮ LIỆU THÔ TỪ 1688:
"""
${rawText}
"""

Hãy xử lý dữ liệu trên và trả về JSON theo đúng format yêu cầu. CHỈ TRẢ VỀ JSON, KHÔNG thêm bất kỳ text nào khác.`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    // Parse JSON from response (handle possible markdown code blocks)
    let jsonStr = text.trim();

    // Remove markdown code fences if present
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.slice(7);
    } else if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith("```")) {
      jsonStr = jsonStr.slice(0, -3);
    }
    jsonStr = jsonStr.trim();

    const parsed = JSON.parse(jsonStr) as ProductOutput;

    // Validate required fields
    if (!parsed.specs || !parsed.description || !parsed.titles || !parsed.category || !parsed.keywords) {
      throw new Error("Gemini response missing required fields");
    }

    if (!Array.isArray(parsed.titles) || parsed.titles.length < 3) {
      throw new Error("Expected at least 3 titles in response");
    }

    if (!Array.isArray(parsed.keywords) || parsed.keywords.length < 5) {
      throw new Error("Expected at least 5 keywords in response");
    }

    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Failed to parse Gemini JSON response: ${error.message}`);
    }
    throw error;
  }
}
