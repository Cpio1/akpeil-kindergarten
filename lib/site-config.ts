/**
 * Общие данные детского сада. Здесь меняются контакты, график, ссылки на документы,
 * WhatsApp и карту — компоненты обеих версий сайта берут значения отсюда.
 */

export const siteConfig = {
  /** Название сохраняется в оригинальном написании в обеих языковых версиях. */
  name: "Ақпейіл бөбекжай-бақшасы",
  shortName: "Ақпейіл",

  phone: {
    display: "8 (72752) 7-00-38",
    href: "tel:+77275270038",
  },

  instagram: {
    url: "https://www.instagram.com/faizaman2026/",
    handle: "@faizaman2026",
  },

  /**
   * Ссылка на папку с документами (например, Google Drive).
   * Пока пусто — кнопка неактивна и показывает «Жақында қолжетімді болады».
   * Как только сюда добавят ссылку, кнопка станет активной и откроет папку в новой вкладке.
   */
  documentsUrl: "",

  /**
   * Ссылка на WhatsApp (например, "https://wa.me/7XXXXXXXXXX").
   * Наличие WhatsApp на номере садика не подтверждено, поэтому поле пустое и кнопка скрыта.
   */
  whatsappUrl: "",

  /**
   * Проверенная ссылка на точку на карте (2ГИС / Яндекс / Google).
   * Пока точной точки нет, кнопка «Найти на карте» открывает поиск полного адреса в 2ГИС.
   */
  mapUrl: "",

  stats: {
    groups: 7,
    ageFrom: 2,
    ageTo: 6,
    mealsPerDay: 4,
  },
} as const;

/**
 * ВРЕМЕННЫЙ график работы — НЕОБХОДИМО ПОДТВЕРДИТЬ у администрации садика.
 * После подтверждения поправьте дни и часы здесь: обе версии сайта обновятся автоматически.
 */
export const schedule = {
  weekdays: { open: "08:00", close: "18:00" },
  weekendClosed: true,
} as const;

export const address = {
  kk: "Алматы облысы, Іле ауданы, Байсерке ауылы, Арқабай көшесі, 40 үй",
  ru: "Алматинская область, Илийский район, село Байсерке, улица Аркабай, дом 40",
} as const;

/** Поисковый запрос 2ГИС строится по полному адресу, без приблизительных координат. */
const mapSearchQuery = "Алматы облысы, Іле ауданы, Байсерке, Арқабай көшесі, 40";

export const mapLink = siteConfig.mapUrl || `https://2gis.kz/search/${encodeURIComponent(mapSearchQuery)}`;

export const sectionIds = ["home", "about", "groups", "gallery", "documents", "contacts"] as const;
export type SectionId = (typeof sectionIds)[number];
