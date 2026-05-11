"use client";

import { useState } from "react";
import type { ImageSloganOutput, SloganTone } from "@/lib/types";

export function useAnalyzeImage() {
  const [analyzing, setAnalyzing] = useState(false);

  const analyze = async (file: File, tone: SloganTone): Promise<ImageSloganOutput | null> => {
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("tone", tone);

      const response = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Analyze error:", result.error);
        return null;
      }

      return result.data as ImageSloganOutput;
    } catch (err) {
      console.error("Network error:", err);
      return null;
    } finally {
      setAnalyzing(false);
    }
  };

  return { analyze, analyzing };
}
