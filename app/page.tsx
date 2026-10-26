"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Sparkles from "./components/Sparkles";
import Cake from "./components/Cake";
import CelebrateButton from "./components/ConfettiButton";

const Balloons        = dynamic(() => import("./components/Balloons"),       { ssr: false });
const FloatingPetals  = dynamic(() => import("./components/FloatingHearts"), { ssr: false });
const HeroAnimations  = dynamic(() => import("./components/HeroAnimations"), { ssr: false });
const CakeHalosD      = dynamic(() => import("./components/HeroAnimations").then(m => ({ default: m.CakeHalos })),       { ssr: false });
const OrbitRingD      = dynamic(() => import("./components/HeroAnimations").then(m => ({ default: m.OrbitRing })),       { ssr: false });
const FloatingPetalsL = dynamic(() => import("./components/HeroAnimations").then(m => ({ default: m.FloatingPetalsLocal })), { ssr: false });

const TRAITS = ["Janum"];

/* ── Love Message Modal ── */
function LoveMessageModal({ onClose }: { onClose: () => void }) {
  const messageRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const message = messageRef.current;
    if (!message) return;

    const updateScrollHint = () => {
      setShowScrollHint(message.scrollTop + message.clientHeight < message.scrollHeight - 8);
    };

    updateScrollHint();
    message.addEventListener("scroll", updateScrollHint);
    window.addEventListener("resize", updateScrollHint);
    return () => {
      message.removeEventListener("scroll", updateScrollHint);
      window.removeEventListener("resize", updateScrollHint);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(8,5,16,0.92)", backdropFilter: "blur(16px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-card rounded-2xl relative w-full overflow-hidden"
        style={{
          maxWidth: "min(620px, 100%)",
          maxHeight: "90dvh",
          border: "1px solid rgba(232,160,176,0.2)",
          boxShadow: "0 0 80px rgba(232,160,176,0.12), 0 0 160px rgba(201,168,76,0.06)",
        }}
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        {[
          { t: "top-4", l: "left-4", r: 0 },
          { t: "top-4", l: "right-4", r: 90 },
          { t: "bottom-4", l: "left-4", r: -90 },
          { t: "bottom-4", l: "right-4", r: 180 },
        ].map((corner, index) => (
          <svg key={index} className={`absolute ${corner.t} ${corner.l} opacity-20`}
            style={{ transform: `rotate(${corner.r}deg)` }} width="18" height="18" viewBox="0 0 20 20">
            <path d="M0 10 Q5 0 10 0 Q5 5 10 10 Q5 15 10 20 Q5 20 0 10Z" fill="#c9a84c" />
          </svg>
        ))}

        <motion.button
          type="button"
          aria-label="Close message"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full"
          style={{ color: "rgba(240,200,212,0.8)", background: "rgba(232,160,176,0.08)", border: "1px solid rgba(232,160,176,0.28)", cursor: "pointer" }}
          whileHover={{ scale: 1.08, color: "#f0c0cc", background: "rgba(232,160,176,0.16)" }}
          whileTap={{ scale: 0.94 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.button>

        <div
          ref={messageRef}
          className="max-h-[90dvh] overflow-y-auto hide-scrollbar message-scroll"
          style={{ padding: "clamp(2rem, 7vw, 3.5rem)" }}
        >


        <motion.div className="divider mb-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.8 }} />

        <motion.p
          className="text-center mb-6"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 3vw, 1.2rem)", fontWeight: 300, color: "rgba(240,232,224,0.92)", lineHeight: 1.9, letterSpacing: "0.01em" }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
        >
          Hi, it’s been a year. I still think about you every day, wondering how you are, what you look like now, and what you do without me. But one thing hasn’t changed:
        </motion.p>

        <motion.div className="divider mb-6" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.8 }} />

        <motion.p
          className="text-center mb-8"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 2.8vw, 1.2rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(240,232,224,0.88)", lineHeight: 1.9, letterSpacing: "0.01em" }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8 }}
        >
          Shah loved you before, he loves you now, and he will love you always, no matter how far apart you are.
        </motion.p>

        <motion.div className="divider mb-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.85, duration: 0.8 }} />

        <motion.p
          className="text-center mb-8"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 2.8vw, 1.2rem)", fontWeight: 300, color: "rgba(240,232,224,0.88)", lineHeight: 1.9, letterSpacing: "0.01em" }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
        >
          Shah loves you more than anyone in this world, and he will wait for you until his very last breath. With every passing day, his love only grows deeper.
          <br /><br />
          Today is your day, and all Shah wants is for you to smile, feel joy, and know that someone out there loves you more than words can ever say.
          <br /><br />
          <span style={{ color: "rgba(232,160,176,0.75)", fontStyle: "italic" }}>Happy Birthday, Janan.</span>
        </motion.p>
        </div>

        {showScrollHint && (
          <motion.button
            type="button"
            aria-label="Scroll down to read more"
            onClick={() => messageRef.current?.scrollBy({ top: 180, behavior: "smooth" })}
            className="absolute bottom-3 left-1/2 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full"
            style={{ color: "rgba(232,201,122,0.9)", background: "rgba(18,12,24,0.82)", border: "1px solid rgba(201,168,76,0.28)" }}
            animate={{ y: [0, 4, 0], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 5L7 9.5 11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
function IntroScreen({ onOpen }: { onOpen: () => void }) {
  const [ready, setReady] = useState(false);
  const [exploding, setExploding] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    setExploding(true);
    setTimeout(() => onOpen(), 350);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden page-bg"
      exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
    >
      <Sparkles />

      {/* Burst particles on click */}
      <AnimatePresence>
        {exploding && (
          <>
            {Array.from({ length: 16 }, (_, i) => {
              const angle = (i / 16) * 360;
              const rad   = (angle * Math.PI) / 180;
              const dist  = 180 + Math.floor(i / 4) * 60;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: i % 3 === 0 ? 6 : 4,
                    height: i % 3 === 0 ? 6 : 4,
                    backgroundColor: i % 2 === 0 ? "#c9a84c" : "#e8a0b0",
                    left: "50%", top: "50%",
                    boxShadow: `0 0 8px ${i % 2 === 0 ? "#c9a84c" : "#e8a0b0"}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(rad) * dist,
                    y: Math.sin(rad) * dist,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              );
            })}
            {/* Expanding ring burst */}
            {[0, 0.1, 0.2].map((delay, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 10, height: 10,
                  border: `1px solid rgba(201,168,76,${0.8 - i * 0.2})`,
                  left: "50%", top: "50%",
                  transform: "translate(-50%,-50%)",
                }}
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ scale: 28, opacity: 0 }}
                transition={{ duration: 0.5, delay: delay * 0.5, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {[340, 480].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: size, height: size, border: `1px solid rgba(201,168,76,${i === 0 ? 0.12 : 0.06})` }}
          animate={{ rotate: i === 0 ? 360 : -360 }}
          transition={{ duration: 40 + i * 20, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * 360;
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.div
            key={`tick-${i}`}
            className="absolute pointer-events-none"
            style={{
              width: 1, height: i % 3 === 0 ? 10 : 5,
              background: `rgba(201,168,76,${i % 3 === 0 ? 0.35 : 0.15})`,
              left: `calc(50% + ${Math.cos(rad) * 170}px)`,
              top: `calc(50% + ${Math.sin(rad) * 170}px)`,
              transform: `translate(-50%,-50%) rotate(${angle}deg)`,
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
          />
        );
      })}

      <AnimatePresence>
        {ready && (
          <motion.div
            className="relative z-10 flex flex-col items-center text-center px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: exploding ? 0 : 1, y: exploding ? -30 : 0, scale: exploding ? 0.9 : 1 }}
            transition={{ duration: exploding ? 0.25 : 1, ease: "easeOut" }}
          >
            <motion.p
              className="mb-8 sm:mb-10"
              style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✦ &nbsp; A message for you &nbsp; ✦
            </motion.p>

            <motion.h1
              className="text-gold-shimmer mb-3 sm:mb-4 leading-none"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 10vw, 6rem)", fontWeight: 300, letterSpacing: "-0.01em" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              Happy Birthday
            </motion.h1>

            <motion.div
              className="divider w-32 sm:w-48 mb-6 sm:mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />

            <p
              className="mb-10 sm:mb-12 max-w-xs"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(240,232,224,0.4)", letterSpacing: "0.05em", lineHeight: 1.8, fontSize: "0.9rem" }}
            >
              Something special has been prepared<br />just for you
            </p>

            {/* ── Open Your Surprise Button ── */}
            <div className="relative flex flex-col items-center gap-5">

              {/* Main button */}
              <motion.button
                onClick={handleOpen}
                className="relative overflow-hidden touch-manipulation"
                style={{
                  padding: "18px 56px",
                  borderRadius: 9999,
                  background: "linear-gradient(135deg, #6b2040 0%, #c9607a 40%, #c9a84c 75%, #8e6e28 100%)",
                  backgroundSize: "200% 200%",
                  cursor: "pointer",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  boxShadow: [
                    "0 0 28px rgba(201,168,76,0.45), 0 0 56px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.5)",
                    "0 0 45px rgba(201,168,76,0.75), 0 0 90px rgba(232,160,176,0.35), 0 8px 32px rgba(0,0,0,0.5)",
                    "0 0 28px rgba(201,168,76,0.45), 0 0 56px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.5)",
                  ],
                  y: [0, -4, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.06, boxShadow: "0 0 60px rgba(201,168,76,0.9), 0 0 120px rgba(232,160,176,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated border using conic-gradient rotation */}
                <motion.span
                  className="absolute pointer-events-none"
                  style={{
                    inset: -1.5,
                    borderRadius: 9999,
                    background: "conic-gradient(from 0deg, #c9a84c, #e8c97a, #e8a0b0, #c9607a, #c9a84c)",
                    zIndex: -1,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner fill to mask conic border */}
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, #6b2040 0%, #c9607a 40%, #c9a84c 75%, #8e6e28 100%)",
                    margin: 1.5,
                    borderRadius: 9999,
                  }}
                />
                {/* Shimmer sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.28) 50%, transparent 75%)", borderRadius: 9999 }}
                  animate={{ x: ["-130%", "230%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.2 }}
                />
                <span
                  className="relative z-10 flex items-center gap-3"
                  style={{ fontFamily: "var(--font-sans)", color: "#fff8f0", fontSize: "0.8rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎁
                  </motion.span>
                  Open Your Surprise
                  <motion.span
                    animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Trait ticker ── */
function TraitTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TRAITS.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="min-h-[6rem] sm:min-h-[6.75rem] shrink-0 overflow-visible flex items-center justify-center px-10">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          className="text-rose-shimmer block"
          style={{ fontFamily: "var(--font-script), cursive", fontSize: "clamp(3.8rem, 11vw, 5.8rem)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "0.015em", padding: "0.05em 0.35em 0.15em", overflow: "visible", textShadow: "0 0 35px rgba(232,160,176,0.28)" }}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {TRAITS[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function BirthdayPage() {
  const [showIntro, setShowIntro]     = useState(true);
  const [showLoveMsg, setShowLoveMsg] = useState(false);

  return (
    <>
      <div className="fixed inset-0 -z-10 page-bg" />

      <AnimatePresence>
        {showIntro   && <IntroScreen onOpen={() => setShowIntro(false)} />}
        {showLoveMsg && <LoveMessageModal onClose={() => setShowLoveMsg(false)} />}
      </AnimatePresence>

      <Sparkles />
      <Balloons />
      <FloatingPetals />

      <motion.main
        className="relative z-10 flex flex-col items-center w-full"
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{
          opacity: showIntro ? 0 : 1,
          y: showIntro ? 40 : 0,
          filter: showIntro ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── HERO ── */}
        <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-5 py-6 sm:px-8 sm:py-8 overflow-hidden">

          {/* Constellation + title glow */}
          <HeroAnimations />

          {/* Cake with halos + orbiting dots + petals */}
          <div className="relative mb-2 sm:mb-3" suppressHydrationWarning>
            <CakeHalosD />

            <div className="absolute inset-0 pointer-events-none" style={{ left: "50%", top: "50%" }}>
              <OrbitRingD radius={100} count={6} duration={18} clockwise dotColor="rgba(201,168,76,0.7)" dotSize={3} />
            </div>

            <div className="absolute inset-0 pointer-events-none" style={{ left: "50%", top: "50%" }}>
              <OrbitRingD radius={130} count={8} duration={28} clockwise={false} dotColor="rgba(232,160,176,0.55)" dotSize={2} delay={1} />
            </div>

            <FloatingPetalsL />

            <motion.div
              className="float-gentle relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Cake />
            </motion.div>
          </div>

          <motion.p
            className="mb-3 sm:mb-4 text-center"
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,76,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✦ &nbsp; Wishing you &nbsp; ✦
          </motion.p>

          {/* Letter-by-letter title */}
          <motion.h1
            className="text-center mb-2 sm:mb-3 glow-rose relative z-10"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.25rem, 9vw, 5.5rem)", fontWeight: 300, letterSpacing: "0.015em", lineHeight: 1, color: "#f0e0e8", marginBottom: "0.1rem" }}
            aria-label="Happy Birthday"
          >
            {"Happy Birthday".split("").map((char, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.055, ease: "easeOut" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <TraitTicker />
          </motion.div>

          <motion.p
            className="text-center mt-0 mb-4 sm:mb-5 max-w-sm"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(0.95rem, 2.3vw, 1.1rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(240,232,224,0.5)", lineHeight: 1.5, letterSpacing: "0.01em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Today belongs entirely to you — every moment, every wish, every star in the sky.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
          >
            <CelebrateButton onFired={() => setShowLoveMsg(true)} />
          </motion.div>

          <motion.div
            className="absolute bottom-8 flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(240,232,224,0.3)" }}>
              Continue
            </span>
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
              <path d="M6 0v14M1 9l5 5 5-5" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </motion.div>
        </section>

      </motion.main>
    </>
  );
}
