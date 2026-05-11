"use client";

import { Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nContext";
import { LanguageSwitcher } from "@/components/dashboard/LanguageSelector";

export function Header() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
            <Sparkles className="h-4 w-4 text-[var(--color-primary-foreground)]" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[var(--color-foreground)] leading-none">
              {t("app.name")}
            </h1>
            <p className="text-[11px] text-[var(--color-muted-foreground)] leading-none mt-0.5">
              {t("app.tagline")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
