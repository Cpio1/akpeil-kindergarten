"use client";

import { mainPhoto } from "@/lib/photos";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { PhotoFrame } from "../shared/PhotoFrame";
import { Cloud, Flower, Star, Sun } from "../shared/Decor";

/** Формы плашек с фактами — у каждой своя. */
const factShapes = [
  "rounded-[28px_28px_28px_8px] bg-sun",
  "shape-pebble bg-apricot",
  "rounded-[8px_28px_28px_28px] bg-sage",
  "rounded-full bg-coral-soft",
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-[var(--header-h)]">
      <Cloud className="absolute top-[calc(var(--header-h)+2.5rem)] left-[3%] w-28 animate-sway" />
      <Star className="absolute bottom-16 left-[44%] size-5 animate-twinkle" color="#F47C60" />

      <div className="mx-auto grid max-w-6xl grid-cols-[1.08fr_0.92fr] items-center gap-10 px-6 py-10 xl:px-8 min-[1400px]:py-14">
        <div className="relative z-10">
          <h1 id="hero-title">
            <span className="inline-flex items-center gap-2 rounded-full bg-sun-soft px-4 py-1.5 font-sans text-sm font-semibold text-terracotta-deep">
              <Flower className="size-4" />
              {siteConfig.name}
            </span>
            <span className="mt-4 block text-[2.6rem] leading-[1.12] font-extrabold text-cocoa xl:text-[2.9rem]">
              {t.hero.title}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cocoa-soft">{t.hero.text}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#contacts"
              className="rounded-full bg-terracotta px-7 py-3.5 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-terracotta-deep hover:shadow-lift"
            >
              {t.hero.primary}
            </a>
            <a
              href="#about"
              className="rounded-full border-2 border-terracotta bg-milk px-7 py-3 font-semibold text-terracotta-deep transition hover:-translate-y-0.5 hover:bg-coral-tint"
            >
              {t.hero.secondary}
            </a>
          </div>

          <ul className="mt-9 grid max-w-xl grid-cols-4 gap-3">
            {t.hero.facts.map((fact, i) => (
              <li key={fact.label} className={`flex flex-col items-center justify-center px-2 py-3.5 text-center ${factShapes[i]}`}>
                <span className="font-display text-xl leading-tight font-extrabold">{fact.value}</span>
                <span className="text-sm leading-snug font-medium text-cocoa">{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem]">
          {/* Мягкая подложка-облако за аркой */}
          <div aria-hidden="true" className="shape-blob absolute -inset-x-6 top-10 -bottom-4 bg-apricot" />
          <Sun className="absolute -top-5 -right-8 z-10 size-24 animate-spin-slow" />
          <Flower className="absolute -bottom-3 -left-8 z-10 size-14 animate-spin-slow" color="#F47C60" />
          <Star className="absolute top-1/3 -left-10 size-6 animate-twinkle" color="#A8C69F" />
          <PhotoFrame
            photo={mainPhoto}
            alt={t.hero.photoAlt}
            pendingLabel={t.about.photoPending}
            sizes="(min-width: 1280px) 416px, 34vw"
            eager
            containPadding="p-[11%]"
            className="shape-arch aspect-square max-h-[calc(100svh-var(--header-h)-7rem)] min-h-[20rem] w-full shadow-lift"
          />
        </div>
      </div>
    </section>
  );
}
