import type { Metadata } from "next";
import { AboutView } from "@/components/Views";

export const metadata: Metadata = {
  title: "About",
  description: "About Davi José da Silva — a Brazilian mobile & web developer with 10+ years and 500+ clients.",
};

export default function Page() {
  return <AboutView />;
}
