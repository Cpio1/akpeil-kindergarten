"use client";

import { aboutPhoto } from "@/lib/photos";
import { useLanguage } from "../shared/LanguageProvider";
import { PhotoFrame } from "../shared/PhotoFrame";
import { Reveal } from "../shared/Reveal";
import { Flower, Star } from "../shared/Decor";

export function MobileAbout() {
  const { t } = useLanguage();

  return (
    <section id="about" aria-labelledby="m-about-title" className="relative overflow-hidden bg-apricot-soft py-12">
      <div className="mx-auto max-w-2xl px-4">
        <Reveal>
          <p className="text-sm font-semibold text-terracotta-deep">{t.about.eyebrow}</p>
          <h2 id="m-about-title" className="mt-1.5 text-[1.6rem] leading-tight font-extrabold sm:text-3xl">
            {t.about.title}
          </h2>
        </Reveal>

        <Reveal className="relative mx-auto mt-6 w-[88%] max-w-sm">
          <div aria-hidden="true" className="shape-petal absolute inset-0 translate-x-3 translate-y-3 border-[3px] border-coral" />
          <Flower className="absolute -top-4 -left-4 z-10 size-10 animate-spin-slow" color="#F6C453" />
          <Star className="absolute -right-5 bottom-8 size-5 animate-twinkle" color="#F47C60" />
          <PhotoFrame
            photo={aboutPhoto}
            alt={t.about.photoAlt}
            pendingLabel={t.about.photoPending}
            sizes="(min-width: 640px) 384px, 88vw"
            className="shape-petal aspect-[4/3] w-full shadow-lift"
          />
        </Reveal>

        <Reveal className="mt-8 space-y-3 text-base leading-relaxed text-cocoa-soft">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <p className="shape-cloud mt-5 flex items-center gap-3 bg-milk px-5 py-3.5 font-display text-base font-bold shadow-soft">
          <Flower className="size-6 shrink-0" color="#A8C69F" />
          {t.about.nameMeaning}
        </p>
      </div>
    </section>
  );
}
