"use client";

import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { ExternalIcon, FolderIcon } from "../shared/Icons";
import { Star } from "../shared/Decor";

export function MobileDocuments() {
  const { t } = useLanguage();
  const url = siteConfig.documentsUrl;

  return (
    <section id="documents" aria-labelledby="m-documents-title" className="py-10">
      <div className="mx-auto max-w-2xl px-4">
        <Reveal className="relative rounded-[36px_36px_36px_10px] border border-line bg-milk px-5 py-6 shadow-soft">
          <Star className="absolute -top-2.5 right-8 size-5 animate-twinkle" />
          <div className="flex items-center gap-4">
            <div className="shape-blob grid size-16 shrink-0 place-items-center bg-honey-soft text-honey-deep">
              <FolderIcon className="size-8" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-honey-deep">{t.documents.eyebrow}</p>
              <h2 id="m-documents-title" className="mt-0.5 text-xl leading-tight font-extrabold">
                {t.documents.title}
              </h2>
            </div>
          </div>
          <p className="mt-3 leading-relaxed text-cocoa-soft">{t.documents.text}</p>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-5 font-semibold text-milk shadow-soft"
            >
              {t.documents.open}
              <ExternalIcon className="size-4" />
              <span className="sr-only">({t.a11y.opensInNewTab})</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-4 flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full border-2 border-dashed border-cocoa/40 bg-sand-soft px-5 font-semibold text-cocoa-soft"
            >
              {t.documents.unavailable}
            </button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
