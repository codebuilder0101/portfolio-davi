"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { stack, type StackCategory } from "@/data/stack";
import { projects, type ProjectFilter } from "@/data/projects";
import { Kicker, Reveal, SectionHeading } from "../ui";
import { Glyph, GlyphOrb, type GlyphName } from "../Glyph";
import { TechIcon } from "../TechIcon";
import { Section } from "./Home";
import { WorkCard } from "./WorkCard";

type Tone = "green" | "gold" | "blue" | "coral" | "violet" | "teal";

/* ───────────── Page hero (inner pages) ───────────── */

export function PageHero({
  kicker,
  title,
  sub,
  image,
  imageAlt,
  orbs,
  shape = "shape-arch",
  imagePosition = "object-center",
}: {
  kicker: string;
  title: string;
  sub: string;
  image: string;
  imageAlt: string;
  orbs: { glyph: GlyphName; tone: Tone }[];
  shape?: string;
  imagePosition?: string;
}) {
  return (
    <section className="tex-paper relative isolate overflow-hidden px-5 pb-32 pt-36 md:px-8 md:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-40 top-0 size-[34rem] rounded-full bg-ouro/15 blur-3xl" />
        <div className="absolute -left-32 bottom-0 size-[28rem] rounded-full bg-verde/12 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgb(23_36_45/0.1)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_30%_40%,#000_10%,transparent_65%)]" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Kicker>{kicker}</Kicker>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] text-balance md:text-7xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-2xl text-xl text-ink-soft text-pretty"
          >
            {sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-10 flex gap-4"
          >
            {orbs.map((o, i) => (
              <motion.span key={o.glyph} className="group" animate={{ y: [0, -8, 0] }} transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.4 }}>
                <GlyphOrb name={o.glyph} tone={o.tone} size="md" />
              </motion.span>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -left-8 -top-8 size-40 rounded-full bg-gradient-to-br from-[#ffe39a] to-ouro" />
          <div className={`${shape} relative aspect-[4/5] overflow-hidden border-8 border-white shadow-[var(--shadow-lift)]`}>
            <Image src={image} alt={imageAlt} fill sizes="(max-width:1024px) 90vw, 30vw" className={`object-cover ${imagePosition}`} preload />
          </div>
          <div className="absolute -bottom-6 -right-4 size-28 rounded-full border-[6px] border-white bg-verde shadow-[var(--shadow-lift)] md:-right-8">
            <svg viewBox="0 0 100 100" className="size-full animate-spin-slow text-white/80" aria-hidden>
              <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 7" />
            </svg>
            <span className="absolute inset-0 grid place-items-center">
              <Glyph name="sparkle" className="size-10 text-white" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── About: story ───────────── */

export function Story() {
  const { t } = useI18n();
  return (
    <Section tex="linen">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="relative order-2 grid grid-cols-2 gap-5 lg:order-1">
          <div className="shape-arch relative col-span-1 row-span-2 min-h-[26rem] overflow-hidden border-[6px] border-white shadow-[var(--shadow-lift)]">
            <Image src="/images/office-1.jpg" alt="Bright, empty modern tech office" fill sizes="25vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-white shadow-[var(--shadow-lift)]">
            <Image src="/images/vr-controller.jpg" alt="Virtual reality controller on a desk" fill sizes="20vw" className="object-cover" />
          </div>
          <div className="shape-leaf relative aspect-square overflow-hidden border-[6px] border-white shadow-[var(--shadow-lift)]">
            <Image src="/images/uiux.jpg" alt="Designing an interface on a tablet" fill sizes="20vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading kicker={t.about.kicker} title={t.about.storyTitle} align="left" tone="ouro" />
          <div className="mt-8 grid gap-6">
            {t.about.story.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={`text-pretty ${i === 0 ? "text-2xl font-semibold leading-snug text-ink" : "text-xl text-ink-soft"}`}>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-6">
            {t.hero.stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className={`orb tone-${(["green", "gold", "blue"] as Tone[])[i]} size-20 font-display text-2xl font-extrabold`}>{s.value}</span>
                <span className="max-w-[8rem] text-base font-bold leading-snug text-ink-soft">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ───────────── About: roles ───────────── */

type RoleKey = keyof ReturnType<typeof useI18n>["t"]["about"]["roles"];
const roleGroups: { key: keyof ReturnType<typeof useI18n>["t"]["about"]["groups"]; glyph: GlyphName; tone: Tone; shape: string; roles: RoleKey[]; span: string }[] = [
  { key: "mobile", glyph: "mobile", tone: "green", shape: "rounded-[3rem]", span: "lg:col-span-2", roles: ["mobileDev", "flutter", "ios", "android", "rn", "iphone", "swift", "kotlin"] },
  { key: "design", glyph: "design", tone: "coral", shape: "shape-leaf", span: "", roles: ["mobileDesign", "uiux"] },
  { key: "web", glyph: "web", tone: "teal", shape: "shape-leaf-alt", span: "", roles: ["web", "python", "django"] },
  { key: "ai", glyph: "ai", tone: "violet", shape: "shape-arch pt-14", span: "", roles: ["ml"] },
  { key: "quality", glyph: "security", tone: "gold", shape: "shape-cut", span: "", roles: ["security", "tester", "promoter"] },
];

export function Roles() {
  const { t } = useI18n();
  return (
    <Section tex="paper">
      <SectionHeading kicker={t.about.rolesKicker} title={t.about.rolesTitle} sub={t.about.rolesSub} />
      <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {roleGroups.map((g, i) => (
          <Reveal key={g.key} delay={i * 0.08} className={`${g.span} [filter:drop-shadow(0_18px_28px_rgb(23_36_45/0.12))]`}>
            <div className={`group h-full bg-white/80 p-8 md:p-10 ${g.shape}`}>
              <div className="flex items-center gap-5">
                <GlyphOrb name={g.glyph} tone={g.tone} size="lg" />
                <h3 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">{t.about.groups[g.key]}</h3>
              </div>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {g.roles.map((r) => (
                  <li key={r} className="flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-base font-bold ring-1 ring-ink/5">
                    <span className={`orb tone-${g.tone} size-3 before:hidden`} />
                    {t.about.roles[r]}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ───────────── About: journey ───────────── */

const journeyMeta: { glyph: GlyphName; tone: Tone; img: string }[] = [
  { glyph: "mobile", tone: "green", img: "/images/mobile-2.jpg" },
  { glyph: "web", tone: "teal", img: "/images/code.jpg" },
  { glyph: "build", tone: "blue", img: "/images/team.jpg" },
  { glyph: "ai", tone: "violet", img: "/images/ai-1.jpg" },
];

export function Journey() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <Section tex="canvas">
      <SectionHeading kicker={t.about.journeyKicker} title={t.about.journeyTitle} tone="anil" />
      <div ref={ref} className="relative mt-20">
        <div className="absolute bottom-0 left-8 top-0 w-1.5 rounded-full bg-ink/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-0 left-8 top-0 w-1.5 origin-top rounded-full bg-gradient-to-b from-verde via-ouro to-anil md:left-1/2 md:-translate-x-1/2"
        />
        <ol className="grid gap-16">
          {t.about.journey.map((step, i) => {
            const m = journeyMeta[i];
            const right = i % 2 === 1;
            return (
              <li key={step.title} className="relative grid items-center gap-8 pl-24 md:grid-cols-2 md:pl-0">
                <div className="absolute left-8 top-6 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                  <span className="group block">
                    <GlyphOrb name={m.glyph} tone={m.tone} size="md" />
                  </span>
                </div>
                <Reveal className={`${right ? "md:order-2 md:pl-20" : "md:pr-20 md:text-right"}`}>
                  <span className="font-display text-lg font-extrabold uppercase tracking-[0.2em] text-anil-deep">{step.period}</span>
                  <h3 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">{step.title}</h3>
                  <p className="mt-3 text-xl text-ink-soft">{step.desc}</p>
                </Reveal>
                <Reveal delay={0.15} className={`${right ? "md:order-1 md:pr-20" : "md:pl-20"}`}>
                  <div className={`relative aspect-[16/10] overflow-hidden border-[6px] border-white shadow-[var(--shadow-lift)] ${right ? "shape-leaf-alt" : "shape-leaf"}`}>
                    <Image src={m.img} alt="" fill sizes="(max-width:768px) 80vw, 40vw" className="object-cover" />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

/* ───────────── Expertise: stack grid ───────────── */

const catMeta: { key: StackCategory; glyph: GlyphName; tone: Tone; shape: string; span: string }[] = [
  { key: "mobile", glyph: "mobile", tone: "green", shape: "rounded-[3.5rem]", span: "lg:col-span-2" },
  { key: "ai", glyph: "ai", tone: "violet", shape: "shape-leaf", span: "" },
  { key: "web", glyph: "web", tone: "teal", shape: "shape-leaf-alt", span: "" },
  { key: "backend", glyph: "build", tone: "blue", shape: "rounded-[3.5rem]", span: "" },
  { key: "cloud", glyph: "launch", tone: "coral", shape: "shape-cut", span: "" },
  { key: "xr", glyph: "xr", tone: "blue", shape: "shape-arch pt-16", span: "" },
  { key: "commerce", glyph: "shopify", tone: "gold", shape: "shape-leaf", span: "" },
  { key: "quality", glyph: "qa", tone: "green", shape: "rounded-[3.5rem]", span: "lg:col-span-2" },
];

export function StackGrid() {
  const { t } = useI18n();
  return (
    <Section tex="linen">
      <SectionHeading kicker={t.expertisePage.stackKicker} title={t.expertisePage.stackTitle} sub={t.expertisePage.stackSub} />
      <div className="mt-16 grid gap-7 lg:grid-cols-2">
        {catMeta.map((c, i) => (
          <Reveal key={c.key} delay={(i % 2) * 0.1} className={`${c.span} [filter:drop-shadow(0_18px_28px_rgb(23_36_45/0.12))]`}>
            <div className={`group h-full bg-white/75 p-8 md:p-10 ${c.shape}`}>
              <div className={`flex items-center gap-5 ${c.shape.includes("arch") ? "flex-col text-center" : ""}`}>
                <GlyphOrb name={c.glyph} tone={c.tone} size="lg" />
                <div>
                  <h3 className="font-display text-3xl font-extrabold leading-tight">{t.expertisePage.cats[c.key]}</h3>
                  <p className="text-base font-bold text-muted">{stack[c.key].length}+ {t.expertisePage.tools}</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-x-4 gap-y-7">
                {stack[c.key].map((tech) => (
                  <TechIcon key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ───────────── Expertise: process ───────────── */

const processGlyphs: { glyph: GlyphName; tone: Tone }[] = [
  { glyph: "discover", tone: "green" },
  { glyph: "design", tone: "coral" },
  { glyph: "build", tone: "blue" },
  { glyph: "test", tone: "violet" },
  { glyph: "launch", tone: "gold" },
  { glyph: "support", tone: "teal" },
];

export function Process() {
  const { t } = useI18n();
  return (
    <Section tex="paper">
      <SectionHeading kicker={t.expertisePage.processKicker} title={t.expertisePage.processTitle} tone="ouro" />
      <div className="relative mt-20">
        <svg aria-hidden viewBox="0 0 1200 200" preserveAspectRatio="none" className="absolute inset-x-0 top-10 hidden h-40 w-full lg:block">
          <motion.path
            d="M60 60 C 200 180, 300 180, 420 60 S 640 -60, 780 60 S 1000 180, 1140 60"
            fill="none"
            stroke="url(#proc-grad)"
            strokeWidth="4"
            strokeDasharray="10 12"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="proc-grad" x1="0" x2="1">
              <stop offset="0" stopColor="#0b9e6a" />
              <stop offset=".5" stopColor="#f4b53f" />
              <stop offset="1" stopColor="#2f63e8" />
            </linearGradient>
          </defs>
        </svg>
        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {t.expertisePage.process.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} className={`group flex flex-col items-center text-center ${i % 2 ? "lg:translate-y-24" : ""}`}>
              <div className="relative">
                <GlyphOrb name={processGlyphs[i].glyph} tone={processGlyphs[i].tone} size="xl" />
                <span className="absolute -right-1 -top-1 grid size-10 place-items-center rounded-full bg-ink font-display text-base font-extrabold text-white ring-4 ring-paper">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-extrabold">{step.title}</h3>
              <p className="mt-2 max-w-[13rem] text-base text-muted">{step.desc}</p>
            </Reveal>
          ))}
        </ol>
        <div className="h-24 max-lg:hidden" />
      </div>
    </Section>
  );
}

/* ───────────── Work: filterable grid ───────────── */

export function WorkGrid() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<"all" | ProjectFilter>("all");
  const list = filter === "all" ? projects : projects.filter((p) => p.filters.includes(filter));
  const filters = ["all", "mobile", "ai", "xr", "web"] as const;

  return (
    <Section tex="linen">
      <div className="flex justify-center">
        <div role="tablist" className="glass flex flex-wrap justify-center gap-1 rounded-full p-1.5">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`relative isolate rounded-full px-6 py-3 font-display text-lg font-extrabold transition-colors ${filter === f ? "text-white" : "text-ink-soft hover:text-ink"}`}
            >
              {filter === f && (
                <motion.span layoutId="work-filter" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{t.work.filters[f]}</span>
            </button>
          ))}
        </div>
      </div>
      <motion.div layout className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.key}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <WorkCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <p className="mx-auto mt-16 max-w-2xl text-center text-base text-muted">{t.workPage.note}</p>
    </Section>
  );
}
