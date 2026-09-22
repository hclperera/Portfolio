"use client";

import { motion } from "framer-motion";
import { Mail, FileText, Send } from "lucide-react";

export default function Contact() {
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
              href="/Chanduka_Lakshan.pdf"
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

      <footer className="text-center pb-8 pt-8 border-t border-border/30 relative">
        <p className="text-foreground/40 font-mono text-sm">
          Designed & Built by Chanduka Lakshan
        </p>
        
        {/* Easter Egg: Docker Whale SVG */}
        <div className="absolute bottom-4 right-4 opacity-5 hover:opacity-100 transition-opacity cursor-help">
          <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.5 14c-.65 0-1.2.2-1.67.6-.45.4-.73 1-.73 1.6 0 .5.2 1 .5 1.4.3.4.8.6 1.3.6.5 0 1-.2 1.4-.6.3-.4.5-.9.5-1.4 0-.6-.28-1.2-.73-1.6-.47-.4-1.02-.6-1.67-.6zM15 8h-3V5h3v3zm-4 0H8V5h3v3zm-4 0H4V5h3v3zm11.5 1c-1 0-1.8.2-2.5.7-.6.5-1 1.2-1 2V12h-8c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h8v.5c0 1.4 1.1 2.5 2.5 2.5 1.4 0 2.5-1.1 2.5-2.5V20c1.7 0 3-1.3 3-3v-4c0-2.8-2.2-5-5-5z" />
          </svg>
        </div>
      </footer>
    </section>
  );
}
