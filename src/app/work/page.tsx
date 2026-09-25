import type { Metadata } from "next";
import { WorkView } from "@/components/Views";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected mobile, AI, AR/VR and web products across fintech, healthcare, delivery and more.",
};

export default function Page() {
  return <WorkView />;
}
