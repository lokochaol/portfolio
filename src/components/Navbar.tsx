"use client";

import { useEffect, useState } from "react";

const links = ["About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/70 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
        <span
          className="font-mono text-sm tracking-widest text-white/60 cursor-pointer hover:text-white transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          portfolio
        </span>
        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className="font-mono text-xs tracking-widest text-white/40 hover:text-white transition-colors uppercase"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
