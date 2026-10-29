"use client";

import Image from "next/image";
import { GALLERY_INITIAL, galleryPhotos } from "@/lib/photos";
import { useLanguage } from "../shared/LanguageProvider";
import { Lightbox } from "../shared/Lightbox";
import { PhotoPlaceholder } from "../shared/PhotoFrame";
import { Reveal } from "../shared/Reveal";
import { useGalleryState } from "../shared/ui";
import { ChevronDownIcon } from "../shared/Icons";
import { Cloud, Star } from "../shared/Decor";

/** Несколько вариантов скругления — разнообразие без ущерба для снимков. */
const tileShapes = [
  "rounded-[28px]",
  "rounded-[64px_64px_24px_24px]",
  "rounded-[24px_64px_24px_64px]",
  "rounded-[64px_24px_64px_24px]",
  "rounded-[24px_24px_64px_64px]",
  "rounded-[28px]",
];

export function Gallery() {
  const { t } = useLanguage();
  const total = galleryPhotos.length;
  const { expanded, toggle, visibleCount, canExpand, openIndex, setOpenIndex, itemRefs, sectionRef } = useGalleryState(
    total,
    GALLERY_INITIAL.desktop,
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-hidden bg-sun-soft py-12 min-[1400px]:py-16"
    >
      <Cloud className="absolute top-3 right-[24%] w-20 animate-sway" />
      <Star className="absolute top-8 left-[3%] size-6 animate-twinkle" color="#F47C60" />

      <div className="mx-auto max-w-6xl px-6 xl:px-8">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="text-sm font-semibold text-terracotta-deep">{t.gallery.eyebrow}</p>
            <h2 id="gallery-title" className="mt-2 text-3xl leading-tight font-extrabold xl:text-[2.1rem]">
              {t.gallery.title}
            </h2>
          </Reveal>
          {canExpand && (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={expanded}
              aria-controls="gallery-list"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-terracotta bg-milk px-6 py-3 font-semibold text-terracotta-deep transition hover:-translate-y-0.5 hover:bg-coral-tint"
            >
              {expanded ? t.gallery.showLess : t.gallery.showMore}
              <ChevronDownIcon className={`size-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>

        {total === 0 ? (
          <ul className="mt-7 grid grid-cols-3 gap-5">
            {tileShapes.map((shape, i) => (
              <li key={i} className={`relative aspect-[4/3] max-h-[calc((100svh-var(--header-h)-15rem)/2)] w-full overflow-hidden ${shape}`}>
                <PhotoPlaceholder label={t.gallery.placeholder} compact />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <ul id="gallery-list" className="mt-7 grid grid-cols-3 gap-5">
              {galleryPhotos.slice(0, visibleCount).map((photo, i) => (
                <li key={photo.src}>
                  <button
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={t.gallery.openPhoto(i + 1)}
                    aria-haspopup="dialog"
                    className={`group relative block aspect-[4/3] max-h-[calc((100svh-var(--header-h)-15rem)/2)] w-full overflow-hidden bg-apricot-soft shadow-soft transition hover:-translate-y-1 hover:shadow-lift ${tileShapes[i % tileShapes.length]}`}
                  >
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 370px, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ objectPosition: photo.position }}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <Lightbox photos={galleryPhotos} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
          </>
        )}
      </div>
    </section>
  );
}
