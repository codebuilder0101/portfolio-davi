import type { Dict } from "@/i18n/dictionaries";

export type ProjectKey = keyof Dict["work"]["projects"];
export type ProjectFilter = "mobile" | "ai" | "xr" | "web";

export type Project = {
  key: ProjectKey;
  image: string;
  tags: string[];
  filters: ProjectFilter[];
  /** Card silhouette — varied on purpose so the grid never feels uniform. */
  shape: "arch" | "leaf" | "ticket" | "pill" | "cut";
  tone: "green" | "gold" | "blue" | "coral" | "violet" | "teal";
};

export const projects: Project[] = [
  { key: "wallet", image: "/images/fintech.jpg", tags: ["Flutter", "Firebase", "Stripe"], filters: ["mobile"], shape: "arch", tone: "green" },
  { key: "ai", image: "/images/ai-1.jpg", tags: ["OpenAI", "Python", "React Native"], filters: ["ai", "mobile"], shape: "leaf", tone: "violet" },
  { key: "vr", image: "/images/vr-player.jpg", tags: ["Unity", "Meta Quest", "C#"], filters: ["xr"], shape: "cut", tone: "blue" },
  { key: "health", image: "/images/health.jpg", tags: ["SwiftUI", "Kotlin", "Django"], filters: ["mobile", "web"], shape: "ticket", tone: "teal" },
  { key: "food", image: "/images/delivery.jpg", tags: ["React Native", "Node.js", "Maps"], filters: ["mobile"], shape: "pill", tone: "coral" },
  { key: "ar", image: "/images/vr-studio.jpg", tags: ["ARKit", "ARCore", "Flutter"], filters: ["xr", "mobile"], shape: "leaf", tone: "gold" },
  { key: "shop", image: "/images/ecommerce.jpg", tags: ["Shopify", "Next.js", "Swift"], filters: ["web", "mobile"], shape: "arch", tone: "green" },
  { key: "ride", image: "/images/mobile-1.jpg", tags: ["Kotlin", "Swift", "Google Maps"], filters: ["mobile"], shape: "cut", tone: "gold" },
  { key: "learn", image: "/images/code.jpg", tags: ["Flutter", "TensorFlow", "FastAPI"], filters: ["ai", "mobile", "web"], shape: "ticket", tone: "blue" },
];
