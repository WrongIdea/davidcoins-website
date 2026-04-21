"use client";
import Image from "next/image";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

export default function Merch() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const { ref, inView } = useInView();

  return (
    <section id="merch" className="py-28 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-xs font-black tracking-[0.3em] uppercase text-[#00C2FF] mb-4">Store</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">Merch</h2>
          <p className="text-zinc-500 mt-3 text-sm">Official David Coins merchandise — coming soon.</p>
        </div>

        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {/* Merch preview */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800">
              <div className="relative aspect-square">
                <Image src="/gallery/merch1.jpeg" alt="David Coins Merch" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
              <div className="absolute inset-0 bg-black/50 flex items-end p-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#00C2FF] text-black text-xs font-black uppercase tracking-widest mb-2">Coming Soon</span>
                  <p className="text-white font-black text-lg">David Coins Collection</p>
                </div>
              </div>
            </div>

            {/* Notify form */}
            <div className="bg-[#0f0f1a] border border-[#00C2FF]/20 rounded-2xl p-8 flex flex-col justify-center gap-6">
              <div>
                <h3 className="text-white font-black text-2xl mb-2">Be First to Know</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Drop your email and we&apos;ll notify you the moment the David Coins store goes live. Limited stock available.
                </p>
              </div>
              {sent ? (
                <p className="text-[#00C2FF] font-black">You&apos;re on the list! 🔥 We&apos;ll hit you when merch drops.</p>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); setEmail(""); }} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00C2FF] text-sm transition-colors"
                  />
                  <button type="submit" className="py-3 rounded-xl bg-[#00C2FF] hover:bg-[#00aee6] text-black font-black text-sm tracking-widest uppercase transition-colors">
                    Notify Me
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
