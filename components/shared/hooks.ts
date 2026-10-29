"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { sectionIds, type SectionId } from "@/lib/site-config";

export const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * true — компьютерная версия, false — телефонная, null — до гидратации
 * (на сервере рендерятся обе версии, лишняя скрыта CSS).
 */
export function useIsDesktop(): boolean | null {
  return useSyncExternalStore(
    (listener) => {
      const media = window.matchMedia(DESKTOP_QUERY);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => null,
  );
}

/** Раздел, который сейчас находится под шапкой, — для подсветки пункта меню. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const update = () => {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
      const line = header + window.innerHeight * 0.3;
      let current: SectionId = "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id as SectionId;
      }
      // В самом низу страницы подсвечиваем последний раздел, даже если он невысокий.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1].id as SectionId;
      }
      setActive(current);
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}
