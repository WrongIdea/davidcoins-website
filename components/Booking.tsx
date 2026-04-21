"use client";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

type Status = "idle" | "loading" | "success" | "error";

export default function Booking() {
  const [status, setStatus] = useState<Status>("idle");
  const { ref, inView } = useInView();

  const inputClass = "w-full bg-[#0f0f1a] border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00C2FF] transition-colors text-sm";

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

  if (status === "success") {
    return (
      <section id="booking" className="py-28 px-6 border-t border-zinc-900">
        <div className="max-w-xl mx-auto text-center bg-[#0f0f1a] border border-[#00C2FF]/30 rounded-2xl p-16">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-2xl font-black text-white mb-3">Booking Request Received</h3>
          <p className="text-zinc-400">We&apos;ll get back to you within 48 hours.</p>
          <button onClick={() => setStatus("idle")} className="mt-6 text-sm text-[#00C2FF] hover:underline">Send another request</button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-28 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div>
            <p className="text-xs font-black tracking-[0.3em] uppercase text-[#00C2FF] mb-4">Bookings</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6 leading-tight">
              Book<br />David Coins
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Available for clubs, private events, festivals, and corporate functions. Fill in the form and expect a response within 48 hours.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: "🎧", label: "Club & Venue Nights" },
                { icon: "🎪", label: "Festivals & Outdoor Events" },
                { icon: "🤝", label: "Corporate Functions" },
                { icon: "🎉", label: "Private Parties & Events" },
              ].map(i => (
                <div key={i.label} className="flex items-center gap-3 text-zinc-400 text-sm">
                  <span className="text-xl">{i.icon}</span>{i.label}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Name *</label>
                <input type="text" name="name" required placeholder="Your name" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email *</label>
                <input type="email" name="email" required placeholder="your@email.com" className={inputClass} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Phone</label>
              <input type="tel" name="phone" placeholder="+27 82 000 0000" className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Event Type *</label>
              <select name="event_type" required defaultValue="" className={inputClass}>
                <option value="" disabled>Select event type...</option>
                <option value="club">Club Night</option>
                <option value="festival">Festival</option>
                <option value="corporate">Corporate Event</option>
                <option value="private">Private Party</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Event Date</label>
                <input type="date" name="event_date" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Location</label>
                <input type="text" name="location" placeholder="City, Venue" className={inputClass} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Message</label>
              <textarea name="message" rows={4} placeholder="Tell us about your event..." className={`${inputClass} resize-none`} />
            </div>
            {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
            <button type="submit" disabled={status === "loading"} className="w-full py-4 rounded-xl bg-[#00C2FF] hover:bg-[#00aee6] disabled:opacity-50 text-black font-black text-sm tracking-widest uppercase transition-colors">
              {status === "loading" ? "Sending..." : "Submit Booking Request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
