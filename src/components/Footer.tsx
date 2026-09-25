"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { Flag } from "./Flags";
import { navLinks } from "./Nav";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="sheet tex-linen -mt-14 px-5 pb-10 pt-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-lg text-ink-soft">{t.footer.tagline}</p>
          </div>
          <nav aria-label={t.footer.explore}>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-muted">{t.footer.explore}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-display text-xl font-extrabold hover:text-verde-deep">
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col items-start gap-5 md:items-end">
            <LanguageToggle />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-3 font-display text-lg font-extrabold"
            >
              {t.footer.backTop}
              <span className="orb tone-green size-12 transition-transform group-hover:-translate-y-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <path d="M12 19V5M6 11l6-6 6 6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 text-base text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Davi José da Silva. {t.footer.rights}</p>
          <p className="flex items-center gap-2 font-semibold">
            <Flag code="pt" className="size-6" /> {t.footer.made}
          </p>
        </div>
      </div>
    </footer>
  );
}
