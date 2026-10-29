import Image from "next/image";
import type { Photo } from "@/lib/photos";
import { CameraIcon } from "./Icons";
import { Flower, Sun } from "./Decor";

type PhotoFrameProps = {
  photo: Photo | null;
  alt: string;
  /** Подпись заглушки, пока фотография не добавлена. */
  pendingLabel: string;
  sizes: string;
  /** Форма и размеры рамки (классы Tailwind / .shape-*). */
  className?: string;
  eager?: boolean;
};

/**
 * Фотография раздела в фигурной рамке. Заполняет рамку (object-cover) с индивидуальной
 * точкой кадрирования. Если файла нет, показывает аккуратную заглушку без битых картинок.
 */
export function PhotoFrame({ photo, alt, pendingLabel, sizes, className = "", eager = false }: PhotoFrameProps) {
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {photo ? (
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className="object-cover"
          style={{ objectPosition: photo.position }}
        />
      ) : (
        <PhotoPlaceholder label={pendingLabel} />
      )}
    </div>
  );
}

export function PhotoPlaceholder({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand-soft via-sand to-apricot-soft p-4 text-center"
    >
      <Sun className={`absolute opacity-40 ${compact ? "-top-3 -right-3 size-14" : "top-[8%] right-[10%] size-20"}`} />
      <Flower className={`absolute opacity-50 ${compact ? "bottom-2 left-2 size-8" : "bottom-[10%] left-[12%] size-12"}`} />
      <span className="relative grid size-12 place-items-center rounded-full bg-milk/80 text-cocoa-soft shadow-soft">
        <CameraIcon className="size-6" />
      </span>
      <span className="relative text-sm font-medium text-cocoa-soft">{label}</span>
    </div>
  );
}
