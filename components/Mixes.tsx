"use client";
import { useInView } from "@/hooks/useInView";

const podomaticUrl = "https://www.podomatic.com/search?q=SIX%20DOUBLE%20TWO%20SESSIONS";

const sessions = [
  { vol: "001", title: "Six Double Two Sessions", sub: "Opening Set · Deep House", duration: "60 min" },
  { vol: "002", title: "Six Double Two Sessions", sub: "Late Night Groove · Afro Deep", duration: "75 min" },
  { vol: "003", title: "Six Double Two Sessions", sub: "Underground Sessions · Soulful", duration: "90 min" },
];

export default function Mixes() {
  const { ref, inView } = useInView();

  return (
    <section id="mixes" className="py-28 px-8 sm:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header — editorial style */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00C2FF]" />
              The Sessions
            </p>
            <h2 className="text-5xl sm:text-6xl font-black text-white leading-none">
              Mixes
            </h2>
          </div>
          <a href={podomaticUrl} target="_blank" rel="noopener noreferrer"
            className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500 hover:text-[#00C2FF] transition-colors border-b border-zinc-700 hover:border-[#00C2FF] pb-1 self-start sm:self-auto">
            All Mixes on Podomatic →
          </a>
        </div>

        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Session list — setlist style */}
          <div className="flex flex-col divide-y divide-white/5">
            {sessions.map((s, i) => (
              <a key={i} href={podomaticUrl} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-6 sm:gap-10 py-6 hover:pl-4 transition-all duration-300">
                {/* Volume number */}
                <span className="text-xs font-black text-zinc-700 group-hover:text-[#00C2FF] transition-colors w-10 flex-shrink-0 tracking-widest">
                  {s.vol}
                </span>

                {/* Play button */}
                <div className="w-10 h-10 rounded-full border border-zinc-700 group-hover:border-[#00C2FF] group-hover:bg-[#00C2FF]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <span className="text-[#00C2FF] text-xs ml-0.5">▶</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-black text-base sm:text-lg">{s.title}</p>
                  <p className="text-zinc-500 text-xs mt-1 tracking-wider">{s.sub}</p>
                </div>

                {/* Duration */}
                <span className="text-xs text-zinc-600 font-bold tracking-widest hidden sm:block">{s.duration}</span>

                {/* Arrow */}
                <span className="text-zinc-700 group-hover:text-[#00C2FF] transition-colors text-sm">→</span>
              </a>
            ))}
          </div>

          {/* Waveform decoration */}
          <div className="mt-12 flex items-end gap-1 h-12 opacity-20">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-[#00C2FF] rounded-sm"
                style={{ height: `${20 + Math.sin(i * 0.4) * 15 + Math.random() * 25}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
