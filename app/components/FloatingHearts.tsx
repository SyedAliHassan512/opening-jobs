"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Petal = { id: number; x: number; delay: number; duration: number; size: number; drift: number; opacity: number };

export default function FloatingPetals() {
  const [height, setHeight] = useState(900);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setHeight(window.innerHeight);
    const upd = () => setHeight(window.innerHeight);
    window.addEventListener("resize", upd);

    setPetals(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: 8 + (i / 10) * 84,
        delay: i * 1.2,
        duration: 10 + (i % 3) * 3,
        size: 10 + (i % 3) * 4,
        drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 15),
        opacity: 0.25 + (i % 4) * 0.1,
      }))
    );

    return () => window.removeEventListener("resize", upd);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: -20,
            width: p.size,
            height: p.size * 0.7,
            background: `radial-gradient(ellipse, rgba(232,160,176,${p.opacity}) 0%, transparent 70%)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
          animate={{
            y: [0, -(height + 80)],
            x: [0, p.drift],
            rotate: [0, p.drift > 0 ? 45 : -45],
            opacity: [0, p.opacity, p.opacity * 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            opacity: { times: [0, 0.1, 0.85, 1] },
          }}
        />
      ))}
    </div>
  );
}
