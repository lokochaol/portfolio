"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";

const links = [
  { label: "GitHub", href: "https://github.com/lokochaol", mono: "github.com/lokochaol" },
  { label: "note", href: "https://note.com/l_00_kocha_00_l", mono: "note.com/l_00_kocha_00_l" },
  { label: "Email", href: "mailto:l.00.kocha.00.l@gmail.com", mono: "l.00.kocha.00.l@gmail.com" },
];

export default function Contact() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-[80vh] flex items-center px-6 py-24 bg-white/[0.02]"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-white/30 uppercase">04 / Contact</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">連絡先</h2>
          <p className="text-white/40 text-sm">
            お仕事のご依頼・ご相談はお気軽にどうぞ。
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
          {links.map(({ label, href, mono }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex items-center justify-between border border-white/10 rounded-lg px-5 py-4 hover:border-white/40 hover:bg-white/[0.04] transition-all duration-300"
              data-cursor="hover"
            >
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                  {label}
                </div>
                <div className="font-mono text-xs text-white/30 mt-0.5">{mono}</div>
              </div>
              <span className="text-white/20 group-hover:text-white/60 transition-colors">↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
