"use client";

import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { LanguageIcon, UsersIcon } from "../shared/Icons";
import { mealIcons } from "../shared/meals";
import { Star, Sun } from "../shared/Decor";

export function MobileGroupsMeals() {
  const { t } = useLanguage();
  const { groups, mealsPerDay } = siteConfig.stats;

  return (
    <section id="groups" aria-labelledby="m-groups-title" className="relative overflow-hidden py-12">
      <Star className="absolute top-10 right-5 size-5 animate-twinkle" color="#F47C60" />

      <div className="mx-auto max-w-2xl px-4">
        <Reveal>
          <p className="text-sm font-semibold text-terracotta-deep">{t.groups.eyebrow}</p>
          <h2 id="m-groups-title" className="mt-1.5 text-[1.6rem] leading-tight font-extrabold sm:text-3xl">
            {t.groups.title}
          </h2>
        </Reveal>

        <Reveal className="mt-6 rounded-[120px_120px_32px_32px] bg-sun-soft px-5 pt-8 pb-6 text-center">
          <div className="relative mx-auto grid size-28 place-items-center">
            <Sun className="absolute inset-0 size-full animate-spin-slow" />
            <span className="relative font-display text-5xl leading-none font-black" aria-hidden="true">
              {groups}
            </span>
          </div>
          <h3 className="mt-2 text-xl font-extrabold">
            <span className="sr-only">{groups} </span>
            {t.groups.groupsTitle}
          </h3>
          <ul className="mt-3 grid gap-2 text-left">
            <li className="flex items-center gap-2.5 rounded-2xl bg-milk px-3 py-2 font-medium">
              <UsersIcon className="size-5 shrink-0 text-terracotta-deep" />
              {t.groups.groupsFacts[0]}
            </li>
            <li className="flex items-center gap-2.5 rounded-2xl bg-milk px-3 py-2 font-medium">
              <LanguageIcon className="size-5 shrink-0 text-terracotta-deep" />
              {t.groups.groupsFacts[1]}
            </li>
          </ul>
          <p className="mt-4 text-left leading-relaxed text-cocoa-soft">{t.groups.groupsText}</p>
        </Reveal>

        <Reveal className="mt-5 rounded-[32px_88px_32px_88px] bg-coral-soft px-5 py-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-xl font-extrabold">{t.groups.mealsTitle}</h3>
            <p className="rounded-full bg-milk px-3 py-1 text-sm font-bold text-terracotta-deep">{t.groups.mealsHighlight}</p>
          </div>
          <p className="mt-3 leading-relaxed text-cocoa-soft">{t.groups.mealsText}</p>
          <ol className="mt-5 grid grid-cols-4 gap-2">
            {mealIcons.slice(0, mealsPerDay).map(({ Icon, shape }, i) => (
              <li key={i} className="flex flex-col items-center gap-1.5 text-center">
                <span className={`grid size-14 place-items-center shadow-soft ${shape}`}>
                  <Icon className="size-7" />
                </span>
                <span className="text-xs font-semibold">{t.groups.mealLabel(i + 1)}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
