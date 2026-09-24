"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Terminal, Code, Cpu, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import DecryptedText from "./react-bits/DecryptedText";
import { FaDocker, FaLinux, FaGitAlt } from "react-icons/fa";
import { SiFlutter, SiNextdotjs } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

export default function Hero() {
  const [profilePic, setProfilePic] = useState("/profile.png");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    supabase.from("profile").select("profile_picture_url").eq("id", 1).single().then(({data}) => {
      if (data?.profile_picture_url) {
        setProfilePic(data.profile_picture_url);
      }
    });
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    setMousePos({ x, y });
  };

  const TECH_ORBITS = [
    { icon: <FaDocker size={24} className="text-blue-500" />, radius: 140, angle: 0, speed: 20 },
    { icon: <FaLinux size={24} className="text-white" />, radius: 140, angle: 180, speed: 20 },
    
    { icon: <VscAzure size={28} className="text-blue-400" />, radius: 210, angle: 90, speed: 30 },
    { icon: <SiFlutter size={28} className="text-cyan-400" />, radius: 210, angle: 270, speed: 30 },
    
    { icon: <FaGitAlt size={22} className="text-orange-500" />, radius: 280, angle: 45, speed: 45 },
    { icon: <SiNextdotjs size={22} className="text-white" />, radius: 280, angle: 225, speed: 45 },
  ];

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020202]"
      onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
      style={{ perspective: "1500px" }}
    >
      {/* Background telemetry text */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex flex-col justify-between p-6 md:p-12 opacity-30 font-mono text-xs text-accent select-none">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2">
            <span>SYS_INIT: OK</span>
            <span>MEM_ALLOC: 4096MB</span>
            <span>NET_LATENCY: 12ms</span>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <span>GEO: 6.9271° N, 79.8612° E</span>
            <span>CLUSTER: ASIA-SOUTH-1</span>
          </div>
        </div>
        <div className="flex justify-between w-full items-end">
          <div className="flex flex-col gap-2">
            <span>UPTIME: 99.999%</span>
            <span>BUILD: v2.4.1</span>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <span>SECURE_CONN: TRUE</span>
            <span>THREAD_CNT: 128</span>
          </div>
        </div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Main content — on mobile: stack orbit top, text below */}
      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-12 items-center relative z-10 pt-20 pb-10">
        
        {/* RIGHT (orbit) — on mobile appears first (top) */}
        <div className="order-1 lg:order-2 relative flex items-center justify-center w-full z-10 pointer-events-none"
             style={{ height: "min(55vw, 360px)" }}>
          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ 
              transformStyle: "preserve-3d",
              width: "560px",
              height: "560px",
              scale: 0.55,
            }}
            animate={{
              rotateX: shouldReduceMotion ? 0 : mousePos.y * 30,
              rotateY: shouldReduceMotion ? 0 : mousePos.x * 30,
              scale: 0.55,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
          >
            {/* Responsive scale wrapper */}
            <motion.div
              className="absolute w-full h-full flex items-center justify-center"
              initial={{ scale: 0.55 }}
              animate={{ scale: 0.55 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* do nothing — use parent scale */}
            </motion.div>

            {/* 3D Tilted Orbit Container */}
            <div 
              className="absolute w-full h-full flex items-center justify-center" 
              style={{ transformStyle: "preserve-3d", transform: "rotateX(65deg) rotateY(10deg)" }}
            >
              {/* Rings */}
              <div className="absolute w-[280px] h-[280px] rounded-full border border-accent/40 shadow-[0_0_20px_rgba(34,197,94,0.2)]" />
              <div className="absolute w-[420px] h-[420px] rounded-full border border-accent/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]" />
              <div className="absolute w-[560px] h-[560px] rounded-full border border-foreground/10" />

              {/* Orbiting Tech Nodes */}
              {TECH_ORBITS.map((tech, i) => (
                <motion.div
                  key={i}
                  className="absolute flex items-center justify-center"
                  style={{ width: tech.radius * 2, height: tech.radius * 2, transformStyle: "preserve-3d", transform: `rotateZ(${tech.angle}deg)` }}
                  animate={shouldReduceMotion ? undefined : { rotateZ: [tech.angle, tech.angle + 360] }}
                  transition={shouldReduceMotion ? undefined : { duration: tech.speed, repeat: Infinity, ease: "linear" }}
                >
                  <div 
                    className="absolute bg-[#050505] border border-accent/40 p-3 rounded-full shadow-[0_0_25px_rgba(34,197,94,0.4)] backdrop-blur-md"
                    style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%) rotateX(-65deg) rotateY(-10deg)', transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      animate={shouldReduceMotion ? undefined : { rotateZ: [-(tech.angle), -(tech.angle + 360)] }}
                      transition={shouldReduceMotion ? undefined : { duration: tech.speed, repeat: Infinity, ease: "linear" }}
                      style={shouldReduceMotion ? { transform: `rotateZ(${-tech.angle}deg)` } : undefined}
                      className="flex items-center justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    >
                      {tech.icon}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Center Profile Picture */}
            <div className="absolute z-50 pointer-events-auto" style={{ transform: "translateZ(30px)" }}>
              <div className={`relative w-44 h-44 rounded-full p-[3px] bg-gradient-to-tr from-accent/80 via-background to-accent/80 ${shouldReduceMotion ? "" : "animate-[spin_15s_linear_infinite]"} shadow-[0_0_60px_rgba(34,197,94,0.5)]`}>
                <div className={`w-full h-full rounded-full overflow-hidden ${shouldReduceMotion ? "" : "animate-[spin_15s_linear_infinite_reverse]"} border-2 border-background bg-background relative group`}>
                  <img 
                    src={profilePic} 
                    alt="Chanduka Lakshan" 
                    className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100" 
                  />
                  <div className="absolute inset-0 bg-accent/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border/50 border border-accent/20 text-xs font-mono text-accent mb-5 shadow-[0_0_15px_rgba(34,197,94,0.15)]"
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
            <span className="text-accent">&#62;</span> DevOps Engineer<br/>
            <span className="text-accent">&#62;</span> Mobile Developer<br/>
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
              className="px-5 py-2.5 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] text-sm"
            >
              <Code className="w-4 h-4" /> Initialize Work
            </a>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 border border-border hover:border-accent text-foreground hover:text-accent rounded-sm transition-colors flex items-center gap-2 cursor-pointer bg-[#050505]/50 backdrop-blur-sm text-sm"
            >
              <Cpu className="w-4 h-4" /> Ping Server
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
