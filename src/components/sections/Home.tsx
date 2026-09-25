"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useI18n } from "@/i18n/provider";
import { marqueeBottom, marqueeTop, type Tech } from "@/data/stack";
import { projects } from "@/data/projects";
import { Button, Reveal, SectionHeading, Tilt, Kicker } from "../ui";
import { Glyph, GlyphOrb, type GlyphName } from "../Glyph";
import { WorkCard } from "./WorkCard";

type Tone = "green" | "gold" | "blue" | "coral" | "violet" | "teal";
type Tex = "paper" | "linen" | "canvas" | "leather";
// Literal class names so Tailwind can see them.
const texClass: Record<Tex, string> = { paper: "tex-paper", linen: "tex-linen", canvas: "tex-canvas", leather: "tex-leather" };

/** Each section is a textured "sheet" that overlaps the one above it. */
export function Section({
  tex,
  id,
  className = "",
  children,
  first = false,
}: {
  tex: Tex;
  id?: string;
  className?: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section id={id} className={`${texClass[tex]} ${first ? "" : "sheet -mt-14"} relative px-5 pb-32 pt-24 md:px-8 md:pt-32 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

/* ───────────── Tech marquee ───────────── */

function MarqueeRow({ items, reverse = false }: { items: Tech[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden py-3">
      <div
        className={`flex w-max gap-5 hover:[animation-play-state:paused] ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
      >
        {doubled.map((tech, i) => (
          <div key={`${tech.name}-${i}`} className="flex items-center gap-4 rounded-full bg-white/70 py-2.5 pl-2.5 pr-7 shadow-[var(--shadow-soft)] ring-1 ring-white">
            <span className="tech-orb size-16 md:size-20">
              <Image src={tech.icon} alt="" width={44} height={44} className="size-[55%]" unoptimized />
            </span>
            <span className="whitespace-nowrap font-display text-xl font-extrabold md:text-2xl">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  const { t } = useI18n();
  return (
    <section id="next" className="tex-linen sheet -mt-14 py-20">
      <div className="mx-auto mb-8 flex max-w-7xl items-center justify-center gap-4 px-5">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-ink/20" />
        <Kicker>{t.marquee.label}</Kicker>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-ink/20" />
      </div>
      <MarqueeRow items={marqueeTop} />
      <MarqueeRow items={marqueeBottom} reverse />
    </section>
  );
}

/* ───────────── About teaser ───────────── */

function RotatingBadge({ value, text }: { value: string; text: string }) {
  const label = `${text} • ${text} • `.toUpperCase();
  return (
    <div className="relative grid size-40 place-items-center rounded-full bg-ink text-white shadow-[var(--shadow-lift)] md:size-44">
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fill="#f4b53f" fontSize="15.5" fontWeight="800" letterSpacing="3.2">
          <textPath href="#badge-circle">{label}</textPath>
        </text>
      </svg>
      <span className="font-display text-5xl font-extrabold">{value}</span>
    </div>
  );
}

export function AboutTeaser() {
  const { t } = useI18n();
  return (
    <Section tex="paper">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative mx-auto h-[30rem] w-full max-w-xl md:h-[36rem]">
          <div className="shape-blob absolute left-0 top-0 h-[70%] w-[72%] overflow-hidden border-[6px] border-white shadow-[var(--shadow-lift)]">
            <Image src="/images/team.jpg" alt="Developers collaborating in a modern office" fill sizes="(max-width:768px) 80vw, 35vw" className="object-cover" />
          </div>
          <div className="shape-arch absolute bottom-0 right-0 h-[62%] w-[44%] overflow-hidden border-[6px] border-white shadow-[var(--shadow-lift)]">
            <Image src="/images/workspace-light.jpg" alt="Bright, minimal workspace" fill sizes="25vw" className="object-cover" />
          </div>
          <div className="absolute bottom-[6%] left-[8%] size-32 overflow-hidden rounded-full border-[6px] border-white shadow-[var(--shadow-lift)] md:size-40">
            <Image src="/images/mobile-1.jpg" alt="" fill sizes="160px" className="object-cover" />
          </div>
          <div className="absolute right-[2%] top-[4%]">
            <RotatingBadge value="10+" text={t.aboutTeaser.badge} />
          </div>
        </Reveal>

        <div>
          <SectionHeading kicker={t.aboutTeaser.kicker} title={t.aboutTeaser.title} align="left" tone="ouro" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-ink-soft text-pretty">{t.aboutTeaser.body}</p>
            <ul className="mt-8 grid gap-4">
              {t.aboutTeaser.points.map((p, i) => (
                <li key={p} className="group flex items-center gap-4">
                  <GlyphOrb name={(["mobile", "ai", "support"] as GlyphName[])[i]} tone={(["green", "violet", "gold"] as Tone[])[i]} size="sm" />
                  <span className="text-lg font-bold">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/about">{t.aboutTeaser.more}</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ───────────── Services — mixed silhouettes ───────────── */

const serviceLayout: {
  key: keyof ReturnType<typeof useI18n>["t"]["services"]["items"];
  glyph: GlyphName;
  tone: Tone;
  variant: "arch" | "leaf" | "ticket" | "pill" | "cut" | "leaf-alt" | "circle";
  span: string;
}[] = [
  { key: "mobile", glyph: "mobile", tone: "green", variant: "arch", span: "lg:row-span-2" },
  { key: "ai", glyph: "ai", tone: "violet", variant: "leaf", span: "md:col-span-2" },
  { key: "xr", glyph: "xr", tone: "blue", variant: "ticket", span: "" },
  { key: "web", glyph: "web", tone: "teal", variant: "pill", span: "md:col-span-2" },
  { key: "design", glyph: "design", tone: "coral", variant: "cut", span: "" },
  { key: "security", glyph: "security", tone: "green", variant: "leaf-alt", span: "" },
  { key: "qa", glyph: "qa", tone: "gold", variant: "circle", span: "" },
  { key: "growth", glyph: "growth", tone: "coral", variant: "ticket", span: "md:col-span-2" },
];

function ServiceCard({ item, title, desc, i }: { item: (typeof serviceLayout)[number]; title: string; desc: string; i: number }) {
  const base = "group relative h-full bg-white/75 backdrop-blur-sm transition-all duration-500 hover:bg-white";
  const body = (
    <>
      <GlyphOrb name={item.glyph} tone={item.tone} size="lg" />
      <div>
        <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-[1.7rem]">{title}</h3>
        <p className="mt-3 text-lg text-muted">{desc}</p>
      </div>
    </>
  );

  let inner: React.ReactNode;
  switch (item.variant) {
    case "arch":
      inner = <div className={`${base} shape-arch flex flex-col items-center gap-8 px-8 pb-10 pt-16 text-center ring-1 ring-white`}>{body}<ArchDecor /></div>;
      break;
    case "pill":
      inner = <div className={`${base} shape-pill flex items-center gap-7 px-8 py-8 ring-1 ring-white md:pr-14`}>{body}</div>;
      break;
    case "circle":
      inner = (
        <div className={`${base} mx-auto flex aspect-square max-w-[22rem] flex-col items-center justify-center gap-5 rounded-full p-10 text-center ring-1 ring-white`}>
          {body}
        </div>
      );
      break;
    case "cut":
      inner = <div className={`${base} shape-cut flex flex-col gap-7 p-9`}>{body}</div>;
      break;
    case "ticket":
      inner = (
        <div className={`${base} shape-ticket flex flex-col gap-7 p-9`}>
          {body}
          <span aria-hidden className="absolute inset-x-8 top-[58%] border-t-2 border-dashed border-ink/10" />
        </div>
      );
      break;
    default:
      inner = <div className={`${base} shape-${item.variant} flex flex-col gap-7 p-9 ring-1 ring-white`}>{body}</div>;
  }

  return (
    <Reveal delay={(i % 4) * 0.08} className={`${item.span} [filter:drop-shadow(0_18px_28px_rgb(23_36_45/0.12))]`}>
      <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
        {inner}
      </motion.div>
    </Reveal>
  );
}

function ArchDecor() {
  return (
    <div aria-hidden className="mt-auto flex w-full flex-col items-center gap-3">
      <div className="relative h-40 w-24 rounded-[1.6rem] border-[5px] border-ink bg-gradient-to-b from-verde/20 to-ouro/25 p-2">
        <div className="mx-auto h-1.5 w-8 rounded-full bg-ink" />
        {[70, 45, 85].map((w, i) => (
          <motion.div
            key={i}
            className="mt-3 h-3 rounded-full bg-white"
            initial={{ width: "20%" }}
            whileInView={{ width: `${w}%` }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, repeat: Infinity, repeatType: "reverse", repeatDelay: 1.5 }}
          />
        ))}
        <div className="absolute bottom-3 left-1/2 size-8 -translate-x-1/2 rounded-full bg-verde" />
      </div>
    </div>
  );
}

export function Services() {
  const { t } = useI18n();
  return (
    <Section tex="canvas">
      <SectionHeading kicker={t.services.kicker} title={t.services.title} sub={t.services.sub} tone="anil" />
      <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
        {serviceLayout.map((s, i) => (
          <ServiceCard key={s.key} item={s} i={i} title={t.services.items[s.key].title} desc={t.services.items[s.key].desc} />
        ))}
      </div>
    </Section>
  );
}

/* ───────────── Immersive: AI / AR / VR ───────────── */

export function Immersive() {
  const { t } = useI18n();
  const rows: { key: "ai" | "ar" | "vr"; img: string; glyph: GlyphName; tone: Tone }[] = [
    { key: "ai", img: "/images/ai-robot.jpg", glyph: "ai", tone: "violet" },
    { key: "ar", img: "/images/vr-studio.jpg", glyph: "ar", tone: "teal" },
    { key: "vr", img: "/images/vr-3.jpg", glyph: "vr", tone: "blue" },
  ];
  return (
    <Section tex="paper">
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <Tilt className="shape-leaf" max={7}>
            <div className="shape-leaf relative aspect-[4/3] overflow-hidden border-[8px] border-white shadow-[var(--shadow-lift)]">
              <video className="absolute inset-0 h-full w-full object-cover" src="/video/vr-landscape.mp4" poster="/images/vr-2.jpg" autoPlay muted loop playsInline />
              <div className="absolute inset-0 bg-gradient-to-tr from-anil/40 via-transparent to-ouro/20 mix-blend-multiply" />
            </div>
            <div className="glass absolute -bottom-6 left-8 flex items-center gap-3 rounded-full py-2 pl-2 pr-5" style={{ transform: "translateZ(60px)" }}>
              <span className="grid size-10 place-items-center rounded-full bg-coral text-white">
                <svg viewBox="0 0 24 24" className="size-4 fill-current"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span className="font-display text-lg font-extrabold">{t.immersive.caption}</span>
            </div>
            <div className="absolute -right-5 -top-5 animate-float" style={{ transform: "translateZ(80px)" }}>
              <GlyphOrb name="sparkle" tone="gold" size="md" />
            </div>
          </Tilt>
        </Reveal>

        <div>
          <SectionHeading kicker={t.immersive.kicker} title={t.immersive.title} sub={t.immersive.sub} align="left" tone="anil" />
          <ul className="mt-10 grid gap-5">
            {rows.map((r, i) => (
              <Reveal key={r.key} delay={i * 0.1}>
                <li className="group flex items-center gap-5 rounded-full bg-white/70 p-2.5 pr-8 shadow-[var(--shadow-soft)] ring-1 ring-white transition-all duration-500 hover:translate-x-2 hover:bg-white">
                  <div className="relative shrink-0">
                    <div className="relative size-24 overflow-hidden rounded-full md:size-28">
                      <Image src={r.img} alt="" fill sizes="112px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <span className={`orb tone-${r.tone} absolute -bottom-1 -right-1 size-11 [&>svg]:size-6 before:hidden`}>
                      <Glyph name={r.glyph} />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-extrabold">{t.immersive.items[r.key].title}</h3>
                    <p className="mt-1 text-base text-muted md:text-lg">{t.immersive.items[r.key].desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ───────────── Industries — coin grid ───────────── */

const industryGlyphs: { key: keyof ReturnType<typeof useI18n>["t"]["industries"]["list"]; glyph: GlyphName; tone: Tone }[] = [
  { key: "fintech", glyph: "fintech", tone: "green" },
  { key: "edutech", glyph: "edutech", tone: "blue" },
  { key: "health", glyph: "health", tone: "coral" },
  { key: "food", glyph: "food", tone: "gold" },
  { key: "taxi", glyph: "taxi", tone: "gold" },
  { key: "ondemand", glyph: "ondemand", tone: "violet" },
  { key: "ecommerce", glyph: "ecommerce", tone: "teal" },
  { key: "shopify", glyph: "shopify", tone: "green" },
  { key: "booking", glyph: "booking", tone: "blue" },
  { key: "logistics", glyph: "logistics", tone: "coral" },
  { key: "more", glyph: "more", tone: "violet" },
];

export function Industries() {
  const { t } = useI18n();
  return (
    <Section tex="linen">
      <SectionHeading kicker={t.industries.kicker} title={t.industries.title} sub={t.industries.sub} />
      <ul className="mx-auto mt-16 flex max-w-[74rem] flex-wrap justify-center gap-x-5 gap-y-5 md:gap-x-6">
        {industryGlyphs.map((ind, i) => (
          <motion.li
            key={ind.key}
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 160, damping: 16, delay: i * 0.05 }}
            className="group"
          >
            <div className="flex size-40 flex-col items-center justify-center gap-3 rounded-full md:size-44 bg-white/75 text-center shadow-[var(--shadow-soft)] ring-1 ring-white transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white group-hover:shadow-[var(--shadow-lift)] ">
              <GlyphOrb name={ind.glyph} tone={ind.tone} size="md" />
              <span className="max-w-[8.5rem] font-display text-base font-extrabold leading-tight md:text-lg">{t.industries.list[ind.key]}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}

/* ───────────── Featured work ───────────── */

export function FeaturedWork() {
  const { t } = useI18n();
  return (
    <Section tex="paper">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading kicker={t.work.kicker} title={t.work.title} sub={t.work.sub} align="left" />
        <Reveal>
          <Button href="/work" variant="ghost">
            {t.work.viewAll}
          </Button>
        </Reveal>
      </div>
      <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 6).map((p, i) => (
          <Reveal key={p.key} delay={(i % 3) * 0.1} className={i % 3 === 1 ? "lg:translate-y-16" : ""}>
            <WorkCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ───────────── Values — leather tags ───────────── */

const valueLayout: { key: "talk" | "quality" | "time" | "detail" | "support"; glyph: GlyphName; rot: string; shape: string }[] = [
  { key: "talk", glyph: "talk", rot: "md:-rotate-3", shape: "rounded-[2.75rem]" },
  { key: "quality", glyph: "quality", rot: "md:rotate-2 md:translate-y-8", shape: "shape-arch" },
  { key: "time", glyph: "time", rot: "md:-rotate-1", shape: "shape-blob" },
  { key: "detail", glyph: "detail", rot: "md:rotate-3 md:translate-y-8", shape: "shape-leaf" },
  { key: "support", glyph: "support", rot: "md:-rotate-2", shape: "rounded-[2.75rem]" },
];

export function Values() {
  const { t } = useI18n();
  return (
    <Section tex="leather">
      <SectionHeading kicker={t.values.kicker} title={t.values.title} tone="ouro" />
      <div className="mt-16 grid items-start gap-7 pb-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        {valueLayout.map((v, i) => (
          <Reveal key={v.key} delay={i * 0.08} className={`${v.rot} transition-transform duration-500 hover:rotate-0`}>
            <div
              className={`tex-leather-cognac stitched group flex h-full min-h-[21rem] flex-col items-center gap-5 px-7 py-10 text-center text-white shadow-[0_30px_50px_-24px_rgb(80_40_10/0.7),inset_0_2px_0_rgb(255_255_255/0.15)] ${v.shape}`}
            >
              <span className="orb tone-gold size-20 [&>svg]:size-10">
                <Glyph name={v.glyph} />
              </span>
              <h3 className="font-display text-2xl font-extrabold leading-tight">{t.values.items[v.key].title}</h3>
              <p className="text-base font-medium text-white/90">{t.values.items[v.key].desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ───────────── Closing banner ───────────── */

export function Closing() {
  const { t } = useI18n();
  return (
    <Section tex="paper" className="pb-40">
      <Reveal>
        <div className="shape-leaf relative isolate overflow-hidden px-6 py-20 text-center shadow-[var(--shadow-lift)] md:px-16 md:py-28">
          <Image src="/images/office-1.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-verde/90 via-verde-deep/85 to-anil/80" />
          <div aria-hidden className="absolute -left-16 -top-16 size-64 rounded-full border-[28px] border-white/10" />
          <div aria-hidden className="absolute -bottom-24 -right-10 size-80 rounded-full bg-ouro/30 blur-2xl" />
          <div className="absolute left-[8%] top-[18%] hidden animate-float md:block">
            <GlyphOrb name="mobile" tone="gold" size="md" />
          </div>
          <div className="absolute bottom-[16%] right-[8%] hidden animate-float [animation-delay:-3s] md:block">
            <GlyphOrb name="ai" tone="violet" size="md" />
          </div>
          <Kicker tone="light">Davi José da Silva</Kicker>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance md:text-7xl">
            {t.closing.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">{t.closing.sub}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/work" variant="light">
              {t.closing.cta1}
            </Button>
            <Button href="/expertise" variant="ghost">
              {t.closing.cta2}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
