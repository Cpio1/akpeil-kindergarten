"use client";

import { useLanguage } from "../shared/LanguageProvider";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { About } from "./About";
import { GroupsMeals } from "./GroupsMeals";
import { Gallery } from "./Gallery";
import { Documents } from "./Documents";
import { Contacts } from "./Contacts";
import { Footer } from "./Footer";

/** Версия сайта для компьютера (ширина от 1024 px). */
export function Website() {
  const { t } = useLanguage();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-terracotta px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.a11y.skipToContent}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <GroupsMeals />
        <Gallery />
        <Documents />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
