"use client";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-28 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        {/* Full-width image with text overlay */}
        <div className="relative w-full h-[70vh] min-h-[500px] rounded-none overflow-hidden mb-0">
          <Image src="/gallery/davidcoins3.jpeg" alt="David Coins" fill className="object-cover object-top" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />

          <div
            ref={ref}
            className={`absolute inset-0 flex flex-col justify-end p-8 sm:p-16 max-w-2xl transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00C2FF]" />
              The Artist
            </p>
            <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
              David<br />Coins
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4 max-w-md">
              A South African Deep House DJ carving his own lane with soulful, groove-driven sets that blur the line between underground and anthemic. Known for the <span className="text-[#00C2FF] font-semibold">Six Double Two Sessions</span> — a mix series built on authenticity and raw energy.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
              From intimate club nights to open-air festivals, David Coins delivers sonic journeys that stay with you long after the last record drops.
            </p>

            <div className="flex flex-wrap gap-2 mt-8">
              {["Deep House", "Soulful House", "Afro Deep", "Live Sets"].map(t => (
                <span key={t} className="text-[10px] font-black tracking-widest uppercase text-[#00C2FF] border border-[#00C2FF]/30 px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/5">
          {[
            { value: "622", label: "Sessions" },
            { value: "Deep", label: "Genre" },
            { value: "SA", label: "Based In" },
            { value: "Live", label: "Available" },
          ].map((s, i) => (
            <div key={i} className={`px-8 py-6 ${i < 3 ? "border-r border-white/5" : ""}`}>
              <p className="text-2xl sm:text-3xl font-black text-white">{s.value}</p>
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
