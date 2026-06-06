"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";

const skills = [
  {
    category: "Backend",
    items: [
      { name: "Python", level: 95 },
      { name: "Django", level: 90 },
      { name: "FastAPI", level: 88 },
      { name: "PostgreSQL", level: 80 },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: 78 },
      { name: "Next.js", level: 75 },
      { name: "TypeScript", level: 72 },
      { name: "Tailwind CSS", level: 80 },
    ],
  },
  {
    category: "Mobile / Design",
    items: [
      { name: "Flutter", level: 70 },
      { name: "Figma", level: 75 },
      { name: "UI/UX", level: 68 },
      { name: "Docker", level: 72 },
    ],
  },
];

export default function Skills() {
  const { ref, visible } = useScrollReveal();

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
          {skills.map(({ category, items }, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: ci * 0.15 }}
              className="space-y-6"
            >
              <h3 className="font-mono text-xs tracking-widest text-white/40 uppercase border-b border-white/10 pb-3">
                {category}
              </h3>
              {items.map(({ name, level }, i) => (
                <div key={name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">{name}</span>
                    <span className="font-mono text-white/30 text-xs">{level}%</span>
                  </div>
                  <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-white/60"
                      initial={{ width: 0 }}
                      animate={visible ? { width: `${level}%` } : {}}
                      transition={{ duration: 1, delay: ci * 0.15 + i * 0.08 + 0.3, ease: "easeOut" }}
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
