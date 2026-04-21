import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* LEFT — Text panel */}
      <div className="relative z-10 flex flex-col justify-end lg:justify-center px-8 sm:px-16 pt-32 pb-16 lg:py-0">
        {/* Large decorative number */}
        <span className="absolute top-24 left-8 sm:left-16 text-[120px] sm:text-[180px] font-black text-white/[0.03] leading-none select-none pointer-events-none">
          01
        </span>

        <div className="relative">
          <p className="animate-slide-right text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[#00C2FF]" />
            Deep House · South Africa
          </p>

          <h1 className="animate-slide-right delay-100 font-black text-white leading-[0.9] mb-8" style={{ fontSize: "clamp(60px, 10vw, 130px)" }}>
            David<br />
            <span className="text-stroke">Coins</span>
          </h1>

          <style>{`.text-stroke { -webkit-text-stroke: 2px #00C2FF; color: transparent; }`}</style>

          <p className="animate-slide-right delay-200 text-zinc-400 text-sm leading-relaxed max-w-sm mb-10">
            Deep grooves. Soulful frequencies. The sound of underground South Africa — raw, unfiltered, and unapologetic.
          </p>

          <div className="animate-slide-right delay-300 flex flex-wrap gap-4">
            <a href="#mixes" className="group flex items-center gap-3 text-xs font-black tracking-[0.2em] uppercase text-white bg-[#00C2FF]/10 border border-[#00C2FF]/30 hover:bg-[#00C2FF] hover:text-black px-7 py-3.5 transition-all duration-300">
              <span className="w-2 h-2 rounded-full bg-[#00C2FF] group-hover:bg-black transition-colors" />
              Listen Now
            </a>
            <a href="#booking" className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-400 px-7 py-3.5 transition-all duration-300">
              Book a Set
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT — Image panel */}
      <div className="relative h-64 lg:h-auto">
        <Image src="/gallery/davidcoins1.jpeg" alt="David Coins" fill priority className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/30 to-transparent lg:via-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent lg:hidden" />

        {/* Floating tag */}
        <div className="absolute bottom-8 right-8 glass px-5 py-3 hidden lg:block">
          <p className="text-[10px] text-zinc-500 tracking-widest uppercase mb-1">Now Playing</p>
          <p className="text-sm font-black text-white">Six Double Two Sessions</p>
          <p className="text-xs text-[#00C2FF] mt-0.5">Deep House · Live Set</p>
        </div>

        {/* Spinning vinyl decoration */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-40 h-40 opacity-10 animate-spin-slow hidden lg:block">
          <div className="w-full h-full rounded-full border-2 border-[#00C2FF]" />
          <div className="absolute inset-4 rounded-full border border-[#00C2FF]/50" />
          <div className="absolute inset-8 rounded-full border border-[#00C2FF]/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#00C2FF]/30" />
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom left */}
      <div className="absolute bottom-8 left-8 sm:left-16 hidden lg:flex items-center gap-3">
        <div className="w-px h-12 bg-gradient-to-b from-[#00C2FF]/60 to-transparent" />
        <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">Scroll</span>
      </div>
    </section>
  );
}
