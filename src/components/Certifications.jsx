"use client";

import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "100 Days of DevOps",
    issuer: "KodeKloud",
    date: "Nov 2025",
  },
  {
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "2026",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative border-t border-border/50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <span className="text-accent font-mono">03.</span> Certifications
          </h2>
          <div className="w-20 h-1 bg-accent mb-12"></div>

          <div className="space-y-6">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-lg border border-border bg-background hover:bg-border/20 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 text-accent rounded-full group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">{cert.title}</h3>
                    <p className="text-foreground/60 font-mono text-sm mt-1">{cert.issuer}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-foreground/50 font-mono text-sm bg-background border border-border px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4" />
                  {cert.date}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
