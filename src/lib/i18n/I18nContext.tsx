"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { UILanguage } from "../types";
import { dictionaries, type TranslationKey } from "./dictionaries";

interface I18nContextType {
  lang: UILanguage;
  setLang: (lang: UILanguage) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<UILanguage>("vi");

  const t = useCallback(
    (key: TranslationKey): string => {
      return dictionaries[lang][key] ?? dictionaries.vi[key] ?? key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
