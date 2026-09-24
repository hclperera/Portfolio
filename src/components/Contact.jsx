"use client";

import { motion } from "framer-motion";
import { Mail, FileText, Send } from "lucide-react";
import { FaDocker, FaLinux, FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { SiGit, SiFlutter, SiPython, SiNextdotjs } from "react-icons/si";
import DecryptedText from "./react-bits/DecryptedText";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function Contact() {
  const [cvUrl, setCvUrl] = useState("/Chanduka_Lakshan.pdf");

  useEffect(() => {
    supabase.from("profile").select("cv_url").eq("id", 1).single().then(({data}) => {
      if (data?.cv_url) {
        setCvUrl(data.cv_url);
      }
    });
  }, []);

  return (
    <section id="contact" className="py-24 relative bg-[#050505]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-accent">04.</span> What's Next?
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 mt-4">Get In Touch</h3>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto mb-12">
            Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16 font-mono">
            <a
              href="mailto:chandukalakshanbttdm@gmail.com"
              className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-sm hover:bg-accent/90 transition-all flex items-center gap-3 w-full sm:w-auto justify-center group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Say Hello
            </a>
            
            <a
              href={cvUrl}
              target="_blank"
              className="px-8 py-4 border border-border hover:border-accent text-foreground hover:text-accent font-bold rounded-sm transition-colors flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <FileText className="w-5 h-5" />
              Download CV
            </a>
          </div>

          <div className="flex justify-center gap-8 mb-24">
            <a href="https://github.com/hclperera" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-accent transition-colors p-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
            <a href="https://linkedin.com/in/chanduka-lakshan" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-accent transition-colors p-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:chandukalakshanbttdm@gmail.com" className="text-foreground/50 hover:text-accent transition-colors p-2">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>

      <footer className="border-t border-border/30 bg-[#020202] pt-16 pb-8 mt-24 text-left">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Column 1: Info */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-foreground">
                Chanduka Lakshan
              </h3>
              <p className="text-accent font-mono text-sm">
                B.Sc. IT Undergraduate
              </p>
              <p className="text-foreground/60 text-sm leading-relaxed max-w-md mt-4">
                Focused on resilient cloud architectures, containerized microservices, and mobile application development. Open to engineering opportunities worldwide.
              </p>
              <div className="flex items-center gap-2 text-foreground/50 text-sm font-mono mt-6">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Based in Colombo, Sri Lanka
              </div>
            </div>

            {/* Column 2: Sitemap */}
            <div className="md:col-span-3">
              <h4 className="text-accent font-mono text-xs font-bold tracking-widest uppercase mb-6">Sitemap</h4>
              <ul className="space-y-3 font-mono text-sm text-foreground/60">
                <li><a href="#home" className="hover:text-accent transition-colors">// 01 Overview</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors">// 02 About Me</a></li>
                <li><a href="#projects" className="hover:text-accent transition-colors">// 03 Technical Projects</a></li>
                <li><a href="#certifications" className="hover:text-accent transition-colors">// 04 Qualifications</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">// 05 Contact & Inquiry</a></li>
              </ul>
            </div>

            {/* Column 3: Network */}
            <div className="md:col-span-3">
              <h4 className="text-accent font-mono text-xs font-bold tracking-widest uppercase mb-6">Network</h4>
              <ul className="space-y-3 font-mono text-sm text-foreground/60">
                <li><a href="https://github.com/hclperera" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center justify-between">GitHub <span className="text-xs">↗</span></a></li>
                <li><a href="https://linkedin.com/in/chanduka-lakshan" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center justify-between">LinkedIn <span className="text-xs">↗</span></a></li>
                <li><a href="mailto:chandukalakshanbttdm@gmail.com" className="hover:text-accent transition-colors flex items-center justify-between">Email Terminal <span className="text-xs">↗</span></a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/20 gap-4">
            <div className="text-foreground/40 font-mono text-xs cursor-default">
              <DecryptedText text={`© ${new Date().getFullYear()} Chanduka Lakshan. Engineered with Precision.`} maxIterations={20} speed={40} />
            </div>
            
            {/* Inline Easter Eggs */}
            <div className="flex items-center gap-4 text-foreground/20">
              <span className="text-xs font-mono tracking-widest mr-2">TECH CORE:</span>
              <FaLinux className="w-4 h-4 hover:text-white transition-colors cursor-help" title="Linux" />
              <FaDocker className="w-4 h-4 hover:text-blue-500 transition-colors cursor-help" title="Docker" />
              <VscAzure className="w-4 h-4 hover:text-blue-400 transition-colors cursor-help" title="Azure" />
              <SiGit className="w-4 h-4 hover:text-orange-500 transition-colors cursor-help" title="Git" />
              <SiFlutter className="w-4 h-4 hover:text-cyan-400 transition-colors cursor-help" title="Flutter" />
              <SiPython className="w-4 h-4 hover:text-yellow-400 transition-colors cursor-help" title="Python" />
              <FaJava className="w-4 h-4 hover:text-red-500 transition-colors cursor-help" title="Java" />
              <SiNextdotjs className="w-4 h-4 hover:text-white transition-colors cursor-help" title="Next.js" />
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
