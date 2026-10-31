"use client";

import { aboutPhoto } from "@/lib/photos";
import { useLanguage } from "../shared/LanguageProvider";
import { PhotoFrame } from "../shared/PhotoFrame";
import { Reveal } from "../shared/Reveal";
import { Cloud, Flower, Star } from "../shared/Decor";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-apricot-soft py-16 min-[1400px]:py-20">
      <Cloud className="absolute top-8 right-[4%] w-24 animate-sway [animation-delay:-3s]" />

      <div className="mx-auto grid max-w-6xl grid-cols-[0.85fr_1.15fr] items-center gap-14 px-6 xl:px-8">
        <Reveal className="relative mx-auto w-full max-w-[24rem]">
          {/* Смещённая контурная фигура создаёт мягкую асимметрию */}
          <div aria-hidden="true" className="shape-petal absolute inset-0 translate-x-4 translate-y-4 border-[3px] border-coral" />
          <Flower className="absolute -top-6 -left-6 z-10 size-14 animate-spin-slow" color="#F6C453" />
          <Star className="absolute -right-7 bottom-10 size-6 animate-twinkle" color="#F47C60" />
          <PhotoFrame
            photo={aboutPhoto}
            alt={t.about.photoAlt}
            pendingLabel={t.about.photoPending}
            sizes="(min-width: 1280px) 384px, 30vw"
            containPadding="p-[7%]"
            className="shape-petal aspect-square max-h-[calc(100svh-var(--header-h)-8rem)] min-h-[18rem] w-full shadow-lift"
          />
        </Reveal>

        <Reveal delay={120}>
          <p className="text-sm font-semibold text-terracotta-deep">{t.about.eyebrow}</p>
          <h2 id="about-title" className="mt-2 text-3xl leading-tight font-extrabold xl:text-[2.1rem]">
            {t.about.title}
          </h2>
          <div className="mt-5 space-y-3.5 text-[1.05rem] leading-relaxed text-cocoa-soft">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="shape-cloud mt-6 inline-flex items-center gap-3 bg-milk px-6 py-3.5 font-display text-lg font-bold shadow-soft">
            <Flower className="size-6 shrink-0" color="#A8C69F" />
            {t.about.nameMeaning}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
