"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";

const projects = [
  {
    number: "01",
    title: "monote",
    description: "iOS向けメモアプリ。App Storeにてリリース済み。",
    tags: ["iOS", "Swift", "App Store"],
    link: "https://apps.apple.com/jp/app/monote/id6762173359",
  },
  {
    number: "02",
    title: "Portfolio",
    description: "このポートフォリオサイト。Three.js パーティクル背景・Framer Motion スクロールアニメーション・GitHub API 連携を実装。",
    tags: ["Next.js", "TypeScript", "Three.js", "Framer Motion"],
    link: "https://github.com/lokochaol/portfolio",
  },
];

export default function Projects() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-screen flex items-center px-6 py-24"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-white/30 uppercase">03 / Projects</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">制作物</h2>
        </motion.div>

        <div className="space-y-4">
          {projects.map(({ number, title, description, tags, link }, i) => (
            <motion.a
              key={number}
              href={link}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group block border border-white/10 rounded-xl p-6 hover:border-white/30 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
              data-cursor="hover"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 items-start min-w-0">
                  <span className="font-mono text-xs text-white/20 mt-1 shrink-0">{number}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">{description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-white/30 border border-white/10 rounded px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-white/20 group-hover:text-white/60 transition-colors text-xl shrink-0 mt-1">
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
