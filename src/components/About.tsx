"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";

export default function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-screen flex items-center px-6 py-24"
    >
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-xs tracking-widest text-white/30 uppercase">01 / About</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-6 leading-tight">
            コードを書くことが<br />
            <span className="text-white/30">思考することと</span><br />
            同義な人間。
          </h2>
          <p className="text-white/50 leading-8 text-sm">
            バックエンドをメインフィールドとしながら、フロントエンド・モバイルアプリ・UIデザインまで手掛けるフルサイクルエンジニア。
            Python / Django / FastAPI でサービスの土台を設計し、React や Flutter でユーザーが触れる部分まで一貫して実装する。
            「作れる」だけでなく「設計できる」エンジニアを目指している。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3"
        >
          {[
            { label: "Backend", value: "Python · Django · FastAPI · PostgreSQL" },
            { label: "Frontend", value: "React · Next.js · TypeScript · Tailwind" },
            { label: "Mobile", value: "Flutter · Dart" },
            { label: "Design", value: "Figma · UI/UX Design" },
            { label: "Infra", value: "Docker · Linux · Git" },
          ].map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="border border-white/10 rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 group hover:border-white/30 transition-colors"
            >
              <span className="font-mono text-xs text-white/30 tracking-widest shrink-0">{label}</span>
              <span className="text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors">{value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
