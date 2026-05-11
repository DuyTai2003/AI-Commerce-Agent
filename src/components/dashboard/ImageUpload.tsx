"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Sparkles, Loader2, ImageIcon } from "lucide-react";
import type { SloganTone, ImageSloganOutput } from "@/lib/types";
import { SLOGAN_TONE_OPTIONS } from "@/lib/types";
import { CopyButton } from "./CopyButton";
import { useI18n } from "@/lib/i18n/I18nContext";

interface ImageUploadProps {
  onAnalyze: (file: File, tone: SloganTone) => Promise<ImageSloganOutput | null>;
}

export function ImageUpload({ onAnalyze }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tone, setTone] = useState<SloganTone>("humorous");
  const [status, setStatus] = useState<"idle" | "analyzing" | "success" | "error">("idle");
  const [result, setResult] = useState<ImageSloganOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError(t("image.limit"));
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(t("image.limit"));
      return;
    }
    setError(null);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setStatus("idle");
  }, [t]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const handleAnalyze = async () => {
    if (!file) return;
    setStatus("analyzing");
    setError(null);
    const data = await onAnalyze(file, tone);
    if (data) {
      setResult(data);
      setStatus("success");
    } else {
      setError(t("output.error_title"));
      setStatus("error");
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setStatus("idle");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all duration-150 ${
            dragOver
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
              : "border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-muted)]/50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
            className="hidden"
          />
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-muted)] mb-4">
            <Upload className="h-6 w-6 text-[var(--color-muted-foreground)]" />
          </div>
          <h4 className="text-sm font-medium text-[var(--color-foreground)] mb-1">
            {t("image.dropzone")}
          </h4>
          <p className="text-xs text-[var(--color-muted-foreground)]">
            {t("image.limit")}
          </p>
        </div>
      ) : (
        /* Preview + Controls */
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-[var(--color-border)]">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-80 object-contain bg-[var(--color-muted)]"
            />
            <button
              onClick={reset}
              className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tone Selector */}
          <div>
            <label className="text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider mb-2 block">
              {t("image.tone_label")}
            </label>
            <div className="flex gap-2">
              {SLOGAN_TONE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setTone(opt.value); setResult(null); setStatus("idle"); }}
                  className={`flex-1 rounded-lg border px-3 py-2 text-left transition-all duration-150 ${
                    tone === opt.value
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                      : "border-[var(--color-border)] hover:border-[var(--color-primary)]/30"
                  }`}
                >
                  <span className="text-sm">{opt.icon}</span>{" "}
                  <span className={`text-xs font-medium ${tone === opt.value ? "text-[var(--color-primary)]" : ""}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={status === "analyzing"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[var(--color-primary)]/90 disabled:opacity-50"
          >
            {status === "analyzing" ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> {t("image.analyzing")}</>
            ) : (
              <><Sparkles className="h-4 w-4" /> {t("image.analyze")}</>
            )}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Results */}
      {status === "success" && result && (
        <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-[var(--color-primary)]" />
            <h4 className="text-sm font-semibold text-[var(--color-foreground)]">
              {result.productName}
            </h4>
            <span className="text-[11px] text-[var(--color-muted-foreground)] bg-[var(--color-muted)] px-2 py-0.5 rounded-full">
              {result.style}
            </span>
          </div>

          {/* Slogans */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">
                {t("image.slogan_label")}
              </span>
              <CopyButton text={result.slogans.join("\n")} label={t("copy.all")} />
            </div>
            {result.slogans.map((slogan, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-[var(--color-muted)] px-4 py-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[11px] font-semibold text-[var(--color-primary)]">
                  {i + 1}
                </span>
                <p className="flex-1 text-sm text-[var(--color-foreground)]">{slogan}</p>
                <CopyButton text={slogan} />
              </div>
            ))}
          </div>

          {/* Keywords */}
          <div>
            <span className="text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">
              {t("image.keywords_label")}
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {result.keywords.map((kw, i) => (
                <span key={i} className="rounded-full bg-[var(--color-muted)] px-2.5 py-1 text-[11px] text-[var(--color-muted-foreground)]">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
