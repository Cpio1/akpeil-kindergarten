"use client";

import { useEffect, useRef, useState } from "react";
import { sectionIds, siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { useActiveSection } from "../shared/hooks";
import { LanguageSwitch } from "../shared/ui";
import { CloseIcon, MenuIcon, PhoneIcon } from "../shared/Icons";
import { Sun } from "../shared/Decor";

export function MobileHeader() {
  const { t } = useLanguage();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    // Фокус ушёл за пределы шапки (Tab после последней ссылки) — закрываем меню.
    const onFocusIn = (event: FocusEvent) => {
      const header = panel?.closest("header");
      if (header && !header.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="relative z-10 flex h-[var(--header-h)] items-center gap-2 border-b border-line/70 bg-milk/95 px-4 backdrop-blur-md">
        <a href="#home" aria-label={t.a11y.home} onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2 rounded-full">
          <Sun className="size-8 shrink-0" />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-lg font-extrabold">{siteConfig.shortName}</span>
            <span className="mt-0.5 truncate text-[0.7rem] text-cocoa-soft">бөбекжай-бақшасы</span>
          </span>
        </a>

        <LanguageSwitch className="ml-auto shrink-0" />

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-cocoa text-milk shadow-soft"
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {/* Затемнение под меню — нажатие закрывает меню */}
      {open && (
        <div aria-hidden="true" onClick={() => setOpen(false)} className="fixed inset-0 top-[var(--header-h)] bg-cocoa/30" />
      )}

      <div
        ref={panelRef}
        id="mobile-menu"
        hidden={!open}
        className="relative max-h-[calc(100dvh-var(--header-h))] overflow-y-auto rounded-b-[32px] bg-milk px-4 pt-2 pb-5 shadow-lift"
      >
        <nav aria-label={t.a11y.mainNav}>
          <ul className="grid gap-1">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "location" : undefined}
                  className={`flex min-h-12 items-center rounded-2xl px-4 text-[1.05rem] font-semibold ${
                    active === id ? "bg-sand" : "hover:bg-sand-soft"
                  }`}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={siteConfig.phone.href}
          className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-5 font-semibold text-milk shadow-soft"
        >
          <PhoneIcon className="size-5" />
          {siteConfig.phone.display}
        </a>
      </div>
    </header>
  );
}
