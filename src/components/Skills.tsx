"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";
import type { LangStat, GitHubStats } from "@/lib/github";

const FALLBACK_LANGS: LangStat[] = [
  { name: "Python", level: 95, lines: 0 },
  { name: "TypeScript", level: 72, lines: 0 },
  { name: "JavaScript", level: 60, lines: 0 },
  { name: "Dart", level: 40, lines: 0 },
];

const INFRA_TAGS = [
  "AWS EC2 / ECS / Lambda",
  "GCP GCS",
  "Docker",
  "Ubuntu / Linux",
  "GitHub Actions",
  "MAAS",
  "PostgreSQL",
  "Guacamole",
];

const MOBILE_PLATFORMS = ["Android", "iOS", "Web"];
const DESIGN_TOOLS = ["Figma"];

function formatLines(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万行`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k行`;
  return `${n}行`;
}

function formatCount(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

type Props = {
  githubLanguages?: LangStat[];
  githubStats?: GitHubStats | null;
};

export default function Skills({ githubLanguages, githubStats }: Props) {
  const { ref, visible } = useScrollReveal();
  const fromGitHub = githubLanguages && githubLanguages.length > 0;
  const langItems = fromGitHub ? githubLanguages : FALLBACK_LANGS;

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="flex items-center px-6 py-24 bg-white/[0.02]"
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
          {/* Languages — GitHub bars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="font-mono text-xs tracking-widest text-white/40 uppercase border-b border-white/10 pb-3 flex justify-between">
              <span>Languages</span>
              {fromGitHub && <span className="text-white/20 normal-case tracking-normal">via GitHub</span>}
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

          {/* Infra / Cloud — tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            <h3 className="font-mono text-xs tracking-widest text-white/40 uppercase border-b border-white/10 pb-3">
              Infra / Cloud
            </h3>
            <div className="flex flex-wrap gap-2">
              {INFRA_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-white/50 border border-white/10 rounded px-2.5 py-1 hover:border-white/30 hover:text-white/80 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Mobile & Design — grouped */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="font-mono text-xs tracking-widest text-white/40 uppercase border-b border-white/10 pb-3">
                Platform
              </h3>
              <div className="flex flex-wrap gap-2">
                {MOBILE_PLATFORMS.map((p) => (
                  <span
                    key={p}
                    className="font-mono text-xs text-white/50 border border-white/10 rounded px-2.5 py-1 hover:border-white/30 hover:text-white/80 transition-colors"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-mono text-xs tracking-widest text-white/40 uppercase border-b border-white/10 pb-3">
                Design
              </h3>
              <div className="flex flex-wrap gap-2">
                {DESIGN_TOOLS.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs text-white/50 border border-white/10 rounded px-2.5 py-1 hover:border-white/30 hover:text-white/80 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* GitHub Stats banner */}
        {githubStats && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 border-t border-white/5 pt-10 grid grid-cols-3 gap-6"
          >
            {[
              { label: "総コード量", value: formatLines(githubStats.linesChanged) },
              { label: "コミット数", value: formatCount(githubStats.commits) },
              { label: "マージPR", value: formatCount(githubStats.mergedPRs) },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <p className="font-mono text-[10px] tracking-widest text-white/25 uppercase">{label}</p>
                <p className="text-2xl font-bold text-white/80">{value}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
