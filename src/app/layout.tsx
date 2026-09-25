import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Davi — Mobile App & AI Developer · iOS, Android & Web",
    template: "%s · Davi",
  },
  description:
    "Davi is a Brazilian Mobile App & Website Developer with 10+ years and 500+ clients. Flutter, React Native, SwiftUI, Kotlin, AI-powered apps, AR/VR and modern web.",
  keywords: ["Flutter developer", "React Native", "iOS developer", "Android developer", "Swift", "Kotlin", "AI apps", "Machine learning", "Django", "Brazil"],
  authors: [{ name: "Davi" }],
  openGraph: {
    type: "website",
    siteName: "davi.dev",
    title: "Davi — Mobile App & AI Developer",
    description: "10+ years · 500+ clients · Flutter, React Native, iOS, Android, AI and Web.",
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f8f3ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable} antialiased`}>
      <body className="min-h-screen overflow-x-hidden">
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
