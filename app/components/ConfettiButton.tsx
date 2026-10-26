"use client";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useState } from "react";

export default function CelebrateButton({ onFired }: { onFired?: () => void }) {
  const [active, setActive] = useState(false);

  const launch = () => {
    if (active) return;
    setActive(true);
    const colors = ["#e8a0b0", "#c9a84c", "#7c3f8e", "#f0c8d8", "#e8c97a"];
    const end = Date.now() + 3500;

    confetti({
      particleCount: 120,
      spread: 130,
      origin: { x: 0.5, y: 0.55 },
      colors,
      shapes: ["circle"],
      scalar: 0.9,
    });

    (function frame() {
      confetti({ particleCount: 4, angle: 65,  spread: 50, origin: { x: 0 }, colors, scalar: 0.8 });
      confetti({ particleCount: 4, angle: 115, spread: 50, origin: { x: 1 }, colors, scalar: 0.8 });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setActive(false);
        onFired?.();
      }
    })();
  };

  return (
    <div className="relative flex items-center justify-center">
      {[0, 0.6, 1.2].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: 220, height: 56, border: "1px solid rgba(201,168,76,0.35)", borderRadius: 9999 }}
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      <motion.button
        onClick={launch}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="relative z-10 overflow-hidden touch-manipulation select-none"
        style={{
          padding: "14px 44px",
          borderRadius: 9999,
          background: "linear-gradient(135deg, #8e3050 0%, #c9607a 35%, #c9a84c 70%, #8e6e28 100%)",
          backgroundSize: "200% 200%",
          boxShadow: "0 0 24px rgba(201,168,76,0.35), 0 0 48px rgba(201,168,76,0.15), 0 8px 32px rgba(0,0,0,0.5)",
          border: "1px solid rgba(232,201,122,0.3)",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)" }}
          animate={{ x: ["-120%", "220%"] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
        />
        <span
          className="relative z-10 tracking-[0.15em] uppercase text-sm font-medium"
          style={{ fontFamily: "var(--font-sans)", color: "#fff8f0", letterSpacing: "0.18em" }}
        >
          {active ? "Celebrating ✦" : "Lets's Celebrate"}
        </span>
      </motion.button>
    </div>
  );
}
