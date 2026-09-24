"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Code, Cpu, GripVertical } from "lucide-react";
import { supabase } from "@/lib/supabase";
import DecryptedText from "./react-bits/DecryptedText";

export default function Hero() {
  const [profilePic, setProfilePic] = useState("/profile.png");
  const [splitPos, setSplitPos] = useState(50);
  const containerRef = useRef(null);
  
  useEffect(() => {
    supabase.from("profile").select("profile_picture_url").eq("id", 1).single().then(({data}) => {
      if (data?.profile_picture_url) {
        setProfilePic(data.profile_picture_url);
      }
    });
  }, []);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSplitPos(percentage);
  };

  const RawCodeSide = () => (
    <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8 text-xs md:text-base lg:text-lg font-mono pt-20">
      <div className="max-w-2xl w-full">
        <div className="flex gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <pre className="text-foreground/80 overflow-x-auto whitespace-pre-wrap">
          <span className="text-blue-400">const</span> <span className="text-yellow-300">developer</span> = {'{\n'}
          {'  '}name: <span className="text-green-400">"Chanduka Lakshan"</span>,\n
          {'  '}roles: [<span className="text-green-400">"DevOps Engineer"</span>, <span className="text-green-400">"Mobile Developer"</span>],\n
          {'  '}status: <span className="text-green-400">"online"</span>,\n
          {'  '}techStack: [<span className="text-green-400">"Linux"</span>, <span className="text-green-400">"Docker"</span>, <span className="text-green-400">"Azure"</span>, <span className="text-green-400">"Flutter"</span>],\n
          {'  '}mission: <span className="text-green-400">"Crafting resilient cloud architectures."</span>,\n
          {'  '}location: <span className="text-green-400">"Colombo, Sri Lanka"</span>\n
          {'}'};
        </pre>
      </div>
    </div>
  );

  const RenderedSide = () => (
    <div className="w-full h-full bg-[#050505] flex items-center justify-center p-8 pt-20">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border/50 border border-border text-sm font-mono text-accent mb-6">
            <Terminal className="w-4 h-4" />
            <DecryptedText text='sys.status === "online"' animateOn="view" maxIterations={20} speed={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 flex flex-col items-start gap-4">
            <span className="font-sans whitespace-nowrap text-[#fafafa]">Hi, I'm</span>
            <span className="font-sans whitespace-nowrap text-accent">Chanduka Lakshan</span>
          </h1>
          <p className="text-xl text-foreground/70 mb-8 max-w-lg">
            DevOps Engineer & Mobile Developer crafting robust applications and scalable cloud infrastructure.
          </p>
          <div className="flex flex-wrap gap-4 font-mono">
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Code className="w-4 h-4" />
              View Projects
            </a>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 border border-border hover:border-accent text-foreground hover:text-accent rounded-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              Contact Me
            </a>
          </div>
        </div>
        <div className="relative aspect-square md:aspect-auto md:h-[450px] lg:h-[550px] w-full flex items-end justify-center pointer-events-none">
          <div className="w-full h-full flex items-end justify-center relative overflow-hidden mask-image-bottom-fade">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none"></div>
            <img 
              src={profilePic} 
              alt="Chanduka Lakshan" 
              className="w-full h-full object-contain object-bottom drop-shadow-[0_0_30px_rgba(34,197,94,0.5)] relative z-0" 
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      id="home" 
      className="h-screen w-full relative overflow-hidden select-none cursor-ew-resize touch-none"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
    >
      {/* Base Layer: Rendered UI */}
      <div className="absolute inset-0">
        <RenderedSide />
      </div>

      {/* Top Layer: Raw Code */}
      <div 
        className="absolute inset-0 border-r-2 border-accent shadow-[4px_0_24px_rgba(34,197,94,0.2)]"
        style={{ clipPath: `polygon(0 0, ${splitPos}% 0, ${splitPos}% 100%, 0 100%)` }}
      >
        <RawCodeSide />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 flex items-center justify-center pointer-events-none z-50"
        style={{ left: `${splitPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-8 h-12 bg-accent rounded-sm flex items-center justify-center text-accent-foreground shadow-lg pointer-events-auto cursor-grab active:cursor-grabbing border-2 border-[#050505]">
          <GripVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/40 font-mono text-xs tracking-widest animate-pulse pointer-events-none z-50 bg-[#050505]/50 px-4 py-2 rounded-full backdrop-blur-md">
        &lt; DRAG TO COMPILE &gt;
      </div>
    </section>
  );
}
