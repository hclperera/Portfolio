"use client";

import { motion } from "framer-motion";
import { Server, Smartphone, Database, PenTool, LayoutTemplate } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Cloud & DevOps",
    icon: <Server className="w-6 h-6 mb-4 text-accent" />,
    skills: ["Microsoft Azure", "Docker", "Linux (Ubuntu/CentOS)", "CI/CD"],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="w-6 h-6 mb-4 text-accent" />,
    skills: ["Flutter", "Android Studio", "Java", "SQLite"],
  },
  {
    title: "Backend & ML",
    icon: <Database className="w-6 h-6 mb-4 text-accent" />,
    skills: ["Python", "FastAPI", "MySQL", "OpenCV", "YOLOv8"],
  },
  {
    title: "Languages & Tools",
    icon: <PenTool className="w-6 h-6 mb-4 text-accent" />,
    skills: ["C/C++", "Git & GitHub", "Postman", "Selenium", "Qt"],
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <span className="text-accent font-mono">01.</span> About Me
          </h2>
          <div className="w-20 h-1 bg-accent mb-8"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-foreground/80 space-y-4 text-lg leading-relaxed">
              <p>
                I am an Information Technology undergraduate with a strong interest in DevOps, cloud infrastructure, automation, and reliable software delivery.
              </p>
              <p>
                My expertise spans across mobile application development, backend systems, and containerization. I enjoy building seamless digital experiences and deploying them reliably using modern cloud practices.
              </p>
              <p className="flex items-center gap-2">
                Eager to learn new technologies and apply engineering practices across cloud, backend, and mobile environments. 
                {/* Easter Egg: Linux Penguin SVG */}
                <svg className="w-4 h-4 opacity-10 hover:opacity-100 transition-opacity cursor-help" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C12,2 8,5 8,11C8,15 9,19 6,21C6,21 11,22 12,22C13,22 18,21 18,21C15,19 16,15 16,11C16,5 12,2 12,2 M10,13A1,1 0 0,1 9,12A1,1 0 0,1 10,11A1,1 0 0,1 11,12A1,1 0 0,1 10,13 M14,13A1,1 0 0,1 13,12A1,1 0 0,1 14,11A1,1 0 0,1 15,12A1,1 0 0,1 14,13Z" />
                </svg>
              </p>
            </div>
            
            <div className="relative">
              {/* Image Placeholder (can be replaced with user image later) */}
              <div className="aspect-square md:aspect-auto md:h-full rounded-lg bg-border/30 border border-border flex items-center justify-center relative overflow-hidden group">
                <LayoutTemplate className="w-24 h-24 text-foreground/20 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 font-mono text-xs text-foreground/40">
                  IMAGE_PLACEHOLDER.JPG
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-8 font-mono">Technical Arsenal</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_CATEGORIES.map((category, index) => (
              <div key={index} className="p-6 rounded-lg border border-border bg-background hover:border-accent/50 transition-colors group">
                {category.icon}
                <h4 className="text-lg font-semibold mb-4 text-foreground group-hover:text-accent transition-colors">{category.title}</h4>
                <ul className="space-y-2 font-mono text-sm text-foreground/70">
                  {category.skills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
