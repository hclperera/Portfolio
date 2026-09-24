"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Cpu } from "lucide-react";
import { supabase } from "@/lib/supabase";
import DecryptedText from "./react-bits/DecryptedText";
import FoldText from "./react-bits/FoldText";

export default function Hero() {
  const [profilePic, setProfilePic] = useState("/profile.png");
  
  useEffect(() => {
    supabase.from("profile").select("profile_picture_url").eq("id", 1).single().then(({data}) => {
      if (data?.profile_picture_url) {
        setProfilePic(data.profile_picture_url);
      }
    });
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border/50 border border-border text-sm font-mono text-accent mb-6">
            <Terminal className="w-4 h-4" />
            <DecryptedText text='sys.status === "online"' animateOn="view" maxIterations={20} speed={40} />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 flex flex-col items-start gap-4 overflow-hidden">
            <FoldText
              text="Hi, I'm"
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.045}
              ease="power3.out"
              perspective={700}
              creaseShading={0.55}
              fontSize="clamp(2rem, 4.5vw, 3.5rem)"
              fontWeight={800}
              color="#fafafa"
              className="font-sans whitespace-nowrap"
            />
            <FoldText
              text="Chanduka Lakshan"
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.045}
              ease="power3.out"
              perspective={700}
              creaseShading={0.55}
              fontSize="clamp(2rem, 4.5vw, 3.5rem)"
              fontWeight={800}
              color="#22c55e"
              className="font-sans whitespace-nowrap"
            />
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-square md:aspect-auto md:h-[450px] lg:h-[550px] w-full flex items-end justify-center">
            <div className="w-full h-full flex items-end justify-center relative overflow-hidden group mask-image-bottom-fade">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none"></div>
              <img 
                src={profilePic} 
                alt="Chanduka Lakshan" 
                className="w-full h-full object-contain object-bottom transition-all duration-500 relative z-0 hover:drop-shadow-[0_0_30px_rgba(34,197,94,0.5)] group-hover:scale-105" 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
