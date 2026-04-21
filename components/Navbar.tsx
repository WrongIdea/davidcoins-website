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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-[#08080f]/95 backdrop-blur border-b border-zinc-800" : "bg-transparent"}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-black text-xl tracking-widest text-white uppercase">
          David<span className="text-[#00C2FF]">Coins</span>
        </span>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-8 text-xs font-bold text-zinc-400 uppercase tracking-widest">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-[#00C2FF] transition-colors">{l.label}</a>
          ))}
          <a href="#booking" className="px-5 py-2 rounded-full bg-[#00C2FF] hover:bg-[#00aee6] text-black font-black text-xs tracking-widest uppercase transition-colors">
            Book Now
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)} className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5" aria-label="Toggle menu">
          <span className={`block h-0.5 w-6 bg-zinc-300 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-zinc-300 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-zinc-300 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`sm:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col px-6 pb-6 pt-2 gap-4 border-t border-zinc-800 bg-[#08080f]">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-zinc-300 hover:text-[#00C2FF] text-sm py-2 uppercase tracking-widest font-bold transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)} className="text-center py-3 rounded-full bg-[#00C2FF] hover:bg-[#00aee6] text-black font-black text-xs tracking-widest uppercase transition-colors">
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
