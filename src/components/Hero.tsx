"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24 max-w-5xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <p className="font-mono text-xs tracking-widest text-white/30 uppercase mb-6">
          00 / Engineer
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
          Backend<br />
          <span className="text-white/20">+</span> Everything.
        </h1>
        <p className="text-white/40 text-base sm:text-lg mt-8 font-light max-w-md leading-relaxed">
          Python · Django · FastAPI をコアに、<br className="hidden sm:block" />
          フロント・モバイル・デザインまで一気通貫で作る。
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/20 font-mono text-xs tracking-widest">
          <span>scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
