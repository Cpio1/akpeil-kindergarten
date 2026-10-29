/**
 * Декоративные элементы: солнце, цветок, звёздочка, облако.
 * Все скрыты от скринридеров и не перехватывают клики (pointer-events-none).
 */

type DecorProps = { className?: string };

const base = "pointer-events-none select-none";

export function Sun({ className = "" }: DecorProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className={`${base} ${className}`}>
      <g fill="#DFA64B">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="47" y="4" width="6" height="16" rx="3" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="24" fill="#F2C46D" />
      <circle cx="50" cy="50" r="24" fill="none" stroke="#DFA64B" strokeWidth="3" />
    </svg>
  );
}

export function Flower({ className = "", color = "#EDB58F" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className={`${base} ${className}`}>
      <g fill={color}>
        {Array.from({ length: 6 }, (_, i) => (
          <ellipse key={i} cx="50" cy="26" rx="14" ry="22" transform={`rotate(${i * 60} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="12" fill="#DFA64B" />
    </svg>
  );
}

export function Star({ className = "", color = "#DFA64B" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className={`${base} ${className}`}>
      <path
        d="M50 6c3 22 10 32 44 44-34 12-41 22-44 44-3-22-10-32-44-44 34-12 41-22 44-44Z"
        fill={color}
      />
    </svg>
  );
}

export function Cloud({ className = "", color = "#FFFFFF" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 160 90" aria-hidden="true" focusable="false" className={`${base} ${className}`}>
      <path
        d="M38 80h88a26 26 0 0 0 2-52 34 34 0 0 0-64-6 26 26 0 0 0-30 24A18 18 0 0 0 38 80Z"
        fill={color}
        stroke="#F2DFC4"
        strokeWidth="3"
      />
    </svg>
  );
}
