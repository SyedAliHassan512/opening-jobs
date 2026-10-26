"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BALLOONS = [
  { color: "#c9607a", shine: "#e8a0b0", x: "6%",  delay: 0,   dur: 12, size: 38 },
  { color: "#7c3f8e", shine: "#b07ac0", x: "18%", delay: 2.5, dur: 15, size: 32 },
  { color: "#c9a84c", shine: "#e8c97a", x: "75%", delay: 1,   dur: 13, size: 36 },
  { color: "#8e4060", shine: "#c07090", x: "86%", delay: 3.5, dur: 11, size: 30 },
  { color: "#5a3a7e", shine: "#9070b0", x: "60%", delay: 1.8, dur: 14, size: 34 },
];

export default function Balloons() {
  const [height, setHeight] = useState(800);
  const [mobile, setMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const upd = () => { setHeight(window.innerHeight); setMobile(window.innerWidth < 640); };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  if (!mounted) return null;

  const list = mobile ? BALLOONS.slice(0, 3) : BALLOONS;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {list.map((b, i) => {
        const w = mobile ? b.size * 0.8 : b.size;
        const h = w * 1.25;
        return (
          <motion.div
            key={i}
            className="absolute bottom-0"
            style={{ left: b.x }}
            animate={{ y: [0, -(height + 220)], x: [0, 6, -6, 4, -4, 0] }}
            transition={{
              y: { duration: b.dur, delay: b.delay, repeat: Infinity, ease: "linear" },
              x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <svg width={w} height={h + 55} viewBox={`0 0 ${w} ${h + 55}`}>
              <ellipse cx={w/2} cy={h/2} rx={w/2} ry={h/2}
                fill={b.color} opacity={0.75}
                style={{ filter: `drop-shadow(0 0 8px ${b.color}88)` }}
              />
              <ellipse cx={w*0.36} cy={h*0.3} rx={w*0.1} ry={h*0.08}
                fill={b.shine} opacity={0.45}
              />
              <ellipse cx={w/2} cy={h-1} rx={3.5} ry={4} fill={b.color} />
              <path
                d={`M ${w/2} ${h+2} Q ${w/2+7} ${h+22} ${w/2-4} ${h+48}`}
                stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
