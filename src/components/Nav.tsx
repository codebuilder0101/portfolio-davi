"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { GlyphOrb, type GlyphName } from "./Glyph";

export const navLinks = [
  { href: "/", key: "home", glyph: "sparkle", tone: "green" },
  { href: "/about", key: "about", glyph: "talk", tone: "gold" },
  { href: "/expertise", key: "expertise", glyph: "build", tone: "blue" },
  { href: "/work", key: "work", glyph: "launch", tone: "coral" },
] as const satisfies readonly { href: string; key: string; glyph: GlyphName; tone: string }[];

export function Nav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav
        className={`mx-auto flex max-w-[92rem] items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 md:px-7 ${
          scrolled ? "glass bg-white/80! h-20 md:h-24" : "h-24 border border-transparent md:h-28"
        }`}
      >
        <Logo />

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative isolate block rounded-full px-6 py-3.5 font-display text-xl font-extrabold tracking-tight transition-colors ${
                    active ? "text-white" : "text-ink hover:text-verde-deep"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-ink shadow-[var(--shadow-lift)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {t.nav[l.key]}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            className="glass relative grid size-14 place-items-center rounded-full xl:hidden"
          >
            <span className="relative block h-4 w-6">
              <span className={`absolute left-0 h-[3px] w-6 rounded-full bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-[3px] w-6 rounded-full bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-[3px] w-6 rounded-full bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            aria-hidden
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10 bg-ink/25 backdrop-blur-sm xl:hidden"
          />
        )}
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="tex-paper relative mx-auto mt-3 max-w-[92rem] rounded-[2.5rem] p-6 shadow-[var(--shadow-lift)] ring-1 ring-white xl:hidden"
          >
            <ul className="grid gap-3">
              {navLinks.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link href={l.href} className="group flex items-center gap-5 rounded-full bg-white/60 p-2 pr-6 shadow-[var(--shadow-soft)]">
                    <GlyphOrb name={l.glyph} tone={l.tone} size="sm" />
                    <span className="font-display text-3xl font-extrabold tracking-tight">{t.nav[l.key]}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center sm:hidden">
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
