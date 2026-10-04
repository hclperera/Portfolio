"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Terminal, Code, Cpu, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import DecryptedText from "./react-bits/DecryptedText";


export default function Hero() {
  const [profilePic, setProfilePic] = useState("/profile.png");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  const [liveStats, setLiveStats] = useState({
    latency: 12,
    threads: 128,
    uptime: "99.999",
    mem: 4096,
  });

  useEffect(() => {
    supabase.from("profile").select("profile_picture_url").eq("id", 1).single().then(({ data }) => {
      if (data?.profile_picture_url) {
        setProfilePic(data.profile_picture_url);
      }
    });

    if (!shouldReduceMotion) {
      const interval = setInterval(() => {
        setLiveStats({
          latency: Math.floor(Math.random() * 8) + 8,
          threads: 120 + Math.floor(Math.random() * 16),
          uptime: (99.990 + Math.random() * 0.009).toFixed(3),
          mem: 4080 + Math.floor(Math.random() * 32),
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [shouldReduceMotion]);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    setMousePos({ x, y });
  };



  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020202]"
      onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
      style={{ perspective: "1500px" }}
    >
      {/* Background telemetry text — positioned to avoid navbar, content, and ticker */}
      {/* TOP-LEFT corner: stays below navbar (pt-20 = 80px) and hugs left edge */}
      <div className="absolute top-0 left-0 pointer-events-none z-0 flex flex-col gap-2 pt-20 pl-4 md:pl-8 opacity-30 font-mono text-xs text-accent select-none">
        <span>SYS_INIT: OK</span>
        <span className="transition-all duration-1000">MEM_ALLOC: {liveStats.mem}MB</span>
        <span className="transition-all duration-1000">NET_LATENCY: {liveStats.latency}ms</span>
      </div>

      {/* TOP-RIGHT corner: stays below navbar, hugs right edge */}
      <div className="absolute top-0 right-0 pointer-events-none z-0 flex flex-col gap-2 items-end pt-20 pr-4 md:pr-8 opacity-30 font-mono text-xs text-accent select-none">
        <span>GEO: 6.9271° N, 79.8612° E</span>
        <span>CLUSTER: ASIA-SOUTH-1</span>
      </div>

      {/* BOTTOM-LEFT corner: stays above the ticker strip (pb-4) */}
      <div className="absolute bottom-0 left-0 pointer-events-none z-0 flex flex-col gap-2 pb-4 pl-4 md:pl-8 opacity-30 font-mono text-xs text-accent select-none">
        <span className="transition-all duration-1000">UPTIME: {liveStats.uptime}%</span>
        <span>BUILD: v2.4.1</span>
      </div>

      {/* BOTTOM-RIGHT corner: stays above the ticker strip */}
      <div className="absolute bottom-0 right-0 pointer-events-none z-0 flex flex-col gap-2 items-end pb-4 pr-4 md:pr-8 opacity-30 font-mono text-xs text-accent select-none">
        <span>SECURE_CONN: TRUE</span>
        <span className="transition-all duration-1000">THREAD_CNT: {liveStats.threads}</span>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Main content — on mobile: stack orbit top, text below */}
      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-12 items-center relative z-10 pt-20 pb-10">

        {/* RIGHT (orbit) — on mobile appears first (top) */}
        <div className="order-1 lg:order-2 relative flex items-center justify-center w-full z-10 pointer-events-none"
          style={{ height: "min(80vw, 550px)" }}>
          
          {/* Subtle Back slanted shape for depth */}
          <div className="absolute top-[-30%] bottom-[-30%] right-[10%] md:right-[15%] w-[300px] md:w-[400px] bg-[#241006]/30 border-l border-white/5 -skew-x-[20deg]" />
          
          {/* Main Orange Slanted shape */}
          <div className="absolute top-[-30%] bottom-[-30%] right-[20%] md:right-[25%] w-[320px] md:w-[420px] bg-[linear-gradient(to_bottom,#fe8019_0%,#a94308_35%,#241006_70%,transparent_100%)] -skew-x-[20deg] shadow-[-30px_0_80px_rgba(254,128,25,0.15)] border-l border-[#fe8019]" />
          
          {/* Profile Picture */}
          <motion.div
            className="absolute z-20 pointer-events-auto flex items-end justify-center w-full h-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src={profilePic}
              alt="Chanduka Lakshan"
              className="w-auto h-full max-h-[550px] object-contain drop-shadow-2xl"
              style={{
                maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)"
              }}
            />
          </motion.div>
        </div>

        {/* LEFT (text) — on mobile appears second (below) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="order-2 lg:order-1 text-center lg:text-left z-20 pb-8 lg:pb-0"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border/50 border border-accent/20 text-xs font-mono text-accent mb-5 shadow-[0_0_15px_rgba(254,128,25,0.15)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Terminal className="w-3 h-3" />
            <DecryptedText text='sys.status === "online"' maxIterations={20} speed={40} />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-[#fafafa] font-sans drop-shadow-lg leading-tight">
            Chanduka<br />Lakshan
          </h1>

          <motion.p
            className="text-base md:text-lg text-foreground/80 mb-8 max-w-md font-mono mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-accent">&#62;</span> DevOps Engineer<br />
            <span className="text-accent">&#62;</span> Mobile Developer<br />
            <span className="text-accent text-xs opacity-60">&#62; B.Sc. IT Undergraduate — Sri Lanka</span>
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-3 font-mono"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(254,128,25,0.3)] hover:shadow-[0_0_30px_rgba(254,128,25,0.5)] text-sm"
            >
              <Code className="w-4 h-4" /> View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 border border-border hover:border-accent text-foreground hover:text-accent rounded-sm transition-colors flex items-center gap-2 cursor-pointer bg-[#050505]/50 backdrop-blur-sm text-sm"
            >
              <Cpu className="w-4 h-4" /> Contact Me
            </a>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground/30 z-10 hidden md:flex flex-col items-center gap-1"
        animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
