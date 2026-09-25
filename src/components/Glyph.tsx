"use client";

import { motion } from "motion/react";

/**
 * Custom animated line icons. Strokes draw in when scrolled into view,
 * and each glyph carries one small looping "accent" so it feels alive.
 */
export type GlyphName =
  | "mobile" | "ai" | "xr" | "web" | "design" | "security" | "qa" | "growth"
  | "fintech" | "edutech" | "health" | "food" | "taxi" | "ondemand" | "ecommerce"
  | "shopify" | "booking" | "logistics" | "more"
  | "talk" | "quality" | "time" | "detail" | "support"
  | "discover" | "build" | "test" | "launch" | "ar" | "vr" | "sparkle";

type Part = { d: string } | { c: [number, number, number] } | { r: [number, number, number, number, number] };

const Path = ({ p, i }: { p: Part; i: number }) => {
  const anim = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1.1, delay: 0.12 * i, ease: [0.65, 0, 0.35, 1] as const },
  };
  if ("d" in p) return <motion.path d={p.d} {...anim} />;
  if ("c" in p) return <motion.circle cx={p.c[0]} cy={p.c[1]} r={p.c[2]} {...anim} />;
  return <motion.rect x={p.r[0]} y={p.r[1]} width={p.r[2]} height={p.r[3]} rx={p.r[4]} {...anim} />;
};

