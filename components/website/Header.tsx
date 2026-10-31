"use client";

import { sectionIds, siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { useActiveSection } from "../shared/hooks";
import { LanguageSwitch } from "../shared/ui";
import { PhoneIcon } from "../shared/Icons";
import { Logo } from "../shared/Logo";

export function Header() {
  const { t } = useLanguage();
  const active = useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[var(--header-h)] border-b border-line bg-milk/95 text-cocoa backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-6 xl:px-8">
        <a href="#home" aria-label={t.a11y.home} className="group flex shrink-0 items-center gap-2.5 rounded-full">
          <Logo eager className="size-12 shrink-0 transition-transform duration-500 group-hover:scale-105" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-extrabold">{siteConfig.shortName}</span>
            <span className="mt-0.5 text-xs text-cocoa-soft">бөбекжай-бақшасы</span>
          </span>
        </a>

        <nav aria-label={t.a11y.mainNav} className="ml-auto">
          <ul className="flex items-center gap-0.5">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  className={`block rounded-full px-2.5 py-2 text-[0.85rem] font-medium whitespace-nowrap transition-colors xl:px-3 xl:text-[0.9rem] ${
                    active === id ? "bg-sun text-cocoa" : "text-cocoa-soft hover:bg-sun-soft hover:text-cocoa"
                  }`}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitch className="shrink-0" />

        <a
          href={siteConfig.phone.href}
          className="hidden shrink-0 items-center gap-2 rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-terracotta-deep hover:shadow-lift min-[1280px]:flex"
        >
          <PhoneIcon className="size-4" />
          {siteConfig.phone.display}
        </a>
      </div>
    </header>
  );
}
