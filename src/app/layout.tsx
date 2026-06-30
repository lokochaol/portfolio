import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Canonical URL has no trailing slash. The site redirects /portfolio/ -> /portfolio
// (trailingSlash: false), so the indexable 200 page is the slash-less form.
const CANONICAL_URL = "https://koichi.hirooka.me/portfolio";
// metadataBase keeps a trailing slash so relative metadata (e.g. the generated
// Open Graph image) resolves under /portfolio/ instead of the domain root.
const METADATA_BASE = "https://koichi.hirooka.me/portfolio/";

export const metadata: Metadata = {
  metadataBase: new URL(METADATA_BASE),
  title: {
    default: "廣岡晃一 | フリーランスエンジニア・ポートフォリオ",
    template: "%s | 廣岡晃一",
  },
  description:
    "廣岡晃一（Koichi Hirooka）のポートフォリオ。Python/Django・Flutter・AWS を得意とするフリーランスエンジニア。REST API 設計、AWS インフラ構築、Flutter モバイル開発まで対応。",
  keywords: [
    "廣岡晃一",
    "Koichi Hirooka",
    "k.hirooka",
    "フリーランスエンジニア",
    "バックエンドエンジニア",
    "Python",
    "Django",
    "DRF",
    "React",
    "Flutter",
    "AWS",
    "Docker",
    "ポートフォリオ",
    "フルサイクルエンジニア",
  ],
  authors: [{ name: "廣岡晃一", url: CANONICAL_URL }],
  creator: "廣岡晃一",
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    title: "廣岡晃一 Portfolio",
    description:
      "廣岡晃一（Koichi Hirooka）のポートフォリオ。Python/Django・Flutter・AWS を得意とするフリーランスエンジニア。",
    siteName: "廣岡晃一 Portfolio",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "廣岡晃一 Portfolio",
    description:
      "廣岡晃一（Koichi Hirooka）のポートフォリオ。Python/Django・Flutter・AWS を得意とするフリーランスエンジニア。",
  },
  alternates: {
    canonical: CANONICAL_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="bg-[#080808] text-white antialiased">{children}</body>
    </html>
  );
}
