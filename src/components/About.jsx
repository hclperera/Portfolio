"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Server, Smartphone, Database, PenTool, LayoutTemplate } from "lucide-react";
import { FaLinux, FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { SiFlutter, SiAndroid, SiLinux, SiDocker, SiPython, SiNextdotjs, SiReact, SiTailwindcss, SiSupabase, SiGit } from "react-icons/si";
import BorderGlow from "./react-bits/BorderGlow";
import LogoLoop from "./react-bits/LogoLoop";
import { supabase } from "@/lib/supabase";

const TECH_LOGOS = [
  { node: <SiFlutter />, title: "Flutter" },
  { node: <SiAndroid />, title: "Android Studio" },
  { node: <FaJava />, title: "Java" },
  { node: <SiPython />, title: "Python" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiReact />, title: "React" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiLinux />, title: "Linux" },
  { node: <SiDocker />, title: "Docker" },
  { node: <VscAzure />, title: "Azure" },
  { node: <SiGit />, title: "Git" },
];

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

const ICONS_MAP = {
  Server: <Server className="w-6 h-6 mb-4 text-accent" />,
  Smartphone: <Smartphone className="w-6 h-6 mb-4 text-accent" />,
  Database: <Database className="w-6 h-6 mb-4 text-accent" />,
  PenTool: <PenTool className="w-6 h-6 mb-4 text-accent" />,
  LayoutTemplate: <LayoutTemplate className="w-6 h-6 mb-4 text-accent" />
};

export default function About() {
  const [aboutTexts, setAboutTexts] = useState([
    "I am an Information Technology undergraduate with a strong interest in DevOps, cloud infrastructure, automation, and reliable software delivery.",
    "My expertise spans across mobile application development, backend systems, and containerization. I enjoy building seamless digital experiences and deploying them reliably using modern cloud practices.",
    "Eager to learn new technologies and apply engineering practices across cloud, backend, and mobile environments."
  ]);
  const [skillCategories, setSkillCategories] = useState(SKILL_CATEGORIES);

  useEffect(() => {
    supabase.from("profile").select("about_texts").eq("id", 1).single().then(({data}) => {
      if (data?.about_texts?.length > 0) {
        setAboutTexts(data.about_texts);
      }
    });

    supabase.from("skills").select("*").order("id", { ascending: true }).then(({data}) => {
      if (data?.length > 0) {
        setSkillCategories(data.map(d => ({
          ...d,
          skills: d.items || [],
          icon: ICONS_MAP[d.icon_name] || <Server className="w-6 h-6 mb-4 text-accent" />
        })));
      }
    });
  }, []);

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
              {aboutTexts.map((text, idx) => (
                <p key={idx} className={idx === aboutTexts.length - 1 ? "flex items-center gap-2" : ""}>
                  {text}
                </p>
              ))}
            </div>
            
            <div className="rounded-lg border border-border bg-[#050505] overflow-hidden shadow-2xl h-fit">
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
                  <p className="pl-4">"devops": ["Linux", "Docker", "Azure", "Git"],</p>
                  <p className="pl-4">"mobile": ["Flutter", "Android Studio", "Java"],</p>
                  <p className="pl-4">"backend": ["Python", "FastAPI", "SQL"]</p>
                  <p>&#125;</p>
                </div>

                <p className="text-accent mb-2 flex items-center gap-2">
                  $ cursor_ <span className="w-2 h-4 bg-accent animate-pulse inline-block"></span>
                </p>
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
            {skillCategories.map((category, index) => (
              <BorderGlow
                key={index}
                edgeSensitivity={20}
                glowColor="142 70 45"
                backgroundColor="#09090b"
                borderRadius={8}
                glowRadius={15}
                glowIntensity={0.8}
                coneSpread={20}
                animated={false}
                colors={['#22c55e', '#16a34a', '#15803d']}
                className="h-full"
              >
                <div className="p-6 flex flex-col h-full group z-10">
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
              </BorderGlow>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <LogoLoop
            logos={TECH_LOGOS}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#09090b"
          />
        </motion.div>
      </div>
    </section>
  );
}
