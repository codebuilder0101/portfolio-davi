"use client";

import { useI18n } from "@/i18n/provider";
import { Button } from "@/components/ui";
import { GlyphOrb } from "@/components/Glyph";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <section className="tex-paper grid min-h-[100svh] place-items-center px-5 pb-24 pt-36 text-center">
      <div className="group flex flex-col items-center">
        <GlyphOrb name="discover" tone="gold" size="xl" />
        <p className="mt-8 font-display text-8xl font-extrabold tracking-tight text-shimmer">404</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold">{t.notFound.title}</h1>
        <div className="mt-10">
          <Button href="/">{t.notFound.back}</Button>
        </div>
      </div>
    </section>
  );
}
