"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";

// Mock data as fallback when DB is not connected
const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Infox",
    description: "Main repository for the Project InfoX. A collaborative platform or application.",
    tech_stack: ["Framework", "Collaborative", "Frontend"],
    github_link: "https://github.com/pathumsenadeera/Infox",
    live_link: "",
  },
  {
    id: 2,
    title: "Infox_Backend",
    description: "Backend services and APIs for Project InfoX. Handles data processing and business logic.",
    tech_stack: ["Python", "FastAPI", "Database"],
    github_link: "https://github.com/hclperera/Infox_Backend",
    live_link: "",
  },
  {
    id: 3,
    title: "Infox_Admin",
    description: "Admin panel repository for project InfoX. Built to manage users and platform data.",
    tech_stack: ["JavaScript", "React/Next.js", "Admin Dashboard"],
    github_link: "https://github.com/hclperera/Infox_Admin",
    live_link: "https://admin.projectinfox.tech",
  },
  {
    id: 4,
    title: "Daily Mood Journal",
    description: "An Android app for logging and tracking daily moods. Features secure user authentication and a SQLite database for privacy-focused data filtering.",
    tech_stack: ["Java", "Android Studio", "SQLite"],
    github_link: "https://github.com/hclperera/Daily-Mood-Journal",
    live_link: "",
  },
  {
    id: 5,
    title: "Sinhala Braille Reader (Research)",
    description: "AI-driven assistive mobile application for interpreting Sinhala interpoint Braille from captured images. Uses an image processing pipeline and object detection.",
    tech_stack: ["Flutter", "Python", "FastAPI", "Azure", "OpenCV", "YOLOv8"],
    github_link: "",
    live_link: "",
  }
];

export default function Projects({ projects = MOCK_PROJECTS }) {
  return (
    <section id="projects" className="py-24 relative bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <span className="text-accent font-mono">02.</span> Featured Work
          </h2>
          <div className="w-20 h-1 bg-accent mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border p-6 rounded-lg hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <FolderGit2 className="w-10 h-10 text-accent" />
                  <div className="flex gap-4">
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-accent transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                      </a>
                    )}
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-accent transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-foreground/70 text-sm mb-6 flex-grow">
                  {project.description}
                </p>
                
                <ul className="flex flex-wrap gap-3 font-mono text-xs text-foreground/50 mt-auto">
                  {project.tech_stack.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
