"use client";

import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { ExternalIcon, FolderIcon } from "../shared/Icons";
import { Star } from "../shared/Decor";

export function Documents() {
  const { t } = useLanguage();
  const url = siteConfig.documentsUrl;

  return (
    <section id="documents" aria-labelledby="documents-title" className="py-14">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="relative flex items-center gap-8 rounded-[48px_48px_48px_12px] border border-line bg-milk px-10 py-8 shadow-soft">
          <Star className="absolute -top-3 right-14 size-6 animate-twinkle" />
          <div className="shape-blob grid size-24 shrink-0 place-items-center bg-honey-soft text-honey-deep">
            <FolderIcon className="size-11" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-honey-deep">{t.documents.eyebrow}</p>
            <h2 id="documents-title" className="mt-1 text-2xl leading-tight font-extrabold">
              {t.documents.title}
            </h2>
            <p className="mt-2 leading-relaxed text-cocoa-soft">{t.documents.text}</p>
          </div>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cocoa px-6 py-3.5 font-semibold text-milk shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              {t.documents.open}
              <ExternalIcon className="size-4" />
              <span className="sr-only">({t.a11y.opensInNewTab})</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="shrink-0 cursor-not-allowed rounded-full border-2 border-dashed border-cocoa/40 bg-sand-soft px-6 py-3 font-semibold text-cocoa-soft"
            >
              {t.documents.unavailable}
            </button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
