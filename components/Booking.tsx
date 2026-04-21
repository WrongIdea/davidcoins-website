"use client";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

type Status = "idle" | "loading" | "success" | "error";

export default function Booking() {
  const [status, setStatus] = useState<Status>("idle");
  const { ref, inView } = useInView();

  const inputClass = "w-full bg-transparent border-b border-zinc-700 focus:border-[#00C2FF] px-0 py-3 text-white placeholder-zinc-700 text-sm outline-none transition-colors";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setStatus("success"); (e.target as HTMLFormElement).reset(); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  return (
    <section id="booking" className="py-28 px-8 sm:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-32 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Left */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-3 flex items-center gap-3">
                <span className="w-6 h-px bg-[#00C2FF]" />
                Bookings
              </p>
              <h2 className="text-5xl sm:text-6xl font-black text-white leading-none mb-8">
                Book a<br />Set
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-12">
                Available for clubs, festivals, private events, and corporate functions. Expect a response within 48 hours.
              </p>
            </div>

            <div className="flex flex-col gap-6 border-t border-white/5 pt-10">
              {[
                { label: "Club & Venue Nights", icon: "🎧" },
                { label: "Festivals & Outdoor", icon: "🎪" },
                { label: "Corporate Functions", icon: "🤝" },
                { label: "Private Events", icon: "🎉" },
              ].map(i => (
                <div key={i.label} className="flex items-center gap-4">
                  <span className="text-lg">{i.icon}</span>
                  <span className="text-zinc-400 text-sm font-medium">{i.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form — underline style */}
          {status === "success" ? (
            <div className="flex flex-col justify-center border border-[#00C2FF]/20 bg-[#00C2FF]/5 p-10">
              <p className="text-[10px] font-black tracking-widest uppercase text-[#00C2FF] mb-3">Confirmed</p>
              <p className="text-2xl font-black text-white mb-3">Request Received</p>
              <p className="text-zinc-400 text-sm mb-6">We&apos;ll get back to you within 48 hours.</p>
              <button onClick={() => setStatus("idle")} className="text-[10px] font-black tracking-widest uppercase text-zinc-500 hover:text-[#00C2FF] transition-colors self-start">
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-600 block mb-1">Name *</label>
                  <input type="text" name="name" required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-600 block mb-1">Email *</label>
                  <input type="email" name="email" required placeholder="your@email.com" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-zinc-600 block mb-1">Phone</label>
                <input type="tel" name="phone" placeholder="+27 82 000 0000" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-600 block mb-1">Event Type *</label>
                  <select name="event_type" required defaultValue="" className={`${inputClass} bg-[#050508]`}>
                    <option value="" disabled>Select...</option>
                    <option value="club">Club Night</option>
                    <option value="festival">Festival</option>
                    <option value="corporate">Corporate</option>
                    <option value="private">Private Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-600 block mb-1">Date</label>
                  <input type="date" name="event_date" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-zinc-600 block mb-1">Location</label>
                <input type="text" name="location" placeholder="City, Venue" className={inputClass} />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-zinc-600 block mb-1">Message</label>
                <textarea name="message" rows={3} placeholder="Tell us about your event..." className={`${inputClass} resize-none`} />
              </div>
              {status === "error" && <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>}
              <button type="submit" disabled={status === "loading"}
                className="self-start px-10 py-4 bg-[#00C2FF] hover:bg-white text-black font-black text-xs tracking-[0.3em] uppercase transition-colors disabled:opacity-50">
                {status === "loading" ? "Sending..." : "Submit Request →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
