"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { dictionaries, languages, type Dictionary, type Lang } from "@/lib/translations";

const STORAGE_KEY = "akpeil-lang";
const DEFAULT_LANG: Lang = "kk";
const listeners = new Set<() => void>();
/** Выбранный язык в памяти — на случай, если localStorage недоступен. */
let currentLang: Lang | null = null;

function readLang(): Lang {
  if (currentLang) return currentLang;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "ru" || stored === "kk" ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

function subscribe(listener: () => void) {
  // Смена языка в соседней вкладке.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    currentLang = null;
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

type LanguageContextValue = { lang: Lang; t: Dictionary; setLang: (lang: Lang) => void };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => DEFAULT_LANG);

  const setLang = useCallback((next: Lang) => {
    currentLang = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Хранилище недоступно (приватный режим) — язык не запомнится после перезагрузки.
    }
    listeners.forEach((listener) => listener());
  }, []);

  const t = dictionaries[lang];

  useEffect(() => {
    document.documentElement.lang = languages.find((item) => item.code === lang)?.htmlLang ?? "kk";
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [lang, t]);

  return <LanguageContext.Provider value={{ lang, t, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
