"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import type { Photo } from "@/lib/photos";
import { useLanguage } from "./LanguageProvider";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";

type LightboxProps = {
  photos: Photo[];
  /** Индекс открытого снимка; null — просмотр закрыт. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const SWIPE_THRESHOLD = 50;

/**
 * Полноэкранный просмотр фотографии на нативном <dialog>: фокус остаётся внутри окна,
 * Escape закрывает, после закрытия фокус возвращается на превью.
 * Управление: стрелки, кнопки, свайп на телефоне, клик по фону.
 */
export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;
  const total = photos.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Окно закрылось (любым способом) — возвращаем прокрутку и фокус.
  const handleClosed = () => {
    document.documentElement.style.overflow = "";
    returnFocusRef.current?.focus({ preventScroll: true });
    returnFocusRef.current = null;
  };

  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  const go = (step: number) => {
    if (index === null || total < 2) return;
    onNavigate((index + step + total) % total);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  const handlePointerDown = (event: PointerEvent) => {
    swipeStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: PointerEvent) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  // Клик по фону (мимо снимка, счётчика и кнопок) закрывает просмотр.
  const closeOnBackdrop = (event: React.MouseEvent) => {
    if (!(event.target as Element).closest("button, [data-lightbox-photo], [data-lightbox-counter]")) onClose();
  };

  const photo = index !== null ? photos[index] : null;

  return (
    <dialog
      ref={dialogRef}
      aria-label={t.gallery.viewer}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={handleClosed}
      onKeyDown={handleKeyDown}
      onClick={closeOnBackdrop}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-milk backdrop:bg-[#2a1f19]/90 backdrop:backdrop-blur-sm"
    >
      {photo && index !== null && (
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center justify-between gap-3 px-3 pt-3 sm:px-6 sm:pt-5">
            <p data-lightbox-counter className="rounded-full bg-black/35 px-3 py-1 text-sm tabular-nums" aria-live="polite">
              {index + 1} / {total}
            </p>
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label={t.gallery.close}
              className="grid size-12 place-items-center rounded-full bg-milk text-cocoa shadow-soft transition hover:bg-sun-soft focus-visible:outline-milk"
            >
              <CloseIcon className="size-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-3 sm:px-20">
            {/* Рамка с пропорциями снимка: фото видно целиком и вписано в экран. */}
            <div
              data-lightbox-photo
              className="relative max-w-full touch-pan-y overflow-hidden rounded-2xl [--chrome:10.5rem] sm:[--chrome:7rem]"
              style={{
                aspectRatio: `${photo.width} / ${photo.height}`,
                width: `min(100%, calc((100dvh - var(--chrome)) * ${photo.width / photo.height}))`,
              }}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => (swipeStartRef.current = null)}
            >
              <Image
                key={photo.src}
                src={photo.src}
                alt={t.gallery.photoAlt(index + 1)}
                fill
                sizes="(min-width: 1024px) 90vw, 100vw"
                quality={85}
                className="object-contain select-none"
                draggable={false}
              />
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t.gallery.prev}
                  className="absolute top-1/2 left-2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-milk/90 text-cocoa shadow-soft transition hover:bg-milk sm:grid sm:left-5 focus-visible:outline-milk"
                >
                  <ChevronLeftIcon className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t.gallery.next}
                  className="absolute top-1/2 right-2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-milk/90 text-cocoa shadow-soft transition hover:bg-milk sm:grid sm:right-5 focus-visible:outline-milk"
                >
                  <ChevronRightIcon className="size-6" />
                </button>
              </>
            )}
          </div>

          {/* На телефоне кнопки листания внизу — их удобно нажимать большим пальцем. */}
          {total > 1 && (
            <div className="flex justify-center gap-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t.gallery.prev}
                className="grid size-12 place-items-center rounded-full bg-milk text-cocoa shadow-soft focus-visible:outline-milk"
              >
                <ChevronLeftIcon className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t.gallery.next}
                className="grid size-12 place-items-center rounded-full bg-milk text-cocoa shadow-soft focus-visible:outline-milk"
              >
                <ChevronRightIcon className="size-6" />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
