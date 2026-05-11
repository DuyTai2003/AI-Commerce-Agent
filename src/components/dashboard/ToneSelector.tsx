"use client";

import type { Tone } from "@/lib/types";
import { TONE_OPTIONS } from "@/lib/types";

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="flex gap-2">
      {TONE_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 rounded-lg border px-3 py-2.5 text-left transition-all duration-150 ${
            value === option.value
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-sm"
              : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)]/30"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-base">{option.icon}</span>
            <span
              className={`text-xs font-medium ${
                value === option.value
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-foreground)]"
              }`}
            >
              {option.label}
            </span>
          </div>
          <p className="mt-0.5 text-[10px] text-[var(--color-muted-foreground)] leading-tight">
            {option.desc}
          </p>
        </button>
      ))}
    </div>
  );
}
