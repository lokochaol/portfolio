"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";

type Entry = {
  period: string;
  type: "edu" | "work";
  title: string;
  desc: string;
  current?: boolean;
};

const TIMELINE: Entry[] = [
  {
    period: "2018.04",
    type: "edu",
    title: "東京都市大学付属高等学校",
    desc: "入学",
  },
  {
    period: "2021.04",
    type: "edu",
    title: "東京理科大学",
    desc: "入学（工学部）",
  },
  {
    period: "2022.01",
    type: "edu",
    title: "42Tokyo",
    desc: "P2Pプログラミングスクール参加（〜2022.12）",
  },
  {
    period: "2023.11",
    type: "work",
    title: "インフラ / 公共事業",
    desc: "水道・下水社内システム開発。OCRパイプライン・帳票出力エンジン構築。チームリーダーとして納期管理・品質担保。（〜2024.05）",
  },
  {
    period: "2023.12",
    type: "work",
    title: "エンタメ / AI",
    desc: "某有名人AI音声変換Webアプリのバックエンド保守・バージョンアップ対応。（〜2024.01）",
  },
  {
    period: "2024.04",
    type: "work",
    title: "自動車整備",
    desc: "自動車整備ソフト開発。Amazon Connect着信通知システム実装・帳票PDF出力機能。（〜2025.04）",
  },
  {
    period: "2025.03",
    type: "edu",
    title: "東京理科大学 中退",
    desc: "",
  },
  {
    period: "2025.04",
    type: "edu",
    title: "大阪芸術大学 通信教育部",
    desc: "芸術学部 建築学科 入学（2028年3月卒業見込み）",
    current: true,
  },
  {
    period: "2025.04",
    type: "work",
    title: "ITクラウドインフラ",
    desc: "GPUベアメタルサーバー貸し出し管理・自動化システム開発。CI/CD・インフラ構築。（〜2025.08）",
  },
];

export default function Profile() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="profile"
      ref={ref as React.RefObject<HTMLElement>}
      className="px-6 py-24"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
            00 / Profile
          </span>
          <div className="mt-4 flex flex-wrap items-baseline gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">廣岡 晃一</h2>
            <span className="font-mono text-sm text-white/30">Hirooka Koichi · 23歳</span>
          </div>
          <p className="mt-6 text-white/50 text-sm leading-8 max-w-2xl">
            バックエンド開発（Python / Django / DRF）を中心に、インフラ（AWS / GCP）、
            フロントエンド（React / Vue.js）、モバイル（iOS / Android）まで幅広く対応するフルスタックエンジニア。
            RESTful APIの設計から実装・テスト・ドキュメント作成まで一貫して担当。
            テックリードとして技術方針策定・コードレビュー・進捗報告も経験。
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[5.5rem] sm:left-24 top-0 bottom-0 w-px bg-white/8 hidden sm:block" />

          <div className="space-y-0">
            {TIMELINE.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="relative flex gap-6 sm:gap-10 items-start group py-5 border-b border-white/[0.04] last:border-0"
              >
                {/* Period */}
                <div className="shrink-0 w-20 sm:w-24 text-right">
                  <span className="font-mono text-[11px] text-white/25 leading-relaxed tracking-wide">
                    {entry.period}
                  </span>
                </div>

                {/* Dot */}
                <div className="absolute left-[5.5rem] sm:left-24 top-6 -translate-x-1/2 hidden sm:block">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    entry.current
                      ? "bg-white/80"
                      : entry.type === "edu"
                      ? "bg-white/30"
                      : "bg-white/15"
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 sm:pl-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded ${
                      entry.type === "edu"
                        ? "text-white/40 border border-white/10"
                        : "text-white/40 border border-white/10"
                    }`}>
                      {entry.type === "edu" ? "学歴" : "職歴"}
                    </span>
                    {entry.current && (
                      <span className="font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded text-white/60 border border-white/20">
                        現在
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                    {entry.title}
                  </p>
                  {entry.desc && (
                    <p className="text-xs text-white/35 mt-1 leading-relaxed">{entry.desc}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
