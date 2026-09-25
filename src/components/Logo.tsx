import Link from "next/link";

/**
 * Monogram "D" inside a rotating tri-color ring (green / gold / blue —
 * a nod to Brazil and to the three platforms). A blinking cursor dot
 * marks the developer's identity.
 */
export function LogoMark({ className = "size-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="lm-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f1e8d8" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="21" fill="url(#lm-fill)" />
      <g className="origin-center animate-[hand_10s_linear_infinite]" style={{ transformBox: "view-box", transformOrigin: "24px 24px" }}>
        <circle cx="24" cy="24" r="21.5" fill="none" stroke="#0b9e6a" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 95.1" />
        <circle cx="24" cy="24" r="21.5" fill="none" stroke="#f4b53f" strokeWidth="3" strokeLinecap="round" strokeDasharray="30 105.1" strokeDashoffset="-45" />
        <circle cx="24" cy="24" r="21.5" fill="none" stroke="#2f63e8" strokeWidth="3" strokeLinecap="round" strokeDasharray="34 101.1" strokeDashoffset="-80" />
      </g>
      <path d="M17 14.5h6.2a9.5 9.5 0 0 1 0 19H17z" fill="none" stroke="#17242d" strokeWidth="3.6" strokeLinejoin="round" />
      <path d="M22 20.5l3.5 3.5-3.5 3.5" fill="none" stroke="#0b9e6a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="33.5" cy="33.5" r="2.6" fill="#f4b53f" className="animate-[blink_1.6s_ease-in-out_infinite]" />
    </svg>
  );
}

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3" aria-label="Davi — home">
      <span className="grid place-items-center rounded-full bg-white/70 p-1 shadow-[var(--shadow-soft)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105">
        <LogoMark className="size-12 md:size-14" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-extrabold tracking-tight md:text-[1.7rem]">
          davi<span className="text-verde">.</span>dev
        </span>
        <span className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-muted">Mobile · AI · Web</span>
      </span>
    </Link>
  );
}
