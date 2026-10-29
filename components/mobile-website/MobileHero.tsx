"use client";

import { mainPhoto } from "@/lib/photos";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { PhotoFrame } from "../shared/PhotoFrame";
import { Cloud, Flower, Star, Sun } from "../shared/Decor";

const factShapes = [
  "rounded-[24px_24px_24px_6px] bg-sun",
  "shape-pebble bg-apricot",
  "rounded-[6px_24px_24px_24px] bg-sage",
  "rounded-[24px] bg-coral-soft",
];

export function MobileHero() {
  const { t } = useLanguage();

  return (
    <section id="home" aria-labelledby="m-hero-title" className="relative overflow-hidden pt-[var(--header-h)]">
      <Cloud className="absolute top-[calc(var(--header-h)+0.75rem)] -right-4 w-20 animate-sway" />

      <div className="mx-auto max-w-2xl px-4 pt-6 pb-10">
        <h1 id="m-hero-title">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-sun-soft px-3.5 py-1.5 font-sans text-[0.8rem] font-semibold text-terracotta-deep">
            <Flower className="size-4 shrink-0" />
            {siteConfig.name}
          </span>
          <span className="mt-3 block text-[1.85rem] leading-[1.15] font-extrabold min-[400px]:text-[2rem] sm:text-[2.4rem]">
            {t.hero.title}
          </span>
        </h1>
        <p className="mt-3 text-base leading-relaxed text-cocoa-soft sm:text-lg">{t.hero.text}</p>

        <div className="mt-5 grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 sm:flex">
          <a
            href="#contacts"
            className="flex min-h-12 items-center justify-center rounded-full bg-terracotta px-5 text-center font-semibold text-white shadow-soft active:scale-[0.98]"
          >
            {t.hero.primary}
          </a>
          <a
            href="#about"
            className="flex min-h-12 items-center justify-center rounded-full border-2 border-terracotta bg-milk px-5 text-center font-semibold text-terracotta-deep active:scale-[0.98]"
          >
            {t.hero.secondary}
          </a>
        </div>

        <div className="relative mx-auto mt-8 w-[86%] max-w-sm">
          <div aria-hidden="true" className="shape-blob absolute -inset-x-4 top-8 -bottom-3 bg-apricot" />
          <Sun className="absolute -top-4 -right-6 z-10 size-16 animate-spin-slow" />
          <Star className="absolute top-1/2 -left-6 size-5 animate-twinkle" color="#F47C60" />
          <PhotoFrame
            photo={mainPhoto}
            alt={t.hero.photoAlt}
            pendingLabel={t.about.photoPending}
            sizes="(min-width: 640px) 384px, 86vw"
            eager
            className="shape-arch aspect-[4/5] w-full shadow-lift"
          />
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {t.hero.facts.map((fact, i) => (
            <li key={fact.label} className={`flex flex-col items-center justify-center px-2 py-3 text-center ${factShapes[i]}`}>
              <span className="font-display text-lg leading-tight font-extrabold">{fact.value}</span>
              <span className="text-sm leading-snug font-medium text-cocoa">{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
