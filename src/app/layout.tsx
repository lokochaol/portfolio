import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Backend Engineer · Python · Django · FastAPI · フルサイクルエンジニア",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="bg-[#080808] text-white antialiased">{children}</body>
    </html>
  );
}
