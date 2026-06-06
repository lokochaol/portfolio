"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  "$ whoami",
  "> Full-Stack Engineer",
  "$ skills --list",
  "> Python · Django · FastAPI",
  "> React · Next.js · Flutter",
  "$ open portfolio.sh",
  "> Welcome.",
];

export default function Hero() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (currentLine >= LINES.length) {
      setDone(true);
      return;
    }
    const line = LINES[currentLine];
    if (currentChar < line.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] || "") + line[currentChar];
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, currentChar === 0 ? 300 : 28);
    } else {
      timeoutRef.current = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 400);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [currentLine, currentChar]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="space-y-1"
      >
        <div className="font-mono text-sm bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 inline-block min-w-[360px]">
          {displayedLines.map((line, i) => (
            <div
              key={i}
              className={`${
                line.startsWith("$")
                  ? "text-white/50"
                  : "text-white"
              } leading-7`}
            >
              {line}
              {i === currentLine && !done && (
                <span className="animate-pulse">▌</span>
              )}
            </div>
          ))}
          {done && <span className="animate-pulse text-white/50">▌</span>}
        </div>
      </motion.div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 space-y-2"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Backend<br />
            <span className="text-white/20">+</span> Everything.
          </h1>
          <p className="text-white/40 text-lg mt-4 font-light max-w-md">
            Python · Django · FastAPI をコアに、<br />
            フロント・モバイル・デザインまで一気通貫で作る。
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.8 }}
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
