"use client";

import { useI18n } from "@/i18n/provider";
import { Closing, Immersive, Industries, Services, Values } from "./sections/Home";
import { Journey, PageHero, Process, Roles, StackGrid, Story, WorkGrid } from "./sections/Pages";

export function AboutView() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        kicker={t.about.kicker}
        title={t.about.title}
        sub={t.about.sub}
        image="/images/computer.jpg"
        imageAlt="Developer workstation with a monitor, RGB keyboard and desktop tower"
        imagePosition="object-[38%_center]"
        orbs={[
          { glyph: "mobile", tone: "green" },
          { glyph: "ai", tone: "violet" },
          { glyph: "design", tone: "coral" },
          { glyph: "support", tone: "gold" },
        ]}
      />
      <Story />
      <Roles />
      <Journey />
      <Values />
      <Closing />
    </>
  );
}

export function ExpertiseView() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        kicker={t.expertisePage.kicker}
        title={t.expertisePage.title}
        sub={t.expertisePage.sub}
        image="/images/ar-1.jpg"
        imageAlt="White virtual reality headset and controllers"
        shape="shape-blob"
        orbs={[
          { glyph: "build", tone: "blue" },
          { glyph: "xr", tone: "teal" },
          { glyph: "security", tone: "green" },
          { glyph: "launch", tone: "coral" },
        ]}
      />
      <StackGrid />
      <Services />
      <Process />
      <Industries />
      <Closing />
    </>
  );
}

export function WorkView() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        kicker={t.workPage.kicker}
        title={t.workPage.title}
        sub={t.workPage.sub}
        image="/images/setup-dark.jpg"
        imageAlt="Developer setup with monitors full of code and a smartphone"
        shape="shape-leaf"
        orbs={[
          { glyph: "fintech", tone: "green" },
          { glyph: "health", tone: "coral" },
          { glyph: "vr", tone: "blue" },
          { glyph: "ecommerce", tone: "gold" },
        ]}
      />
      <WorkGrid />
      <Immersive />
      <Closing />
    </>
  );
}
