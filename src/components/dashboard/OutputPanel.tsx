"use client";

import { useState } from "react";
import { FileText, ListFilter, Hash, Tags, AlertCircle } from "lucide-react";
import type { ProductOutput } from "@/lib/types";
import { CopyButton } from "./CopyButton";
import { useI18n } from "@/lib/i18n/I18nContext";

interface OutputPanelProps {
  data: ProductOutput;
}

type Tab = "specs" | "description" | "titles" | "keywords";

export function OutputPanel({ data }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const { t } = useI18n();

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "description", label: t("output.tab_description"), icon: <FileText className="h-3.5 w-3.5" /> },
    { id: "specs", label: t("output.tab_specs"), icon: <ListFilter className="h-3.5 w-3.5" /> },
    { id: "titles", label: t("output.tab_titles"), icon: <Hash className="h-3.5 w-3.5" /> },
    { id: "keywords", label: t("output.tab_keywords"), icon: <Tags className="h-3.5 w-3.5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--color-muted-foreground)]">
                {data.category}
              </span>
              <CopyButton text={data.description} label={t("copy.description")} />
            </div>
            <div className="prose prose-sm max-w-none text-[var(--color-foreground)] whitespace-pre-wrap leading-relaxed text-sm">
              {data.description}
            </div>
          </div>
        );
      case "specs":
        return (
          <div className="space-y-3">
            <CopyButton text={Object.entries(data.specs).map(([k, v]) => `${k}: ${v}`).join("\n")} label={t("copy.specs")} />
            <div className="divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] overflow-hidden">
              {Object.entries(data.specs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-card)]">
                  <span className="text-xs font-medium text-[var(--color-muted-foreground)]">
                    {key}
                  </span>
                  <span className="text-xs text-[var(--color-foreground)] text-right max-w-[60%]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case "titles":
        return (
          <div className="space-y-3">
            <CopyButton text={data.titles.join("\n")} label={t("copy.all")} />
            <div className="space-y-2">
              {data.titles.map((title, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-muted)] text-[11px] font-semibold text-[var(--color-muted-foreground)]">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--color-foreground)]">{title}</p>
                  </div>
                  <CopyButton text={title} />
                </div>
              ))}
            </div>
          </div>
        );
      case "keywords":
        return (
          <div className="space-y-3">
            <CopyButton text={data.keywords.join(", ")} label={t("copy.keywords")} />
            <div className="flex flex-wrap gap-1.5">
              {data.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-[var(--color-muted)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-muted-foreground)]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-all duration-150 border-b-2 -mb-[1px] ${
              activeTab === tab.id
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[200px]">{renderContent()}</div>

      {/* Credit: Kết nối với kinh nghiệm ngành dệt may */}
      <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
        <p className="text-[10px] text-[var(--color-muted-foreground)]/60 italic text-center">
          {t("output.powered_by")}
        </p>
      </div>
    </div>
  );
}

export function OutputPanelEmpty() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-muted)] mb-4">
        <FileText className="h-5 w-5 text-[var(--color-muted-foreground)]" />
      </div>
      <h3 className="text-sm font-medium text-[var(--color-muted-foreground)] mb-1">
        {t("output.empty_title")}
      </h3>
      <p className="text-xs text-[var(--color-muted-foreground)]/70 max-w-xs">
        {t("output.empty_description")}
      </p>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex gap-2 border-b border-[var(--color-border)] pb-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 w-16 rounded bg-[var(--color-muted)]" />
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-4 w-24 rounded bg-[var(--color-muted)]" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-[var(--color-muted)]" />
          <div className="h-3 w-[90%] rounded bg-[var(--color-muted)]" />
          <div className="h-3 w-[85%] rounded bg-[var(--color-muted)]" />
          <div className="h-3 w-[70%] rounded bg-[var(--color-muted)]" />
        </div>
      </div>
    </div>
  );
}

export function OutputPanelError({ message }: { message: string }) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
        <AlertCircle className="h-5 w-5 text-[var(--color-destructive)]" />
      </div>
      <h3 className="text-sm font-medium text-[var(--color-destructive)] mb-1">
        {t("output.error_title")}
      </h3>
      <p className="text-xs text-[var(--color-muted-foreground)] max-w-sm">
        {message}
      </p>
    </div>
  );
}
