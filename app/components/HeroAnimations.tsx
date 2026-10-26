"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/* ── Orbiting dots ── */
function OrbitRing({ radius, count, dotColor, dotSize, delay = 0 }: {
  radius: number; count: number; duration: number;
  clockwise: boolean; dotColor: string; dotSize: number; delay?: number;
}) {
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 360;
        const rad   = (angle * Math.PI) / 180;
        const cx    = Math.cos(rad) * radius;
        const cy    = Math.sin(rad) * radius;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: dotSize, height: dotSize,
              backgroundColor: dotColor,
              left: `calc(50% + ${cx}px - ${dotSize / 2}px)`,
              top:  `calc(50% + ${cy}px - ${dotSize / 2}px)`,
              boxShadow: `0 0 ${dotSize * 3}px ${dotColor}`,
            }}
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.3, 0.8] }}
            transition={{
              opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: delay + i * 0.3 },
              scale:   { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: delay + i * 0.3 },
            }}
          />
        );
      })}
    </>
  );
}

/* ── Floating rose petals ── */
function FloatingPetalsLocal() {
  const mounted = useMounted();
  if (!mounted) return null;

  const petals = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: 30 + (i % 7) * 20,
    delay: i * 0.55,
    duration: 4 + (i % 4) * 0.8,
    size: 6 + (i % 3) * 3,
    drift: (i % 2 === 0 ? 1 : -1) * (15 + (i % 4) * 12),
    opacity: 0.3 + (i % 3) * 0.12,
  }));

  return (
    <>
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`,
            bottom: "48%",
            width: p.size,
            height: p.size * 0.65,
            background: `radial-gradient(ellipse, rgba(232,160,176,${p.opacity + 0.1}) 0%, rgba(201,168,76,${p.opacity * 0.4}) 60%, transparent 100%)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
          animate={{
            y:       [0, -(90 + p.size * 4)],
            x:       [0, p.drift],
            rotate:  [0, p.drift > 0 ? 60 : -60],
            opacity: [0, p.opacity + 0.15, p.opacity, 0],
            scale:   [0.5, 1, 0.8, 0.4],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     "easeOut",
            opacity:  { times: [0, 0.12, 0.8, 1] },
          }}
        />
      ))}
    </>
  );
}

/* ── Constellation ── */
function Constellation() {
  const mounted = useMounted();
  if (!mounted) return null;

  const nodes = [
    { x: 12, y: 18 }, { x: 22, y: 10 }, { x: 35, y: 22 },
    { x: 65, y: 14 }, { x: 78, y: 8  }, { x: 88, y: 20 },
    { x: 8,  y: 72 }, { x: 18, y: 82 }, { x: 30, y: 68 },
    { x: 70, y: 75 }, { x: 82, y: 65 }, { x: 90, y: 78 },
  ];
  const lines = [[0,1],[1,2],[3,4],[4,5],[6,7],[7,8],[9,10],[10,11]];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }}>
        {lines.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
            x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
            stroke="rgba(201,168,76,0.6)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: 6, delay: i * 0.8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${n.x}%`, top: `${n.y}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            backgroundColor: i % 4 === 0 ? "#c9a84c" : "#ffffff",
            transform: "translate(-50%,-50%)",
          }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.6, 0.8] }}
          transition={{ duration: 3 + (i % 3), delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Title glow ── */
function TitleGlow() {
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <div
      className="absolute pointer-events-none radial-breathe"
      style={{
        left: "50%", top: "58%",
        width: "min(500px, 90vw)",
        height: "min(500px, 90vw)",
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(232,160,176,0.12) 0%, rgba(201,168,76,0.06) 40%, transparent 70%)",
        borderRadius: "50%",
        zIndex: 0,
      }}
    />
  );
}

/* ── Cake halos ── */
function CakeHalos() {
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <>
      {[110, 145, 185].map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: "50%", top: "50%",
            width: r * 2, height: r * 2,
            transform: "translate(-50%,-50%)",
            border: `1px solid rgba(${i === 1 ? "201,168,76" : "232,160,176"},${0.14 - i * 0.03})`,
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}
    </>
  );
}

/* ── Main export ── */
export default function HeroAnimations() {
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <>
      <Constellation />
      <TitleGlow />
    </>
  );
}

export { FloatingPetalsLocal, CakeHalos, OrbitRing };
