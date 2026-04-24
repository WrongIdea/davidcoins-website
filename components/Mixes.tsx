"use client";
import { useInView } from "@/hooks/useInView";

const embeds = [
  "https://podomatic.com/embed/html5/episode/11051132",
  "https://podomatic.com/embed/html5/episode/11040812",
  "https://podomatic.com/embed/html5/episode/10969683",
  "https://podomatic.com/embed/html5/episode/10956605",
  "https://podomatic.com/embed/html5/episode/10898932",
];

export default function Mixes() {
  const { ref, inView } = useInView();

  return (
    <section id="mixes" className="py-28 px-8 sm:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
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
          <a href="https://www.podomatic.com/search?q=SIX%20DOUBLE%20TWO%20SESSIONS" target="_blank" rel="noopener noreferrer"
            className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500 hover:text-[#00C2FF] transition-colors border-b border-zinc-700 hover:border-[#00C2FF] pb-1 self-start sm:self-auto">
            All Mixes on Podomatic →
          </a>
        </div>

        <div ref={ref} className={`flex flex-col gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {embeds.map((src, i) => (
            <div key={i} className="w-full border border-white/5">
              <iframe
                src={src}
                height={208}
                width="100%"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                scrolling="no"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
