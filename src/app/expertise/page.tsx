import type { Metadata } from "next";
import { ExpertiseView } from "@/components/Views";

export const metadata: Metadata = {
  title: "Expertise",
  description: "Flutter, React Native, Swift, Kotlin, AI/ML, AR/VR, web and cloud — the full toolkit.",
};

export default function Page() {
  return <ExpertiseView />;
}
