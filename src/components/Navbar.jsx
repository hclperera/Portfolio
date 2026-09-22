"use client";

import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? "bg-background/80 backdrop-blur-md border-border py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <Terminal className="text-accent w-6 h-6 group-hover:animate-pulse" />
          <span className="font-mono font-bold text-lg tracking-tighter">
            <span className="text-accent">~/</span>chanduka
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground/70 hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/Chanduka_Lakshan.pdf"
            target="_blank"
            className="px-4 py-2 border border-accent text-accent rounded-sm hover:bg-accent hover:text-accent-foreground transition-all flex items-center gap-2"
          >
            Get CV
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg font-mono">
          <div className="flex flex-col p-4 gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground/70 hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/Chanduka_Lakshan.pdf"
              target="_blank"
              className="w-full text-center px-4 py-2 border border-accent text-accent rounded-sm hover:bg-accent hover:text-accent-foreground transition-all"
            >
              Get CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
