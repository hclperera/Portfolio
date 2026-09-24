"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Terminal, Code, Cpu } from "lucide-react";
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-16 bg-[#020202]"
      onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
      style={{ perspective: "1500px" }}
    >
      {/* Subtle Background Elements to Fill Space */}
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

      <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1 text-center lg:text-left z-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border/50 border border-accent/20 text-sm font-mono text-accent mb-6 shadow-[0_0_15px_rgba(254,128,25,0.15)]">
            <Terminal className="w-4 h-4" />
            <DecryptedText text='sys.status === "online"' maxIterations={20} speed={40} />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[#fafafa] font-sans drop-shadow-lg">
            Chanduka Lakshan
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg font-mono mx-auto lg:mx-0">
            <span className="text-accent">&gt;</span> DevOps Engineer<br/>
            <span className="text-accent">&gt;</span> Mobile Developer
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 font-mono">
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(254,128,25,0.3)] hover:shadow-[0_0_30px_rgba(254,128,25,0.5)]"
            >
              <Code className="w-4 h-4" /> Initialize Work
            </a>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 border border-border hover:border-accent text-foreground hover:text-accent rounded-sm transition-colors flex items-center gap-2 cursor-pointer bg-[#050505]/50 backdrop-blur-sm"
            >
              <Cpu className="w-4 h-4" /> Ping Server
            </a>
          </div>
        </motion.div>

        {/* Right Side: The Cloud Orbit */}
        <div className="order-1 lg:order-2 relative aspect-square flex items-center justify-center w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] z-10 pointer-events-none">
          <motion.div 
            className="absolute w-full h-full flex items-center justify-center scale-[0.55] sm:scale-75 md:scale-90 lg:scale-100"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateX: shouldReduceMotion ? 0 : mousePos.y * 30,
              rotateY: shouldReduceMotion ? 0 : mousePos.x * 30,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
          >
            
            {/* 3D Tilted Orbit Container */}
            <div 
              className="absolute w-full h-full flex items-center justify-center" 
              style={{ transformStyle: "preserve-3d", transform: "rotateX(65deg) rotateY(10deg)" }}
            >
              {/* Rings */}
              <div className="absolute w-[280px] h-[280px] rounded-full border border-accent/40 shadow-[0_0_20px_rgba(254,128,25,0.2)]" />
              <div className="absolute w-[420px] h-[420px] rounded-full border border-accent/20 shadow-[0_0_10px_rgba(254,128,25,0.1)]" />
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
                    className="absolute bg-[#050505] border border-accent/40 p-3 sm:p-4 rounded-full shadow-[0_0_25px_rgba(254,128,25,0.4)] backdrop-blur-md"
                    style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%) rotateX(-65deg) rotateY(-10deg)', transformStyle: "preserve-3d" }}
                  >
                    {/* Counter-rotate Z so the icon remains upright against the orbit */}
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

            {/* Center Profile Picture (The "Core") */}
            <div className="absolute z-50 pointer-events-auto" style={{ transform: "translateZ(30px)" }}>
              <div className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-accent/80 via-background to-accent/80 ${shouldReduceMotion ? "" : "animate-[spin_15s_linear_infinite]"} shadow-[0_0_60px_rgba(254,128,25,0.5)]`}>
                <div className={`w-full h-full rounded-full overflow-hidden ${shouldReduceMotion ? "" : "animate-[spin_15s_linear_infinite_reverse]"} border-4 border-background bg-background relative group`}>
                  <img 
                    src={profilePic} 
                    alt="Chanduka Lakshan" 
                    className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100" 
                  />
                  <div className="absolute inset-0 bg-accent/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
