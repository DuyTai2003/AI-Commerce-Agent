"use client";

import { useState, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import type { Tone } from "@/lib/types";
import { ToneSelector } from "./ToneSelector";
import { useI18n } from "@/lib/i18n/I18nContext";

interface InputPanelProps {
  onSubmit: (rawText: string, tone: Tone) => void;
  isLoading: boolean;
}

export function InputPanel({ onSubmit, isLoading }: InputPanelProps) {
  const [rawText, setRawText] = useState("");
  const [tone, setTone] = useState<Tone>("humorous");
  const { t } = useI18n();

  // Nhận dữ liệu từ bookmarklet qua query param ?feed=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const feedData = params.get("feed");
    if (feedData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(feedData));
        if (parsed.rawText) {
          setRawText(parsed.rawText);
          // Xóa query param khỏi URL sau khi đã đọc
          window.history.replaceState({}, "", window.location.pathname);
        }
      } catch {
        // ignore invalid feed data
      }
    }
  }, []);

  const handleSubmit = () => {
    if (rawText.trim().length >= 50) {
      onSubmit(rawText, tone);
    }
  };

  const charCount = rawText.trim().length;
  const isValid = charCount >= 50;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">
            {t("input.tone_label")}
          </label>
        </div>
        <ToneSelector value={tone} onChange={setTone} />
      </div>

      <div className="relative">
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder={t("input.placeholder")}
          className="w-full h-48 resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]/30 focus:border-[var(--color-primary)]/30 transition-all duration-150"
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3">
          <span
            className={`text-[11px] ${
              isValid
                ? "text-[var(--color-success)]"
                : charCount > 0
                  ? "text-[var(--color-destructive)]"
                  : "text-[var(--color-muted-foreground)]"
            }`}
          >
            {charCount}{t("input.char_count")}
          </span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid || isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary-foreground)] shadow-sm transition-all duration-150 hover:bg-[var(--color-primary)]/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("input.processing")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t("input.submit")}
          </>
        )}
      </button>
    </div>
  );
}
