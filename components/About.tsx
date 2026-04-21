"use client";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const tags = ["Deep House", "Soulful House", "Afro Deep", "South Africa", "Live Sets"];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-28 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <Image src="/gallery/davidcoins2.jpeg" alt="David Coins" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-[#00C2FF]/10 border border-[#00C2FF]/20" />
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-[#00C2FF]/5 border border-[#00C2FF]/10" />
        </div>

        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs font-black tracking-[0.3em] uppercase text-[#00C2FF] mb-4">The DJ</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6 leading-tight">
            Who Is<br />David Coins?
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            David Coins is a South African Deep House DJ known for crafting soulful, groove-driven sets that move both the mind and the body. With a signature blend of afro deep and soulful house, David Coins creates sonic journeys that keep dancefloors alive from sunset to sunrise.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-8">
            The <span className="text-[#00C2FF] font-semibold">Six Double Two Sessions</span> are his flagship mix series — raw, unfiltered deep house delivered with passion and precision.
          </p>
          <div className="flex flex-wrap gap-3">
            {tags.map((t) => (
              <span key={t} className="px-4 py-2 rounded-full border border-zinc-800 text-xs text-zinc-400 font-medium tracking-wide hover:border-[#00C2FF]/40 hover:text-[#00C2FF] transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
