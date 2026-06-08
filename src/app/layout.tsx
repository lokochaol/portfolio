import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const BASE_URL = "https://koichi.hirooka.me/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "廣岡晃一（Hirooka Koichi）| バックエンドエンジニア",
    template: "%s | 廣岡晃一",
  },
  description:
    "廣岡晃一（Hirooka Koichi）のポートフォリオ。Python・Django・DRF を主軸としたバックエンドエンジニア。REST API 設計、OCR パイプライン、AWS インフラ構築、Flutter モバイル開発まで対応可能なフルサイクルエンジニア。東京理科大学・大阪芸術大学通信教育部・42Tokyo 出身。",
  keywords: [
    "廣岡晃一",
    "Backend Engineer",
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
  authors: [{ name: "廣岡晃一", url: BASE_URL }],
  creator: "廣岡晃一",
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "廣岡晃一 | Backend Engineer",
    description:
      "Python・Django・DRF を主軸としたバックエンドエンジニアのポートフォリオ。REST API 設計からインフラ・モバイルまで対応。",
    siteName: "廣岡晃一 Portfolio",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "廣岡晃一 | Backend Engineer",
    description:
      "Python・Django・DRF を主軸としたバックエンドエンジニアのポートフォリオ。",
  },
  alternates: {
    canonical: BASE_URL,
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
