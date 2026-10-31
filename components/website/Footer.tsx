"use client";

import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { CurrentYear } from "../shared/ui";
import { Logo } from "../shared/Logo";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-cocoa text-milk">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6 xl:px-8">
        <p className="flex items-center gap-3 font-display font-bold">
          <Logo className="size-10" />
          {siteConfig.name}
        </p>
        <p className="text-sm text-milk">
          © <CurrentYear /> · {t.footer.note}
        </p>
      </div>
    </footer>
  );
}
