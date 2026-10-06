"use client";

// Continuously scrolling marquee strip — used as section dividers
const ITEMS = [
  "DevOps",
  "Microsoft Azure",
  "Mobile Development",
  "Flutter",
  "Dart",
  "Linux",
  "Docker",
  "Python",
  "Bash",
  "Git",
  "REST APIs",
  "Postman",
  "MySQL",
  "Agile Development"

];

export default function TickerStrip({ reverse = false }) {
  const doubled = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

  return (
    <div className="w-full overflow-hidden border-y border-border/30 bg-[#060606] py-3 select-none">
      <div
        className="flex whitespace-nowrap marquee-track"
        style={
          reverse
            ? { animationDirection: "reverse", animationDuration: "30s" }
            : { animationDuration: "25s" }
        }
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-6 text-xs font-mono text-foreground/40 uppercase tracking-widest"
          >
            <span className="text-accent text-base leading-none">{`//`}</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
