"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "motion/react";
import { useRef } from "react";

/** Fade-and-rise on scroll into view. */
export function Reveal({ delay = 0, y = 32, className, children, ...rest }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Kicker({ children, tone = "verde" }: { children: React.ReactNode; tone?: "verde" | "ouro" | "anil" | "light" }) {
  const tones = {
    verde: "text-verde-deep bg-verde/10 ring-verde/20",
    ouro: "text-ouro-deep bg-ouro/15 ring-ouro/30",
    anil: "text-anil-deep bg-anil/10 ring-anil/20",
    light: "text-white bg-white/15 ring-white/30",
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-extrabold uppercase tracking-[0.2em] ring-1 ${tones[tone]}`}>
      <span className="size-2 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  sub,
  align = "center",
  tone,
}: {
  kicker: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  tone?: "verde" | "ouro" | "anil";
}) {
  return (
    <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Kicker tone={tone}>{kicker}</Kicker>
      <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance md:text-6xl">{title}</h2>
      {sub && <p className="mt-5 text-lg text-muted text-pretty md:text-xl">{sub}</p>}
    </Reveal>
  );
}

export function ArrowIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
}) {
  const styles = {
    primary: "bg-gradient-to-br from-verde to-verde-deep text-white shadow-[var(--shadow-glow-green)] hover:shadow-[0_24px_60px_-18px_rgb(11_158_106/0.75)]",
    ghost: "glass text-ink hover:bg-white/90",
    light: "bg-white text-ink shadow-[var(--shadow-lift)] hover:bg-paper",
  };
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 font-display text-base font-extrabold sm:pl-7 sm:text-lg transition-all duration-300 hover:-translate-y-0.5 ${styles[variant]}`}
    >
      {children}
      <span
        className={`grid size-10 place-items-center rounded-full sm:size-11 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45 ${
          variant === "primary" ? "bg-white/20" : "bg-ink text-white"
        }`}
      >
        <ArrowIcon />
      </span>
    </Link>
  );
}

/** Pointer-driven 3D tilt with a moving glare highlight. */
export function Tilt({ children, className = "", max = 10 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glare = useTransform([sx, sy], ([gx, gy]: number[]) => `radial-gradient(420px circle at ${gx * 100}% ${gy * 100}%, rgb(255 255 255 / 0.35), transparent 45%)`);

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]" style={{ background: glare }} />
    </motion.div>
  );
}
