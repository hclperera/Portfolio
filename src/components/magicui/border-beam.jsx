"use client";

import React from "react";

export function BorderBeam({ 
  duration = 8, 
  size = 100, 
  color = "#fe8019",
  className = ""
}) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none rounded-[inherit] ${className}`}
      style={{ zIndex: 10 }}
    >
      <div 
        className="absolute inset-[-2px] rounded-[inherit] opacity-100"
        style={{
          padding: "2px",
          background: `conic-gradient(from var(--angle), transparent ${100 - (size > 100 ? 50 : size/3)}%, ${color} 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: `rotate-border ${duration}s linear infinite`,
        }}
      />
    </div>
  );
}
