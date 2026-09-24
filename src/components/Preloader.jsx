"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "BIOS v3.14.1 — Initializing hardware...", delay: 0 },
  { text: "CPU: [████████████████] OK", delay: 200 },
  { text: "MEM: 4096MB DDR5 detected — OK", delay: 450 },
  { text: "Loading kernel modules...", delay: 700 },
  { text: "NET: Interface eth0 — CONNECTED", delay: 950 },
  { text: "Mounting filesystem — /dev/portfolio", delay: 1200 },
  { text: "Starting services: [nginx] [docker] [azure-agent]", delay: 1500 },
  { text: "SSH daemon started on port 22", delay: 1750 },
  { text: "Running POST checks — PASS", delay: 2000 },
  { text: ">> SYSTEM ONLINE — Welcome, visitor.", delay: 2300 },
];

export default function Preloader({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay)
    );

    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setDone(true);
        onComplete?.();
      }, 600);
    }, 3200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, []);

  if (done) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-[#020202] flex items-center justify-center"
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Terminal window */}
          <div className="w-full max-w-2xl mx-4">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] rounded-t-lg border border-border border-b-0">
              <div className="w-3 h-3 rounded-full bg-[#cc0000]" />
              <div className="w-3 h-3 rounded-full bg-[#404040]" />
              <div className="w-3 h-3 rounded-full bg-[#404040]" />
              <span className="ml-3 text-xs font-mono text-foreground/40">
                chanduka@system: ~ — boot sequence
              </span>
            </div>

            {/* Terminal body */}
            <div className="bg-[#0a0a0a] border border-border rounded-b-lg p-6 min-h-[280px] font-mono text-sm">
              {BOOT_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.2 }}
                  className={`mb-1 ${
                    i === BOOT_LINES.length - 1
                      ? "text-accent font-bold mt-3"
                      : "text-foreground/60"
                  }`}
                >
                  {visibleLines.includes(i) && (
                    <>
                      {i < BOOT_LINES.length - 1 && (
                        <span className="text-accent/50 mr-2">[{String(i).padStart(2, "0")}]</span>
                      )}
                      {line.text}
                    </>
                  )}
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <motion.span
                className="inline-block w-2 h-4 bg-accent ml-1 mt-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>

            {/* Loading bar */}
            <motion.div
              className="h-0.5 bg-accent/20 mt-3 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
