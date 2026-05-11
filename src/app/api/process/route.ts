import { NextResponse } from "next/server";
import { processProductData } from "@/lib/gemini";
import type { Tone, ProductOutput } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rawText, tone } = body;

    // --- Validation ---
    if (!rawText || typeof rawText !== "string") {
      return NextResponse.json(
        { error: "Thiếu dữ liệu đầu vào. Vui lòng dán text từ 1688." },
        { status: 400 }
      );
    }

    if (rawText.trim().length < 50) {
      return NextResponse.json(
        {
          error: "Nội dung quá ngắn. Vui lòng dán ít nhất 50 ký tự dữ liệu sản phẩm.",
        },
        { status: 400 }
      );
    }

    const validTones: Tone[] = ["humorous", "formal", "sensational"];

    if (!tone || !validTones.includes(tone)) {
      return NextResponse.json(
        { error: `Giọng văn không hợp lệ. Chọn: ${validTones.join(", ")}` },
        { status: 400 }
      );
    }

    // --- Process with Gemini (luôn dịch sang tiếng Việt) ---
    const result: ProductOutput = await processProductData(
      rawText.trim(),
      tone
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Process error:", error);

    if (error instanceof Error) {
      // Gemini-specific errors
      if (error.message.includes("GEMINI_API_KEY")) {
        return NextResponse.json(
          { error: "Lỗi cấu hình server: Thiếu API key." },
          { status: 500 }
        );
      }

      if (
        error.message.includes("429") ||
        error.message.includes("RESOURCE_EXHAUSTED")
      ) {
        return NextResponse.json(
          {
            error:
              "Đã vượt quá giới hạn API. Vui lòng đợi vài giây rồi thử lại.",
          },
          { status: 429 }
        );
      }

      if (error.message.includes("Failed to parse")) {
        return NextResponse.json(
          {
            error:
              "AI trả về định dạng không hợp lệ. Vui lòng thử lại với dữ liệu khác.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        { error: `Lỗi xử lý: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Lỗi không xác định. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
