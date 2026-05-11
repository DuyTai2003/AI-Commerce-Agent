import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSloganPrompt } from "@/lib/prompts";
import type { ImageSloganOutput, SloganTone } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;
    const tone = (formData.get("tone") as SloganTone) || "humorous";

    if (!imageFile) {
      return NextResponse.json(
        { error: "Thiếu file ảnh. Vui lòng upload ảnh sản phẩm." },
        { status: 400 }
      );
    }

    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File không phải định dạng ảnh. Vui lòng upload JPG, PNG, hoặc WebP." },
        { status: 400 }
      );
    }

    if (imageFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ảnh quá lớn. Vui lòng upload ảnh dưới 10MB." },
        { status: 400 }
      );
    }

    const validTones: SloganTone[] = ["humorous", "professional", "young"];
    if (!validTones.includes(tone)) {
      return NextResponse.json(
        { error: `Phong cách không hợp lệ. Chọn: ${validTones.join(", ")}` },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Lỗi cấu hình server: Thiếu API key." },
        { status: 500 }
      );
    }

    // Convert File to base64 for Gemini Vision
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    const genAI = new GoogleGenerativeAI(apiKey);
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
          mimeType: imageFile.type,
          data: base64Image,
        },
      },
    ]);

    const responseText = result.response.text();

    // Parse JSON from response
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
      throw new Error("Gemini response missing required fields");
    }

    if (!Array.isArray(parsed.slogans) || parsed.slogans.length < 3) {
      throw new Error("Expected at least 3 slogans");
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error("Analyze image error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI trả về định dạng không hợp lệ. Vui lòng thử lại với ảnh khác." },
        { status: 502 }
      );
    }

    if (error instanceof Error) {
      if (error.message.includes("429") || error.message.includes("RESOURCE_EXHAUSTED")) {
        return NextResponse.json(
          { error: "Đã vượt quá giới hạn API. Vui lòng đợi vài giây rồi thử lại." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Lỗi không xác định khi phân tích ảnh. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
