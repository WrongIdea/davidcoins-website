"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "Mixes", href: "#mixes" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Merch", href: "#merch" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-[#050508]/90 backdrop-blur-xl" : "bg-transparent"}`}>
      {/* Top thin cyan line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00C2FF]/60 to-transparent" />

      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — minimal wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-[#00C2FF]/60 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#00C2FF]" />
          </div>
          <span className="font-black text-sm tracking-[0.2em] text-white uppercase">
            David Coins
          </span>
        </div>

        {/* Desktop — centered links */}
        <div className="hidden sm:flex items-center gap-10 text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-[#00C2FF] transition-colors duration-200 relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00C2FF] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a href="#booking" className="text-[11px] font-black tracking-[0.2em] uppercase text-black bg-[#00C2FF] hover:bg-white px-5 py-2 transition-colors duration-200">
            Book Now
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)} className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5" aria-label="Toggle menu">
          <span className={`block h-px w-6 bg-zinc-300 transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-px w-6 bg-zinc-300 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-zinc-300 transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile */}
      <div className={`sm:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col px-6 pb-6 pt-3 gap-5 border-t border-white/5 bg-[#050508]">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-zinc-400 hover:text-[#00C2FF] text-xs py-1 uppercase tracking-[0.2em] font-bold transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)} className="text-center py-3 bg-[#00C2FF] hover:bg-white text-black font-black text-xs tracking-[0.2em] uppercase transition-colors">
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
