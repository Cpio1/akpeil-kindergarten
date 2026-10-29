import generated from "./photos.generated.json";

/**
 * Фотографии подключаются автоматически (см. scripts/detect-photos.mjs):
 *   public/images/main-page.*  → главный экран
 *   public/images/main-page2.* → «Біз туралы / О нас»
 *   public/gallery/*           → галерея
 * Чтобы заменить фото, положите новый файл с тем же именем и перезапустите dev/build.
 */

export type Photo = {
  file: string;
  src: string;
  width: number;
  height: number;
  /** Точка кадрирования превью (CSS object-position). Подбирается так, чтобы не обрезать головы. */
  position: string;
};

/** Кадрирование по умолчанию — ближе к верху кадра: так головы реже попадают под обрез. */
const DEFAULT_POSITION = "50% 25%";

/**
 * Индивидуальное кадрирование превью: имя файла → object-position.
 * Пример: "IMG_0012.jpg": "50% 15%" — сдвинуть кадр к верху, если на снимке головы у края.
 */
const positions: Record<string, string> = {
  "main-page": "50% 25%",
  "main-page2": "50% 30%",
};

type GeneratedPhoto = Omit<Photo, "position">;

function withPosition(photo: GeneratedPhoto | null): Photo | null {
  if (!photo) return null;
  const base = photo.file.replace(/\.[^.]+$/, "");
  return { ...photo, position: positions[photo.file] ?? positions[base] ?? DEFAULT_POSITION };
}

export const mainPhoto = withPosition(generated.main as GeneratedPhoto | null);
export const aboutPhoto = withPosition(generated.about as GeneratedPhoto | null);
export const galleryPhotos = (generated.gallery as GeneratedPhoto[]).map((photo) => withPosition(photo)!);

/** Сколько снимков галереи видно до нажатия «Көбірек көрсету». */
export const GALLERY_INITIAL = { desktop: 6, mobile: 4 } as const;
