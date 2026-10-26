"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ORBS = [
  { x: 15, y: 15, size: 420, color: "rgba(124,63,142,0.12)", dur: 22 },
  { x: 82, y: 75, size: 360, color: "rgba(201,168,76,0.08)",  dur: 28 },
  { x: 70, y: 10, size: 300, color: "rgba(232,160,176,0.09)", dur: 18 },
  { x: 20, y: 80, size: 280, color: "rgba(124,63,142,0.07)",  dur: 24 },
];

const SHOOTS = [
  { id: 0, x: 10, y: 5,  delay: 1  },
  { id: 1, x: 32, y: 13, delay: 5  },
  { id: 2, x: 54, y: 8,  delay: 9  },
  { id: 3, x: 76, y: 21, delay: 13 },
];

type Star = { id: number; x: number; y: number; size: number; delay: number; duration: number; gold: boolean };

export default function Sparkles() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 2,
        gold: Math.random() > 0.75,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {ORBS.map((o, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${o.x}%`, top: `${o.y}%`,
            width: o.size, height: o.size,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            transform: "translate(-50%,-50%)",
          }}
          animate={{ x: [0, 35, -20, 0], y: [0, -25, 18, 0], scale: [1, 1.12, 0.95, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            backgroundColor: s.gold ? "#c9a84c" : "#ffffff",
          }}
          animate={{ opacity: [0, s.gold ? 0.8 : 0.6, 0], scale: [0, 1.4, 0] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {SHOOTS.map((s) => (
        <motion.div
          key={`sh-${s.id}`}
          className="absolute"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: 160, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), rgba(201,168,76,0.5), transparent)",
            rotate: 20,
            transformOrigin: "left center",
          }}
          initial={{ opacity: 0, scaleX: 0, x: 0 }}
          animate={{ opacity: [0, 0.9, 0.9, 0], scaleX: [0, 1, 1, 0], x: [0, 180] }}
          transition={{ duration: 1.4, delay: s.delay, repeat: Infinity, repeatDelay: 8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
