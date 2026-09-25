import type { Locale } from "@/i18n/dictionaries";

/** Circular flag icons: Brazil (PT-BR), United States (EN), Spain (ES). */
export function Flag({ code, className = "size-7" }: { code: Locale; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`${className} rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]`} aria-hidden>
      <defs>
        <clipPath id={`flag-${code}`}>
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-${code})`}>
        {code === "pt" && (
          <>
            <rect width="32" height="32" fill="#009b3a" />
            <path d="M16 5.5L29 16 16 26.5 3 16z" fill="#fedf00" />
            <circle cx="16" cy="16" r="6.2" fill="#002776" />
            <path d="M9.9 15a13 13 0 0 1 12.1 2.3" stroke="#fff" strokeWidth="1.2" fill="none" />
          </>
        )}
        {code === "en" && (
          <>
            <rect width="32" height="32" fill="#fff" />
            {[0, 2, 4, 6, 8, 10, 12].map((i) => (
              <rect key={i} y={i * 2.47} width="32" height="2.47" fill="#b22234" />
            ))}
            <rect width="15" height="17.3" fill="#3c3b6e" />
            {[3, 7.5, 12].map((x) => [3.5, 8.5, 13.5].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill="#fff" />))}
          </>
        )}
        {code === "es" && (
          <>
            <rect width="32" height="32" fill="#aa151b" />
            <rect y="8" width="32" height="16" fill="#f1bf00" />
            <rect x="8" y="13" width="4" height="6" rx="1" fill="#aa151b" opacity=".75" />
          </>
        )}
      </g>
    </svg>
  );
}
