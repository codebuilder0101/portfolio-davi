"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { stack, type Tech } from "@/data/stack";
import { Button } from "../ui";
import { Glyph, GlyphOrb } from "../Glyph";

const ring: Tech[] = [
  stack.mobile[0], stack.mobile[2], stack.mobile[3], stack.mobile[4],
  stack.ai[0], stack.ai[1], stack.web[0], stack.backend[9], stack.xr[0], stack.mobile[6],
];

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words]);
  return (
    <span className="relative block h-[1.12em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0, rotateX: -60 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          exit={{ y: "-100%", opacity: 0, rotateX: 60 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-shimmer absolute inset-x-0 top-0 block whitespace-nowrap pb-[0.08em]"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function OrbitRing() {
  const n = ring.length;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-[45%] top-[72%] aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0" style={{ transform: "rotateX(68deg)", transformStyle: "preserve-3d" }}>
        <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgb(11_158_106/0.22),transparent_65%)]" />
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-verde/45"
          style={{ animation: "ring-spin 40s linear infinite", transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-[9%] rounded-full border border-ouro/60" />
          {ring.map((tech, i) => {
            const a = (i * 360) / n;
            return (
              <div key={tech.name} className="absolute inset-0" style={{ transform: `rotateZ(${a}deg)`, transformStyle: "preserve-3d" }}>
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" style={{ transformStyle: "preserve-3d" }}>
                  {/* Undo arm angle, undo ring spin, then stand upright to face the viewer */}
                  <div style={{ transform: `rotateZ(${-a}deg)`, transformStyle: "preserve-3d" }}>
                    <div style={{ animation: "counter-spin 40s linear infinite", transformStyle: "preserve-3d" }}>
                      <div style={{ transform: "rotateX(-68deg)", transformStyle: "preserve-3d" }}>
                        <span className="tech-orb size-[clamp(2.75rem,4.4vw,4rem)]">
                          <Image src={tech.icon} alt="" width={34} height={34} className="size-[55%]" unoptimized />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Scene() {
  const { t } = useI18n();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 80, damping: 18 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  return (
    <div className="relative hidden h-full min-h-0 xl:block" style={{ perspective: 1400 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, rotateY: -18 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div className="absolute inset-0" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
          {/* Sun disc */}
          <div
            className="absolute left-[6%] top-[4%] aspect-square w-[40%] rounded-full bg-gradient-to-br from-[#ffe39a] to-ouro shadow-[0_40px_80px_-30px_rgb(217_143_11/0.7)]"
            style={{ transform: "translateZ(-140px)" }}
          />
          {/* Arch office photo */}
          <div
            className="shape-arch absolute right-[2%] top-[3%] h-[74%] w-[52%] overflow-hidden border-[6px] border-white/80 shadow-[var(--shadow-lift)]"
            style={{ transform: "translateZ(-70px) rotateY(-6deg)" }}
          >
            <Image src="/images/office-2.jpg" alt="" fill sizes="30vw" className="object-cover" preload />
            <div className="absolute inset-0 bg-gradient-to-t from-verde-deep/40 via-transparent to-white/10" />
          </div>

          <OrbitRing />

          {/* Phone */}
          <div
            className="absolute left-[16%] top-[45%] aspect-[9/19] h-[min(80%,620px)] rounded-[2.6rem] border-[9px] border-white bg-ink shadow-[0_50px_90px_-30px_rgb(23_36_45/0.55),0_0_0_1px_rgb(23_36_45/0.08)]"
            style={{ transform: "translateY(-50%) translateZ(30px)" }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/video/hero-vr.mp4"
                poster="/images/vr-player.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/60" />
              <div className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/20 p-3 text-white backdrop-blur-md">
                <div className="flex items-center gap-2 text-sm font-extrabold">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-coral" />
                  </span>
                  VR Studio · Live
                </div>
                <div className="mt-2 flex h-6 items-end gap-1">
                  {[40, 70, 55, 90, 65, 80, 45, 95, 60].map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-full rounded-full bg-gradient-to-t from-verde to-ouro"
                      animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`] }}
                      transition={{ duration: 1.4, repeat: Infinity, repeatType: "mirror", delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI chip */}
          <div className="absolute right-[3%] top-[30%] animate-float" style={{ transform: "translateZ(110px)" }}>
            <div className="glass flex items-center gap-3 rounded-full py-2 pl-2 pr-5">
              <GlyphOrb name="ai" tone="violet" size="sm" />
              <div className="leading-tight">
                <p className="font-display text-base font-extrabold">{t.hero.chipAi}</p>
                <p className="flex items-center gap-1 text-sm text-muted">
                  {t.hero.chipAiText}
                  <span className="inline-flex gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="g-dot inline-block size-1 rounded-full bg-violet" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* AR chip */}
          <div className="absolute left-[1%] top-[52%] animate-float [animation-delay:-2s]" style={{ transform: "translateZ(90px)" }}>
            <div className="glass shape-leaf flex items-center gap-3 p-3 pr-5">
              <span className="relative grid size-14 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-teal to-anil text-white">
                <Glyph name="ar" className="size-8" />
                <span className="absolute inset-x-1 top-1 h-0.5 rounded-full bg-ouro shadow-[0_0_8px_#f4b53f]" style={{ animation: "scan 2.4s ease-in-out infinite" }} />
              </span>
              <div className="leading-tight">
                <p className="font-display text-base font-extrabold">{t.hero.chipAr}</p>
                <p className="text-sm font-bold text-verde-deep">98% · 3D</p>
              </div>
            </div>
          </div>

          {/* Stores badge */}
          <div className="absolute bottom-[16%] right-[6%] animate-float [animation-delay:-4s]" style={{ transform: "translateZ(130px)" }}>
            <div className="glass flex max-w-[15rem] items-center gap-3 rounded-[1.5rem] p-3">
              <div className="flex -space-x-3">
                {["/stack/si-appstore.svg", "/stack/si-googleplay.svg"].map((s) => (
                  <span key={s} className="tech-orb size-11">
                    <Image src={s} alt="" width={22} height={22} unoptimized />
                  </span>
                ))}
              </div>
              <p className="text-sm font-bold leading-snug">{t.hero.chipLive}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="tex-paper relative isolate h-[100svh] min-h-[600px] overflow-hidden">
      {/* Ambient color fields + dotted grid */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-40 top-1/3 size-[36rem] rounded-full bg-verde/15 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 -top-24 size-[32rem] rounded-full bg-anil/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 [background-image:radial-gradient(rgb(23_36_45/0.12)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_60%_45%,#000_20%,transparent_70%)]" />
      </div>

      <div className="mx-auto grid h-full max-w-[92rem] grid-rows-1 items-center gap-6 px-5 pb-20 pt-28 md:px-10 md:pt-36 xl:grid-cols-[1.12fr_1fr] xl:gap-4">
        <div className="relative z-10 flex max-w-3xl flex-col justify-center xl:max-w-none">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex w-fit items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-xs font-bold text-ink-soft sm:text-sm md:text-base [@media(max-height:700px)]:hidden max-xl:[@media(max-height:820px)]:hidden"
          >
            <span className="relative grid size-8 place-items-center rounded-full bg-verde text-white">
              <span className="absolute inset-0 rounded-full bg-verde" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
              <Glyph name="sparkle" className="relative size-4" strokeWidth={2.2} />
            </span>
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-[clamp(1rem,3vh,2rem)] font-display text-[clamp(2.5rem,min(5.2vw,8vh),5.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
            style={{ perspective: 600 }}
          >
            <span className="block">{t.hero.titleA}</span>
            <RotatingWord words={t.hero.words} />
            <span className="block text-balance">{t.hero.titleB}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-[clamp(0.9rem,2.6vh,1.75rem)] max-w-xl text-base text-ink-soft text-pretty sm:text-lg md:text-xl"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-[clamp(1.1rem,3.4vh,2.25rem)] flex flex-wrap gap-3"
          >
            <Button href="/work">{t.hero.cta1}</Button>
            <Button href="/expertise" variant="ghost">
              {t.hero.cta2}
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-[clamp(1.25rem,4vh,2.75rem)] grid grid-cols-3 items-start gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3 [@media(max-height:680px)]:hidden"
          >
            {t.hero.stats.map((s, i) => (
              <li key={s.label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left">
                <span className={`orb tone-${["green", "gold", "blue"][i]} size-14 font-display text-lg font-extrabold sm:size-16 sm:text-xl`}>{s.value}</span>
                <span className="max-w-[8.5rem] text-xs font-bold leading-snug text-ink-soft sm:text-sm md:text-base">{s.label}</span>
              </li>
            ))}
          </motion.ul>

          {/* Compact visual for small screens */}
          <div className="mt-8 hidden items-center gap-4 md:flex xl:hidden [@media(max-height:880px)]:hidden">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-[var(--shadow-lift)]">
              <video className="h-full w-full object-cover" src="/video/hero-vr.mp4" poster="/images/vr-player.jpg" autoPlay muted loop playsInline />
            </div>
            <div className="flex -space-x-3">
              {ring.slice(0, 6).map((tech) => (
                <span key={tech.name} className="tech-orb size-12">
                  <Image src={tech.icon} alt={tech.name} width={24} height={24} unoptimized />
                </span>
              ))}
            </div>
          </div>
        </div>

        <Scene />
      </div>

      <a
        href="#next"
        className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-muted md:flex"
      >
        <span className="grid h-10 w-6 justify-center rounded-full border-2 border-ink/30 pt-1.5">
          <motion.span className="size-1.5 rounded-full bg-verde" animate={{ y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </span>
        {t.hero.scroll}
      </a>
    </section>
  );
}
