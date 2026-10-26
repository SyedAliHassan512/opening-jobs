"use client";
import { motion } from "framer-motion";

function Candle({ x, bodyColor, delay }: { x: number; bodyColor: string; delay: number }) {
  return (
    <g transform={`translate(${x}, 42)`}>
      <rect x="-4" y="-28" width="8" height="24" rx="2" fill={bodyColor} opacity={0.9} />
      <rect x="-4" y="-28" width="8" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
      {/* Wick */}
      <line x1="0" y1="-28" x2="0" y2="-32" stroke="#555" strokeWidth="1" />
      {/* Outer flame */}
      <motion.ellipse cx="0" cy="-37" rx="4.5" ry="7"
        fill="#e8c97a"
        animate={{ rx: [4.5, 3, 5.5, 4.5], ry: [7, 9, 6, 7], opacity: [0.95, 0.75, 1, 0.95] }}
        transition={{ duration: 0.55, delay, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "blur(0.5px) drop-shadow(0 0 5px #c9a84c)" }}
      />
      {/* Inner flame */}
      <motion.ellipse cx="0" cy="-39" rx="2" ry="3.5"
        fill="#fff8e0"
        animate={{ rx: [2, 1.2, 2.8, 2], ry: [3.5, 5, 3, 3.5] }}
        transition={{ duration: 0.45, delay, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  );
}

export default function Cake() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.3 }}
      className="flex justify-center"
    >
      <svg viewBox="0 0 200 190" className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40">
        <defs>
          <linearGradient id="t1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9607a" />
            <stop offset="100%" stopColor="#8e3050" />
          </linearGradient>
          <linearGradient id="t2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3f8e" />
            <stop offset="100%" stopColor="#4a1f60" />
          </linearGradient>
          <linearGradient id="t3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#8e6e28" />
          </linearGradient>
          <linearGradient id="frost" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,245,235,0.95)" />
            <stop offset="100%" stopColor="rgba(255,235,215,0.7)" />
          </linearGradient>
        </defs>

        {/* Plate shadow */}
        <ellipse cx="100" cy="174" rx="76" ry="7" fill="rgba(0,0,0,0.35)" />
        {/* Plate */}
        <ellipse cx="100" cy="171" rx="74" ry="6" fill="rgba(255,245,235,0.12)" />

        {/* Bottom tier */}
        <rect x="22" y="118" width="156" height="52" rx="8" fill="url(#t1)" />
        {/* Bottom frosting */}
        <path d="M22,118 Q31,108 40,118 Q49,108 58,118 Q67,108 76,118 Q85,108 94,118 Q103,108 112,118 Q121,108 130,118 Q139,108 148,118 Q157,108 166,118 Q175,108 178,118"
          fill="url(#frost)" stroke="none" />

        {/* Middle tier */}
        <rect x="38" y="76" width="124" height="46" rx="8" fill="url(#t2)" />
        {/* Middle frosting */}
        <path d="M38,76 Q47,67 56,76 Q65,67 74,76 Q83,67 92,76 Q101,67 110,76 Q119,67 128,76 Q137,67 146,76 Q155,67 162,76"
          fill="url(#frost)" stroke="none" />

        {/* Top tier */}
        <rect x="58" y="42" width="84" height="38" rx="8" fill="url(#t3)" />
        {/* Top frosting */}
        <path d="M58,42 Q66,34 74,42 Q82,34 90,42 Q98,34 106,42 Q114,34 122,42 Q130,34 138,42 Q142,34 142,42"
          fill="url(#frost)" stroke="none" />

        {/* Gold dot accents */}
        {[38, 62, 86, 110, 134, 158].map((x, i) => (
          <circle key={i} cx={x} cy="142" r="3" fill="#c9a84c" opacity={0.7} />
        ))}
        {[50, 74, 98, 122, 146].map((x, i) => (
          <circle key={i} cx={x} cy="100" r="2.5" fill="#e8c97a" opacity={0.6} />
        ))}

        {/* Candles */}
        <Candle x={76}  bodyColor="#c9607a" delay={0}    />
        <Candle x={100} bodyColor="#7c3f8e" delay={0.18} />
        <Candle x={124} bodyColor="#c9a84c" delay={0.35} />
      </svg>
    </motion.div>
  );
}
