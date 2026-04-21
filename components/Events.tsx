"use client";
import { useInView } from "@/hooks/useInView";

const events = [
  { date: "TBA", month: "2025", name: "Six Double Two Sessions — Live", venue: "TBA", city: "South Africa", tickets: null },
];

export default function Events() {
  const { ref, inView } = useInView();

  return (
    <section id="events" className="py-28 px-8 sm:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00C2FF]" />
              Upcoming
            </p>
            <h2 className="text-5xl sm:text-6xl font-black text-white leading-none">Events</h2>
          </div>
          <a href="#booking" className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500 hover:text-[#00C2FF] transition-colors border-b border-zinc-700 hover:border-[#00C2FF] pb-1 self-start sm:self-auto">
            Book for Your Event →
          </a>
        </div>

        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col divide-y divide-white/5">
            {events.map((e, i) => (
              <div key={i} className="group grid grid-cols-[80px_1fr_auto] sm:grid-cols-[120px_1fr_auto] items-center gap-4 sm:gap-8 py-8">
                {/* Date block */}
                <div className="text-left">
                  <p className="text-3xl font-black text-white leading-none">{e.date}</p>
                  <p className="text-[10px] font-black text-[#00C2FF] uppercase tracking-widest mt-1">{e.month}</p>
                </div>

                {/* Info */}
                <div>
                  <p className="text-white font-black text-lg sm:text-xl mb-1">{e.name}</p>
                  <p className="text-zinc-500 text-xs tracking-widest uppercase">{e.venue} · {e.city}</p>
                </div>

                {/* Action */}
                {e.tickets ? (
                  <a href={e.tickets} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] font-black tracking-[0.2em] uppercase text-black bg-[#00C2FF] hover:bg-white px-5 py-2.5 transition-colors flex-shrink-0">
                    Tickets
                  </a>
                ) : (
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-700 border border-zinc-800 px-5 py-2.5 flex-shrink-0">TBA</span>
                )}
              </div>
            ))}
          </div>

          <p className="text-zinc-700 text-xs tracking-widest uppercase mt-8">
            More dates being announced — follow for updates
          </p>
        </div>
      </div>
    </section>
  );
}