const G: Record<GlyphName, { parts: Part[]; accent?: React.ReactNode }> = {
  mobile: {
    parts: [{ r: [6, 2.5, 12, 19, 3] }, { d: "M10.5 18.5h3" }],
    accent: <circle className="g-blink" cx="12" cy="6" r="1" fill="currentColor" stroke="none" />,
  },
  ai: {
    parts: [{ r: [6, 6, 12, 12, 2.5] }, { d: "M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" }],
    accent: <path className="g-spin" d="M12 9.2l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z" fill="var(--color-ouro)" stroke="none" />,
  },
  xr: {
    parts: [{ d: "M3 9.5A2.5 2.5 0 0 1 5.5 7h13A2.5 2.5 0 0 1 21 9.5v5a2.5 2.5 0 0 1-2.5 2.5h-3.2l-1.6-2.2a2 2 0 0 0-3.4 0L8.7 17H5.5A2.5 2.5 0 0 1 3 14.5z" }],
    accent: (
      <g className="g-blink" fill="var(--color-ouro)" stroke="none">
        <circle cx="8" cy="11.5" r="1.4" />
        <circle cx="16" cy="11.5" r="1.4" />
      </g>
    ),
  },
  vr: {
    parts: [{ d: "M3 9.5A2.5 2.5 0 0 1 5.5 7h13A2.5 2.5 0 0 1 21 9.5v5a2.5 2.5 0 0 1-2.5 2.5h-3.2l-1.6-2.2a2 2 0 0 0-3.4 0L8.7 17H5.5A2.5 2.5 0 0 1 3 14.5z" }],
    accent: (
      <g className="g-blink" fill="var(--color-ouro)" stroke="none">
        <circle cx="8" cy="11.5" r="1.4" />
        <circle cx="16" cy="11.5" r="1.4" />
      </g>
    ),
  },
  ar: {
    parts: [{ d: "M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16" }, { d: "M12 7l4.5 2.5v5L12 17l-4.5-2.5v-5z" }, { d: "M7.5 9.5L12 12l4.5-2.5M12 12v5" }],
    accent: <path className="g-float" d="M6 5h12" stroke="var(--color-ouro)" strokeWidth="1.4" />,
  },
  web: {
    parts: [{ c: [12, 12, 9] }, { d: "M3 12h18" }, { d: "M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" }],
    accent: <circle className="g-spin" cx="12" cy="3" r="1.3" fill="var(--color-ouro)" stroke="none" style={{ transformOrigin: "12px 12px", transformBox: "view-box" }} />,
  },
  design: {
    parts: [{ d: "M4 20l3.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11z" }, { d: "M14 6.5l3 3" }],
    accent: <circle className="g-float" cx="18.5" cy="18" r="2" fill="var(--color-ouro)" stroke="none" />,
  },
  security: {
    parts: [{ d: "M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9.5-4.1-1.6-7-5.3-7-9.5V6z" }, { d: "M9 12l2.2 2.2L15.5 10" }],
    accent: <circle className="g-pulse" cx="12" cy="3" r="1" fill="var(--color-ouro)" stroke="none" />,
  },
  qa: {
    parts: [{ c: [10.5, 10.5, 6.5] }, { d: "M15.5 15.5l5 5" }, { d: "M7.8 10.6l1.8 1.8 3.4-3.4" }],
    accent: <circle className="g-blink" cx="20.5" cy="20.5" r="1.2" fill="var(--color-ouro)" stroke="none" />,
  },
  growth: {
    parts: [{ d: "M3 17l6-6 4 4 8-8" }, { d: "M15 7h6v6" }],
    accent: <circle className="g-float" cx="21" cy="7" r="1.6" fill="var(--color-ouro)" stroke="none" />,
  },
  fintech: {
    parts: [{ r: [3.5, 7.5, 17, 12, 2.5] }, { d: "M6 7.5V6.5A2.5 2.5 0 0 1 8.5 4H17v3.5" }, { d: "M20.5 11.5h-4a2 2 0 0 0 0 4h4" }],
    accent: <circle className="g-pulse" cx="16.5" cy="13.5" r="1.1" fill="var(--color-ouro)" stroke="none" />,
  },
  edutech: {
    parts: [{ d: "M2.5 9.5L12 5l9.5 4.5L12 14z" }, { d: "M6.5 11.5v4c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4" }],
    accent: <path className="g-wiggle" d="M21.5 9.5v5" stroke="var(--color-ouro)" />,
  },
  health: {
    parts: [{ d: "M20.5 8.8c0 5.2-8.5 10.7-8.5 10.7S3.5 14 3.5 8.8A4.3 4.3 0 0 1 12 6.9a4.3 4.3 0 0 1 8.5 1.9z" }, { d: "M6.5 12h3l1.5-2.5 2 5 1.5-2.5h3" }],
    accent: <circle className="g-pulse" cx="18" cy="5" r="1.2" fill="var(--color-ouro)" stroke="none" />,
  },
  food: {
    parts: [{ d: "M3.5 11h17c0 4.4-3.8 8-8.5 8s-8.5-3.6-8.5-8z" }, { d: "M8 21h8" }],
    accent: (
      <g className="g-rise" stroke="var(--color-ouro)">
        <path d="M9 3.5c-1 1 1 2 0 3.5M12 3c-1 1 1 2 0 3.5M15 3.5c-1 1 1 2 0 3.5" />
      </g>
    ),
  },
  taxi: {
    parts: [{ d: "M5 16.5V12l2-5h10l2 5v4.5M3.5 16.5h17M5 12h14" }, { c: [7.5, 17.5, 1.8] }, { c: [16.5, 17.5, 1.8] }],
    accent: <rect className="g-blink" x="10" y="3.5" width="4" height="2" rx=".6" fill="var(--color-ouro)" stroke="none" />,
  },
  ondemand: {
    parts: [{ d: "M13 2.5L5 13.5h6l-1 8 8-11h-6z" }],
    accent: <circle className="g-pulse" cx="19" cy="4.5" r="1.3" fill="var(--color-ouro)" stroke="none" />,
  },
  ecommerce: {
    parts: [{ d: "M3 4h2.5l2.2 10.5h10.3L20 7.5H7" }, { c: [9.5, 19, 1.4] }, { c: [16.5, 19, 1.4] }],
    accent: <circle className="g-float" cx="13.5" cy="4" r="1.2" fill="var(--color-ouro)" stroke="none" />,
  },
  shopify: {
    parts: [{ d: "M5 8h14l-1 12.5H6z" }, { d: "M9 10V7a3 3 0 0 1 6 0v3" }],
    accent: <path className="g-pulse" d="M12 13.2l.7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1 1.5-.2z" fill="var(--color-ouro)" stroke="none" />,
  },
  booking: {
    parts: [{ r: [3.5, 5, 17, 15.5, 2.5] }, { d: "M3.5 10h17M8 3v4M16 3v4" }, { d: "M9 15l2 2 4-4" }],
    accent: <circle className="g-blink" cx="17" cy="13.5" r=".9" fill="var(--color-ouro)" stroke="none" />,
  },
  logistics: {
    parts: [{ d: "M12 3l8 4.5v9L12 21l-8-4.5v-9z" }, { d: "M4 7.5l8 4.5 8-4.5M12 12v9" }],
    accent: <path className="g-float" d="M8 5.2l8 4.6" stroke="var(--color-ouro)" />,
  },
  more: {
    parts: [{ c: [12, 12, 9] }, { d: "M12 8v8M8 12h8" }],
    accent: <circle className="g-spin" cx="12" cy="3" r="1.2" fill="var(--color-ouro)" stroke="none" style={{ transformOrigin: "12px 12px", transformBox: "view-box" }} />,
  },
  talk: {
    parts: [{ d: "M20 12.5a7.5 7.5 0 0 1-11 6.6L4 20.5l1.4-4.6A7.5 7.5 0 1 1 20 12.5z" }],
    accent: (
      <g fill="var(--color-ouro)" stroke="none">
        <circle className="g-dot" cx="9" cy="12.5" r="1.1" />
        <circle className="g-dot" cx="12.5" cy="12.5" r="1.1" />
        <circle className="g-dot" cx="16" cy="12.5" r="1.1" />
      </g>
    ),
  },
  quality: {
    parts: [{ d: "M6.5 4h11l3.5 5-9 11L3 9z" }, { d: "M3 9h18M8.5 9L12 20l3.5-11M9.5 4L12 9l2.5-5" }],
    accent: <circle className="g-pulse" cx="19.5" cy="3" r="1.1" fill="var(--color-ouro)" stroke="none" />,
  },
  time: {
    parts: [{ c: [12, 12, 9] }],
    accent: (
      <g>
        <path className="g-hand" d="M12 12V6.5" stroke="var(--color-ouro)" />
        <path d="M12 12l3.5 2" />
      </g>
    ),
  },
  detail: {
    parts: [{ d: "M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" }, { c: [12, 12, 2.8] }],
    accent: <circle className="g-blink" cx="12" cy="12" r="1" fill="var(--color-ouro)" stroke="none" />,
  },
  support: {
    parts: [{ d: "M12 12c-2-2.7-3.6-4-5.5-4a4 4 0 0 0 0 8c1.9 0 3.5-1.3 5.5-4zm0 0c2 2.7 3.6 4 5.5 4a4 4 0 0 0 0-8c-1.9 0-3.5 1.3-5.5 4z" }],
    accent: <circle className="g-pulse" cx="12" cy="12" r="1.2" fill="var(--color-ouro)" stroke="none" />,
  },
  discover: {
    parts: [{ c: [12, 12, 9] }, { d: "M15.5 8.5l-2 5-5 2 2-5z" }],
    accent: <circle className="g-spin" cx="12" cy="3" r="1.1" fill="var(--color-ouro)" stroke="none" style={{ transformOrigin: "12px 12px", transformBox: "view-box" }} />,
  },
  build: {
    parts: [{ d: "M8 7l-5 5 5 5M16 7l5 5-5 5" }, { d: "M13.5 4.5l-3 15" }],
    accent: <rect className="g-blink" x="17.5" y="18.5" width="3.5" height="1.4" rx=".5" fill="var(--color-ouro)" stroke="none" />,
  },
  test: {
    parts: [{ d: "M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" }, { d: "M7 15h10" }],
    accent: (
      <g className="g-rise" fill="var(--color-ouro)" stroke="none">
        <circle cx="10.5" cy="17.8" r="1" />
        <circle cx="13.5" cy="18.4" r=".8" />
      </g>
    ),
  },
  launch: {
    parts: [{ d: "M12 2.5c3.5 2 5 5.5 5 9.5l-2 3.5H9L7 12c0-4 1.5-7.5 5-9.5z" }, { c: [12, 9.5, 1.8] }, { d: "M9 15.5L6.5 19l3.5-1M15 15.5l2.5 3.5-3.5-1" }],
    accent: <path className="g-pulse" d="M11 18.5l1 3 1-3z" fill="var(--color-ouro)" stroke="var(--color-ouro)" />,
  },
  sparkle: {
    parts: [{ d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" }],
    accent: <circle className="g-pulse" cx="19" cy="18" r="1.5" fill="var(--color-ouro)" stroke="none" />,
  },
};

export function Glyph({ name, className = "", strokeWidth = 1.7 }: { name: GlyphName; className?: string; strokeWidth?: number }) {
  const g = G[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {g.parts.map((p, i) => (
        <Path key={i} p={p} i={i} />
      ))}
      {g.accent}
    </svg>
  );
}

/** Circular glossy orb that hosts a Glyph. */
export function GlyphOrb({
  name,
  tone = "green",
  size = "md",
  className = "",
}: {
  name: GlyphName;
  tone?: "green" | "gold" | "blue" | "coral" | "violet" | "teal";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "size-14 [&>svg]:size-7",
    md: "size-20 [&>svg]:size-10",
    lg: "size-24 [&>svg]:size-12",
    xl: "size-28 md:size-32 [&>svg]:size-14 md:[&>svg]:size-16",
  } as const;
  return (
    <span className={`orb tone-${tone} ${sizes[size]} shrink-0 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105 ${className}`}>
      <Glyph name={name} />
    </span>
  );
}
