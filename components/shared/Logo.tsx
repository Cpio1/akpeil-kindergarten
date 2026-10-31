import Image from "next/image";

/** Логотип садика (public/images/logo.png, прозрачный фон). Размер задаётся классом, например size-12. */
export function Logo({ className = "", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      width={96}
      height={96}
      loading={eager ? "eager" : "lazy"}
      className={`object-contain ${className}`}
    />
  );
}
