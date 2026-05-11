"use client";

import { useState } from "react";
import type { ProcessingState, ProductOutput, Tone } from "@/lib/types";

export function useProcessText() {
  const [state, setState] = useState<ProcessingState>({
    status: "idle",
    data: null,
    error: null,
  });

  const process = async (
    rawText: string,
    tone: Tone
  ) => {
    setState({ status: "loading", data: null, error: null });

    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText, tone }),
      });

      const result = await response.json();

      if (!response.ok) {
        setState({
          status: "error",
          data: null,
          error: result.error || "Có lỗi xảy ra.",
        });
        return;
      }

      setState({
        status: "success",
        data: result.data as ProductOutput,
        error: null,
      });
    } catch {
      setState({
        status: "error",
        data: null,
        error: "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.",
      });
    }
  };

  const reset = () => {
    setState({ status: "idle", data: null, error: null });
  };

  return { state, process, reset };
}
