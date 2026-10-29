"use client";

import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { LanguageIcon, UsersIcon } from "../shared/Icons";
import { mealIcons } from "../shared/meals";
import { Flower, Star, Sun } from "../shared/Decor";

export function GroupsMeals() {
  const { t } = useLanguage();
  const { groups, mealsPerDay } = siteConfig.stats;

  return (
    <section id="groups" aria-labelledby="groups-title" className="relative overflow-hidden py-16 min-[1400px]:py-20">
      <Star className="absolute top-14 left-[6%] size-6 animate-twinkle" color="#F47C60" />
      <Flower className="absolute right-[5%] bottom-10 size-12 animate-spin-slow" />

      <div className="mx-auto max-w-6xl px-6 xl:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-terracotta-deep">{t.groups.eyebrow}</p>
          <h2 id="groups-title" className="mt-2 text-3xl leading-tight font-extrabold xl:text-[2.1rem]">
            {t.groups.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-[1fr_1.1fr] items-stretch gap-6">
          {/* Блок «Группы»: арка с крупной семёркой */}
          <Reveal className="relative rounded-[200px_200px_40px_40px] bg-sun-soft px-10 pt-12 pb-9">
            <div className="flex items-center gap-6">
              <div className="relative grid size-32 shrink-0 place-items-center">
                <Sun className="absolute inset-0 size-full animate-spin-slow" />
                <span className="relative font-display text-6xl leading-none font-black text-cocoa" aria-hidden="true">
                  {groups}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl font-extrabold">
                  <span className="sr-only">{groups} </span>
                  {t.groups.groupsTitle}
                </h3>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-2.5 font-medium">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-milk text-terracotta-deep">
                      <UsersIcon className="size-4" />
                    </span>
                    {t.groups.groupsFacts[0]}
                  </li>
                  <li className="flex items-center gap-2.5 font-medium">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-milk text-terracotta-deep">
                      <LanguageIcon className="size-4" />
                    </span>
                    {t.groups.groupsFacts[1]}
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-5 leading-relaxed text-cocoa-soft">{t.groups.groupsText}</p>
          </Reveal>

          {/* Блок «Питание»: асимметричный лист с четырьмя иллюстрациями */}
          <Reveal delay={120} className="relative rounded-[40px_120px_40px_120px] bg-coral-soft px-9 py-9">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="text-2xl font-extrabold">{t.groups.mealsTitle}</h3>
              <p className="rounded-full bg-milk px-3.5 py-1 text-sm font-bold text-terracotta-deep">{t.groups.mealsHighlight}</p>
            </div>
            <p className="mt-3 max-w-md leading-relaxed text-cocoa-soft">{t.groups.mealsText}</p>

            <ol className="mt-6 grid grid-cols-4 gap-4">
              {mealIcons.slice(0, mealsPerDay).map(({ Icon, shape }, i) => (
                <li key={i} className="flex flex-col items-center gap-2 text-center">
                  <span
                    className={`grid size-[4.5rem] place-items-center text-cocoa shadow-soft transition-transform hover:-translate-y-1 ${shape}`}
                  >
                    <Icon className="size-8" />
                  </span>
                  <span className="text-sm font-semibold">{t.groups.mealLabel(i + 1)}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
