"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";
import type { LangStat } from "@/lib/github";

type ManualItem = { name: string; level: number };

const FALLBACK_LANGS: LangStat[] = [
  { name: "Python", level: 95, lines: 0 },
  { name: "Django / DRF", level: 90, lines: 0 },
  { name: "PostgreSQL", level: 80, lines: 0 },
  { name: "GitHub Actions", level: 75, lines: 0 },
];

const MANUAL_CATEGORIES: { category: string; items: ManualItem[] }[] = [
  {
    category: "Infra / Cloud",
    items: [
      { name: "AWS EC2/ECS/Lambda", level: 70 },
      { name: "GCP GCS", level: 65 },
      { name: "Docker", level: 78 },
      { name: "Ubuntu / Linux", level: 72 },
    ],
  },
  {
    category: "Frontend / Mobile",
    items: [
      { name: "React / Vue.js", level: 68 },
      { name: "TypeScript", level: 65 },
      { name: "Flutter", level: 65 },
      { name: "Figma", level: 70 },
    ],
  },
];

function formatLines(n: number): string {
  if (n === 0) return "";
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万行`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k行`;
  return `${n}行`;
}

type Props = {
  githubLanguages?: LangStat[];
};

export default function Skills({ githubLanguages }: Props) {
  const { ref, visible } = useScrollReveal();
  const fromGitHub = githubLanguages && githubLanguages.length > 0;
  const langItems = fromGitHub ? githubLanguages : FALLBACK_LANGS;

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-screen flex items-center px-6 py-24 bg-white/[0.02]"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-white/30 uppercase">02 / Skills</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">技術スタック</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* GitHub languages column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="font-mono text-xs tracking-widest text-white/40 uppercase border-b border-white/10 pb-3 flex justify-between">
              <span>Languages</span>
              {fromGitHub && (
                <span className="text-white/20 normal-case tracking-normal">via GitHub</span>
              )}
            </h3>
            {langItems.map(({ name, level, lines }, i) => (
              <div key={name} className="space-y-1.5">
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-white/80">{name}</span>
                  <span className="font-mono text-white/30 text-xs">{level}%</span>
                </div>
                <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-white/60"
                    initial={{ width: 0 }}
                    animate={visible ? { width: `${level}%` } : {}}
                    transition={{ duration: 1, delay: i * 0.08 + 0.3, ease: "easeOut" }}
                  />
                </div>
                {lines > 0 && (
                  <p className="font-mono text-[10px] text-white/15">{formatLines(lines)}</p>
                )}
              </div>
            ))}
          </motion.div>

          {/* Manual categories */}
          {MANUAL_CATEGORIES.map(({ category, items }, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: (ci + 1) * 0.15 }}
              className="space-y-6"
            >
              <h3 className="font-mono text-xs tracking-widest text-white/40 uppercase border-b border-white/10 pb-3">
                {category}
              </h3>
              {items.map(({ name, level }, i) => (
                <div key={name} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">{name}</span>
                    <span className="font-mono text-white/30 text-xs">{level}%</span>
                  </div>
                  <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-white/60"
                      initial={{ width: 0 }}
                      animate={visible ? { width: `${level}%` } : {}}
                      transition={{ duration: 1, delay: (ci + 1) * 0.15 + i * 0.08 + 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
