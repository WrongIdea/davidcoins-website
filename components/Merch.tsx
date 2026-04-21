"use client";
import Image from "next/image";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

export default function Merch() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const { ref, inView } = useInView();

  return (
    <section id="merch" className="py-28 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        <div className="mb-16">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00C2FF]" />
            Store
          </p>
          <h2 className="text-5xl sm:text-6xl font-black text-white leading-none">Merch</h2>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-5 gap-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Large image — 3 cols */}
          <div className="lg:col-span-3 relative h-80 lg:h-[500px] overflow-hidden">
            <Image src="/gallery/merch1.jpeg" alt="David Coins Merch" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050508]/80 hidden lg:block" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] font-black tracking-widest uppercase text-black bg-[#00C2FF] px-3 py-1.5">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Info panel — 2 cols */}
          <div className="lg:col-span-2 border border-white/5 bg-white/[0.02] p-8 sm:p-10 flex flex-col justify-center gap-8">
            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                David Coins<br />Collection
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Official merchandise — limited drops for real heads. Be the first to know when the store goes live.
              </p>
            </div>

            {sent ? (
              <div className="border border-[#00C2FF]/30 bg-[#00C2FF]/5 p-5">
                <p className="text-[#00C2FF] font-black text-sm">You&apos;re in. 🔥 We&apos;ll notify you on drop day.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); setEmail(""); }} className="flex flex-col gap-3">
                <label className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-600">Drop your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="bg-transparent border border-zinc-700 focus:border-[#00C2FF] px-4 py-3 text-white placeholder-zinc-700 text-sm outline-none transition-colors"
                />
                <button type="submit" className="py-3 bg-[#00C2FF] hover:bg-white text-black font-black text-xs tracking-[0.3em] uppercase transition-colors">
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
