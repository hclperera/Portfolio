"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState("loading"); // loading → reveal → exit
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Smoothly increment progress bar
    const start = Date.now();
    const duration = 2600;
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);
      if (p >= 100) clearInterval(tick);
    }, 30);

    // Phase: loading → reveal
    const revealTimer = setTimeout(() => setPhase("reveal"), 2700);

    // Phase: reveal → exit
    const exitTimer = setTimeout(() => {
      setPhase("exit");
      setTimeout(() => {
        setDone(true);
        onComplete?.();
      }, 700);
    }, 3500);

    return () => {
      clearInterval(tick);
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  if (done) return null;

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#020202] flex flex-col items-center justify-center gap-10"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Radial glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

          {/* Orbital Logo Animation */}
          <div className="relative flex items-center justify-center">
            {/* Outermost ring */}
            <motion.div
              className="absolute rounded-full border border-accent/20"
              style={{ width: 180, height: 180 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              {/* Dot on outer ring */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(254,128,25,0.8)]" />
            </motion.div>

            {/* Middle ring */}
            <motion.div
              className="absolute rounded-full border border-accent/40"
              style={{ width: 130, height: 130 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              {/* Dot on middle ring */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/70 shadow-[0_0_6px_rgba(254,128,25,0.6)]" />
            </motion.div>

            {/* Inner ring */}
            <motion.div
              className="absolute rounded-full border border-accent/60"
              style={{ width: 80, height: 80 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(254,128,25,1)]" />
            </motion.div>

            {/* Center initials */}
            <motion.div
              className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#0d0d0d] border border-accent/50 shadow-[0_0_20px_rgba(254,128,25,0.3)]"
              animate={phase === "reveal"
                ? { scale: [1, 1.15, 1], boxShadow: ["0 0 20px rgba(254,128,25,0.3)", "0 0 40px rgba(254,128,25,0.7)", "0 0 20px rgba(254,128,25,0.3)"] }
                : {}
              }
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono font-bold text-accent text-sm tracking-widest">CL</span>
            </motion.div>
          </div>

          {/* Name + title */}
          <div className="text-center space-y-2">
            <motion.p
              className="font-mono text-xs text-foreground/40 tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Chanduka Lakshan
            </motion.p>
            <motion.p
              className="font-mono text-[10px] text-accent/60 tracking-[0.2em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              DevOps · Mobile · Cloud
            </motion.p>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-border/30 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 top-0 h-full bg-accent rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
            {/* Shimmer */}
            <motion.div
              className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
              animate={{ x: [-32, 192] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Counter */}
          <motion.span
            className="font-mono text-[10px] text-foreground/20 tracking-widest -mt-6"
            key={progress}
          >
            {String(progress).padStart(3, "0")}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
