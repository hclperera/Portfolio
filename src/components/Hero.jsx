"use client";

import { motion } from "framer-motion";
import { Terminal, Code, Cpu } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glowing Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border/50 border border-border text-sm font-mono text-accent mb-6">
            <Terminal className="w-4 h-4" />
            <span>sys.status === "online"</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Hi, I'm <br />
            <span className="text-accent">Chanduka Lakshan</span>
          </h1>
          
          <p className="text-xl text-foreground/70 mb-8 max-w-lg">
            Mobile Developer & DevOps Engineer crafting robust applications and scalable cloud infrastructure.
          </p>
          
          <div className="flex flex-wrap gap-4 font-mono">
            <a href="#projects" className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-colors flex items-center gap-2">
              <Code className="w-4 h-4" />
              View Projects
            </a>
            <a href="#contact" className="px-6 py-3 border border-border hover:border-accent text-foreground hover:text-accent rounded-sm transition-colors flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Linux Terminal Window Mockup */}
          <div className="rounded-lg border border-border bg-[#050505] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] border-b border-[#1a1a1a]">
              <span className="text-xs font-mono text-foreground/70">chanduka@linux: ~</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#404040]"></div>
                <div className="w-3 h-3 rounded-full bg-[#404040]"></div>
                <div className="w-3 h-3 rounded-full bg-[#cc0000]"></div>
              </div>
            </div>
            <div className="p-6 font-mono text-sm sm:text-base">
              <p className="text-accent mb-2">$ whoami</p>
              <p className="text-foreground/80 mb-4">chanduka_lakshan</p>
              
              <p className="text-accent mb-2">$ cat skills.json</p>
              <div className="text-foreground/80 mb-4 pl-4 border-l-2 border-border">
                <p>&#123;</p>
                <p className="pl-4">"mobile": ["Flutter", "Android Studio", "Java"],</p>
                <p className="pl-4">"devops": ["Linux", "Docker", "Azure", "Git"],</p>
                <p className="pl-4">"backend": ["Python", "FastAPI", "SQL"]</p>
                <p>&#125;</p>
              </div>

              <p className="text-accent mb-2 flex items-center gap-2">
                $ cursor_ <span className="w-2 h-4 bg-accent animate-pulse inline-block"></span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
