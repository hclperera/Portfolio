"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { BorderBeam } from "@/components/magicui/border-beam";

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
  const [certificationsList, setCertificationsList] = useState(CERTIFICATIONS);

  useEffect(() => {
    supabase.from("certifications").select("*").order("id", { ascending: true }).then(({data}) => {
      if (data && data.length > 0) {
        setCertificationsList(data);
      }
    });
  }, []);

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
            {certificationsList.map((cert, index) => (
              <motion.div
                key={cert.id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group rounded-lg border border-border bg-background hover:bg-border/10 transition-all overflow-hidden flex flex-col md:flex-row items-stretch"
              >
                <BorderBeam duration={8} size={100} color="#fe8019" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {cert.image_url && (
                  <div className="w-full md:w-48 h-48 md:h-auto shrink-0 border-b md:border-b-0 md:border-r border-border bg-[#0a0a0a]">
                    <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 text-accent rounded-full group-hover:scale-110 transition-transform shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">{cert.title}</h3>
                      <p className="text-foreground/60 font-mono text-sm mt-1">{cert.issuer}</p>
                      {cert.credential_url && (
                        <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-accent hover:underline text-xs mt-2 inline-flex items-center gap-1">
                          View Credential <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-foreground/50 font-mono text-sm bg-background border border-border px-3 py-1 rounded-full shrink-0">
                    <Calendar className="w-4 h-4" />
                    {cert.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
