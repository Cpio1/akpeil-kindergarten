"use client";

import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { CurrentYear } from "../shared/ui";
import { Sun } from "../shared/Decor";
import { MobileHeader } from "./MobileHeader";
import { MobileHero } from "./MobileHero";
import { MobileAbout } from "./MobileAbout";
import { MobileGroupsMeals } from "./MobileGroupsMeals";
import { MobileGallery } from "./MobileGallery";
import { MobileDocuments } from "./MobileDocuments";
import { MobileContacts } from "./MobileContacts";

/** Версия сайта для телефона и планшета (ширина до 1023 px). */
export function MobileWebsite() {
  const { t } = useLanguage();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-terracotta px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {t.a11y.skipToContent}
      </a>
      <MobileHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <MobileHero />
        <MobileAbout />
        <MobileGroupsMeals />
        <MobileGallery />
        <MobileDocuments />
        <MobileContacts />
      </main>
      <footer className="bg-cocoa text-milk">
        <div className="mx-auto max-w-2xl px-4 py-6 text-center">
          <p className="flex items-center justify-center gap-2 font-display font-bold">
            <Sun className="size-6" />
            {siteConfig.name}
          </p>
          <p className="mt-1.5 text-sm text-milk">
            © <CurrentYear /> · {t.footer.note}
          </p>
        </div>
      </footer>
    </>
  );
}
