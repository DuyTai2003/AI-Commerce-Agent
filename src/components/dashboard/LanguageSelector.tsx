"use client";

import type { UILanguage } from "@/lib/types";
import { UI_LANGUAGE_OPTIONS } from "@/lib/types";
import { useI18n } from "@/lib/i18n/I18nContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex gap-1 flex-wrap">
      {UI_LANGUAGE_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => setLang(option.value)}
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-150 ${
            lang === option.value
              ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm"
              : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-border)]"
          }`}
        >
          <span className="text-sm leading-none">{option.flag}</span>
          {option.label}
        </button>
      ))}
    </div>
  );
}
