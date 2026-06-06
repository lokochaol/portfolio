"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const onEnter = () => { isHovering = true; };
    const onLeave = () => { isHovering = false; };

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      const scale = isHovering ? 1.8 : 1;
      ring.style.transform = `translate(-50%, -50%) scale(${scale})`;
      dot.style.transform = `translate(-50%, -50%) scale(${isHovering ? 0.5 : 1})`;
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 bg-white rounded-full transition-transform duration-100"
        style={{ left: -20, top: -20, transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 border border-white/40 rounded-full transition-transform duration-300"
        style={{ left: -20, top: -20, transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
