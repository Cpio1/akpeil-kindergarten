"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { languages } from "@/lib/translations";
import { useLanguage } from "./LanguageProvider";

/** Переключатель ҚАЗ / РУС — общий для обеих версий. */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div role="group" aria-label={t.a11y.languageSwitch} className={`flex rounded-full bg-sand p-1 ${className}`}>
      {languages.map((item) => {
        const active = item.code === lang;
        return (
          <button
            key={item.code}
            type="button"
            lang={item.htmlLang}
            aria-pressed={active}
            onClick={() => setLang(item.code)}
            className={`min-h-9 min-w-12 rounded-full px-3 text-sm font-semibold transition-colors ${
              active ? "bg-cocoa text-milk shadow-soft" : "text-cocoa hover:bg-sand-soft"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

const noopSubscribe = () => () => {};

/**
 * Текущий год для футера. В статическом HTML — год сборки,
 * в браузере сразу заменяется на текущий, поэтому всегда актуален.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => Number(process.env.NEXT_PUBLIC_BUILD_YEAR),
  );
  return <span>{year}</span>;
}

/**
 * Состояние галереи: раскрытие «Показать больше» и открытый в просмотре снимок.
 * После раскрытия фокус переходит на первый новый снимок, после сворачивания — на кнопку.
 */
export function useGalleryState(total: number, initial: number) {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const visibleCount = expanded ? total : Math.min(total, initial);
  const canExpand = total > initial;

  const toggle = () => {
    if (expanded) {
      setExpanded(false);
      // Если пользователь прокрутил далеко вниз, возвращаем его к началу галереи.
      const section = sectionRef.current;
      if (section && section.getBoundingClientRect().top < 0) section.scrollIntoView({ block: "start" });
    } else {
      setExpanded(true);
      requestAnimationFrame(() => itemRefs.current[initial]?.focus());
    }
  };

  return { expanded, toggle, visibleCount, canExpand, openIndex, setOpenIndex, itemRefs, sectionRef };
}
