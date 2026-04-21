import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background image */}
      <Image src="/gallery/davidcoins1.jpeg" alt="David Coins" fill priority className="object-cover object-top" sizes="100vw" />
      {/* Overlays */}
      <div aria-hidden className="absolute inset-0 bg-black/65 pointer-events-none" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080f] pointer-events-none" />
      {/* Cyan glow */}
      <div aria-hidden className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00C2FF]/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center gap-5">
        <p className="animate-fade-in text-xs font-black tracking-[0.4em] uppercase text-[#00C2FF]">
          Deep House DJ
        </p>
        <h1 className="animate-fade-up delay-100 text-6xl sm:text-9xl font-black tracking-tight text-white uppercase leading-none">
          David<br /><span className="text-[#00C2FF]">Coins</span>
        </h1>
        <p className="animate-fade-up delay-200 text-zinc-300 text-base sm:text-lg max-w-md leading-relaxed">
          Deep grooves. Soulful sounds. Unforgettable sets.
        </p>
        <div className="animate-fade-up delay-300 flex flex-wrap justify-center gap-4 mt-2">
          <a href="#mixes" className="px-8 py-3 rounded-full bg-[#00C2FF] hover:bg-[#00aee6] text-black font-black text-sm tracking-widest uppercase transition-colors animate-glow">
            Listen to Mixes
          </a>
          <a href="#booking" className="px-8 py-3 rounded-full border border-zinc-500 hover:border-[#00C2FF] text-zinc-200 hover:text-[#00C2FF] font-black text-sm tracking-widest uppercase transition-colors">
            Book David Coins
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-zinc-500 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
}
