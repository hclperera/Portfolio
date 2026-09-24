"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Cpu } from "lucide-react";
import { supabase } from "@/lib/supabase";
import DecryptedText from "./react-bits/DecryptedText";

const CODE_LINES = [
  "import { CloudManager } from '@azure/core';",
  "function deployInfrastructure() {",
  "  const cluster = new KubernetesCluster('prod');",
  "  cluster.scale({ min: 3, max: 100 });",
  "  return cluster.status;",
  "}",
  "interface MobileApp {",
  "  framework: 'Flutter';",
  "  architecture: 'BLoC';",
  "}",
  "sys.init({ autoDeploy: true, zeroDowntime: true });",
  "const sys_status = 'online';",
];

export default function Hero() {
  const [profilePic, setProfilePic] = useState("/profile.png");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    supabase.from("profile").select("profile_picture_url").eq("id", 1).single().then(({data}) => {
      if (data?.profile_picture_url) {
        setProfilePic(data.profile_picture_url);
      }
    });
  }, []);

  const handleMouseMove = (e) => {
    // calculate mouse position relative to center of screen (-0.5 to 0.5)
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    setMousePos({ x, y });
  };

  const panelsCount = 20;
  // Calculate radius dynamically safely for SSR
  const radius = mounted && window.innerWidth < 768 ? 250 : 500;
  const angle = 360 / panelsCount;

  // Repeat code lines to fill vertical space
  const displayLines = [...CODE_LINES, ...CODE_LINES, ...CODE_LINES, ...CODE_LINES, ...CODE_LINES];

  return (
    <section 
      id="home" 
      className="h-screen w-full relative overflow-hidden bg-[#020202] flex items-center justify-center pt-20"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ perspective: "1500px" }}
    >
      {/* 3D Master Container */}
      <motion.div 
        className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: mousePos.y * -15,
          rotateY: mousePos.x * 15,
        }}
        transition={{ type: "spring", stiffness: 75, damping: 20 }}
      >
        
        {/* The Holographic Code Cylinder */}
        <div 
          className={`absolute w-full h-full flex items-center justify-center transition-all duration-1000 ease-in-out ${isHovering ? 'opacity-20 scale-[1.4]' : 'opacity-60 scale-100'}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className="relative w-full h-[200vh] flex items-center justify-center" 
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: panelsCount }).map((_, i) => (
              <div 
                key={i}
                className="absolute flex flex-col justify-center gap-6 text-accent font-mono text-[10px] sm:text-xs whitespace-nowrap"
                style={{
                  transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {displayLines.map((line, j) => (
                  <div key={j} style={{ opacity: mounted ? Math.random() * 0.7 + 0.3 : 0.5 }}>
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Inner Content (User Profile Card) */}
        <div 
          className="absolute z-50 pointer-events-auto transition-transform duration-1000"
          style={{ transform: `translateZ(${isHovering ? 150 : 0}px)` }}
        >
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 bg-[#050505]/70 p-8 md:p-12 rounded-3xl backdrop-blur-lg border border-accent/20 shadow-[0_0_50px_rgba(34,197,94,0.15)] group/card hover:border-accent/40 hover:shadow-[0_0_80px_rgba(34,197,94,0.25)] transition-all duration-500 mx-4">
            
            {/* Image Profile */}
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-accent/40 shadow-[0_0_30px_rgba(34,197,94,0.2)] shrink-0">
              <img 
                src={profilePic} 
                alt="Chanduka Lakshan" 
                className="w-full h-full object-cover transition-all duration-500 scale-110 group-hover/card:scale-100" 
              />
              {/* Scanline overlay for holographic feel */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none mix-blend-overlay opacity-50"></div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-sm font-mono text-accent mb-6 shadow-[0_0_15px_rgba(34,197,94,0.2)] backdrop-blur-sm">
                <Terminal className="w-4 h-4" />
                <DecryptedText text='sys.status === "online"' animateOn="view" maxIterations={20} speed={40} />
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[#fafafa] drop-shadow-lg font-sans">
                Chanduka Lakshan
              </h1>
              
              <p className="text-base md:text-lg text-foreground/80 mb-8 max-w-md font-mono">
                <span className="text-accent">&gt;</span> DevOps Engineer<br/>
                <span className="text-accent">&gt;</span> Mobile Developer
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 font-mono">
                <a 
                  href="#projects" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 bg-accent text-accent-foreground font-bold rounded-sm hover:bg-accent/90 transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                >
                  <Code className="w-4 h-4" />
                  Initialize Work
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 border border-accent text-accent hover:bg-accent/10 rounded-sm transition-all flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4" />
                  Ping Server
                </a>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </section>
  );
}
