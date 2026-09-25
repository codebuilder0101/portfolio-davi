"use client";

import { MotionConfig } from "motion/react";
import { I18nProvider } from "@/i18n/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </I18nProvider>
  );
}
