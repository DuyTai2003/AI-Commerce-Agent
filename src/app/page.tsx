"use client";

import { InputPanel } from "@/components/dashboard/InputPanel";
import {
  OutputPanel,
  OutputPanelEmpty,
  OutputPanelSkeleton,
  OutputPanelError,
} from "@/components/dashboard/OutputPanel";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { useProcessText } from "@/hooks/useProcessText";
import { useAnalyzeImage } from "@/hooks/useAnalyzeImage";
import type { Tone, SloganTone, ImageSloganOutput } from "@/lib/types";
import { useI18n } from "@/lib/i18n/I18nContext";
import { Sparkles } from "lucide-react";

export default function Home() {
  const { state, process, reset } = useProcessText();
  const { analyze } = useAnalyzeImage();
  const { t } = useI18n();

  const handleSubmit = (
    rawText: string,
    tone: Tone
  ) => {
    process(rawText, tone);
  };

  const handleImageAnalyze = async (file: File, tone: SloganTone): Promise<ImageSloganOutput | null> => {
    return analyze(file, tone);
  };

  return (
    <div className="space-y-8">
      {/* Hero / Description */}
      <div className="text-center space-y-2 py-4">
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
          {t("hero.title")}
        </h2>
        <p className="text-sm text-[var(--color-muted-foreground)] max-w-lg mx-auto">
          {t("hero.description")}
        </p>
      </div>

      {/* Input Panel */}
      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
        <InputPanel onSubmit={handleSubmit} isLoading={state.status === "loading"} />
      </section>

      {/* Output Panel */}
      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
        {state.status === "idle" && <OutputPanelEmpty />}
        {state.status === "loading" && <OutputPanelSkeleton />}
        {state.status === "error" && (
          <OutputPanelError message={state.error || t("output.error_title")} />
        )}
        {state.status === "success" && state.data && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
                {t("output.result_title")}
              </h3>
              <button
                onClick={reset}
                className="text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
              >
                {t("output.new_product")}
              </button>
            </div>
            <OutputPanel data={state.data} />
          </div>
        )}
      </section>

      {/* Image Upload Section */}
      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
          <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
            {t("image.title")}
          </h3>
        </div>
        <p className="text-xs text-[var(--color-muted-foreground)] mb-4">
          {t("image.description")}
        </p>
        <ImageUpload onAnalyze={handleImageAnalyze} />
      </section>
    </div>
  );
}
