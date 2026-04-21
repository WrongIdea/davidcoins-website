"use client";
import { useInView } from "@/hooks/useInView";

const mixes = [
  {
    title: "Six Double Two Sessions Vol. 1",
    url: "https://www.podomatic.com/search?q=SIX%20DOUBLE%20TWO%20SESSIONS",
    embedUrl: null,
  },
];

const podomaticSearch = "https://www.podomatic.com/search?q=SIX%20DOUBLE%20TWO%20SESSIONS";

export default function Mixes() {
  const { ref, inView } = useInView();

  return (
    <section id="mixes" className="py-28 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-black tracking-[0.3em] uppercase text-[#00C2FF] mb-4">Listen</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">Mixes</h2>
          <p className="text-zinc-500 text-sm mt-3 max-w-lg">
            The Six Double Two Sessions — deep, soulful, and raw. New mixes dropping regularly.
          </p>
        </div>

        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Podomatic embed */}
          <div className="bg-[#0f0f1a] border border-zinc-800 rounded-2xl overflow-hidden mb-6">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-black tracking-widest uppercase text-[#00C2FF] mb-1">Now Streaming</p>
                <h3 className="text-white font-black text-lg">Six Double Two Sessions</h3>
              </div>
              <a
                href={podomaticSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full border border-zinc-700 hover:border-[#00C2FF] text-zinc-400 hover:text-[#00C2FF] text-xs font-black tracking-widest uppercase transition-colors"
              >
                View All →
              </a>
            </div>

            {/* Mix cards */}
            <div className="p-6 flex flex-col gap-4">
              {[1, 2, 3].map((n) => (
                <a
                  key={n}
                  href={podomaticSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-[#00C2FF]/40 hover:bg-[#00C2FF]/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00C2FF]/20 transition-colors">
                    <span className="text-[#00C2FF] text-lg">▶</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">Six Double Two Sessions Vol. {n}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">David Coins · Deep House</p>
                  </div>
                  <span className="text-zinc-600 text-xs font-bold tracking-widest uppercase group-hover:text-[#00C2FF] transition-colors">Play</span>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center">
            <a
              href={podomaticSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-zinc-700 hover:border-[#00C2FF] hover:bg-[#00C2FF]/10 text-zinc-400 hover:text-[#00C2FF] font-black text-xs tracking-widest uppercase transition-all"
            >
              All Mixes on Podomatic →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
