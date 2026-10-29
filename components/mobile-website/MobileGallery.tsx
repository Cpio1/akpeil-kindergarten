"use client";

import Image from "next/image";
import { GALLERY_INITIAL, galleryPhotos, type Photo } from "@/lib/photos";
import { useLanguage } from "../shared/LanguageProvider";
import { Lightbox } from "../shared/Lightbox";
import { PhotoPlaceholder } from "../shared/PhotoFrame";
import { Reveal } from "../shared/Reveal";
import { useGalleryState } from "../shared/ui";
import { ChevronDownIcon } from "../shared/Icons";

/** Скругления чередуются; каждый третий снимок занимает всю ширину. */
const tileShapes = [
  "rounded-[24px]",
  "rounded-[56px_56px_20px_20px]",
  "rounded-[20px_44px_20px_44px]",
  "rounded-[44px_20px_44px_20px]",
];
const isWide = (i: number) => i % 3 === 0;
/** Широкая плитка только для горизонтальных снимков — у вертикальных она обрезала бы головы. */
const isWidePhoto = (photo: Photo, i: number) => isWide(i) && photo.width > photo.height * 1.15;

export function MobileGallery() {
  const { t } = useLanguage();
  const total = galleryPhotos.length;
  const { expanded, toggle, visibleCount, canExpand, openIndex, setOpenIndex, itemRefs, sectionRef } = useGalleryState(
    total,
    GALLERY_INITIAL.mobile,
  );

  return (
    <section ref={sectionRef} id="gallery" aria-labelledby="m-gallery-title" className="bg-sun-soft py-12">
      <div className="mx-auto max-w-2xl px-4">
        <Reveal>
          <p className="text-sm font-semibold text-terracotta-deep">{t.gallery.eyebrow}</p>
          <h2 id="m-gallery-title" className="mt-1.5 text-[1.6rem] leading-tight font-extrabold sm:text-3xl">
            {t.gallery.title}
          </h2>
        </Reveal>

        {total === 0 ? (
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {tileShapes.map((shape, i) => (
              <li
                key={i}
                className={`relative overflow-hidden ${shape} ${isWide(i) ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}
              >
                <PhotoPlaceholder label={t.gallery.placeholder} compact />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <ul id="gallery-list" className="mt-6 grid grid-flow-row-dense grid-cols-2 gap-3">
              {galleryPhotos.slice(0, visibleCount).map((photo, i) => {
                const wide = isWidePhoto(photo, i);
                return (
                  <li key={photo.src} className={wide ? "col-span-2" : undefined}>
                    <button
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      type="button"
                      onClick={() => setOpenIndex(i)}
                      aria-label={t.gallery.openPhoto(i + 1)}
                      aria-haspopup="dialog"
                      className={`relative block w-full overflow-hidden bg-apricot-soft shadow-soft active:scale-[0.98] ${
                        tileShapes[i % tileShapes.length]
                      } ${wide ? "aspect-[16/10]" : "aspect-square"}`}
                    >
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes={wide ? "(min-width: 672px) 640px, 100vw" : "(min-width: 672px) 320px, 50vw"}
                        className="object-cover"
                        style={{ objectPosition: photo.position }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {canExpand && (
              <button
                type="button"
                onClick={toggle}
                aria-expanded={expanded}
                aria-controls="gallery-list"
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-terracotta bg-milk px-5 font-semibold text-terracotta-deep"
              >
                {expanded ? t.gallery.showLess : t.gallery.showMore}
                <ChevronDownIcon className={`size-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
            )}

            <Lightbox photos={galleryPhotos} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
          </>
        )}
      </div>
    </section>
  );
}
