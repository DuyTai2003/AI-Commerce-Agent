"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nContext";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md
        bg-[var(--color-accent)] text-[var(--color-muted-foreground)]
        hover:bg-[var(--color-border)] transition-colors duration-150"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-[var(--color-success)]" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      {copied ? t("copy.copied") : (label || t("copy.button"))}
    </button>
  );
}
