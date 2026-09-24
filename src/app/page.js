"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Preloader from "@/components/Preloader";
import TickerStrip from "@/components/TickerStrip";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <AnimatePresence>
        {loaded && (
          <motion.main
            className="min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
            </div>
            <Navbar />
            <Hero />
            <TickerStrip />
            <About />
            <TickerStrip reverse />
            <Projects />
            <Certifications />
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
