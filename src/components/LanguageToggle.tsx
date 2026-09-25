"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { locales } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n/provider";
import { Flag } from "./Flags";

/** Segmented toggle with a sliding thumb — PT / EN / ES. */
export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const id = useId();

  return (
    <div
      role="radiogroup"
      aria-label={t.nav.language}
      className="glass relative flex items-center gap-1 rounded-full p-1.5"
    >
      {locales.map((l) => {
        const active = l.code === locale;
        return (
          <button
            key={l.code}
            role="radio"
            aria-checked={active}
            aria-label={l.name}
            title={l.name}
            onClick={() => setLocale(l.code)}
            className={`relative z-10 flex items-center gap-2 rounded-full py-1.5 font-display text-base font-extrabold transition-colors ${
              compact ? "px-2" : "px-3"
            } ${active ? "text-white" : "text-ink-soft hover:text-ink"}`}
          >
            {active && (
              <motion.span
                layoutId={`lang-thumb-${id}`}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-verde to-verde-deep shadow-[var(--shadow-glow-green)]"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <Flag code={l.code} className="size-7" />
            {!compact && <span>{l.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
