import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `Монтаж кондиціонерів ${SITE.city} — ${SITE.brand}`,
  description: `Установка кондиціонерів і спліт-систем у місті ${SITE.city}. Фіксована ціна, монтаж за один день, гарантія ${SITE.warrantyYears} роки. Залиште заявку.`,
  openGraph: {
    title: `Монтаж кондиціонерів — ${SITE.brand}`,
    description: "Фіксована ціна, монтаж за один день, гарантія на роботи.",
    type: "website",
    locale: "uk_UA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0877a8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
