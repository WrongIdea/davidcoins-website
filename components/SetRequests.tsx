"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useInView } from "@/hooks/useInView";

type Request = {
  id: string;
  track: string;
  votes: number;
  created_at: string;
};

export default function SetRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const { ref, inView } = useInView();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("dc_voted");
    if (stored) setVoted(new Set(JSON.parse(stored)));

    supabase
      .from("set_requests")
      .select("*")
      .order("votes", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error("Supabase fetch error:", error);
        if (data) setRequests(data);
      });

    const channel = supabase
      .channel("set_requests")
      .on("postgres_changes", { event: "*", schema: "public", table: "set_requests" }, () => {
        supabase
          .from("set_requests")
          .select("*")
          .order("votes", { ascending: false })
          .then(({ data }) => { if (data) setRequests(data); });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const track = input.trim();
    if (!track) return;
    setSubmitting(true);

    const existing = requests.find(r => r.track.toLowerCase() === track.toLowerCase());
    if (existing) {
      await handleVote(existing.id);
    } else {
      await supabase.from("set_requests").insert({ track, votes: 1 });
    }

    setInput("");
    setSubmitting(false);
    inputRef.current?.blur();
  }

  async function handleVote(id: string) {
    if (voted.has(id)) return;
    await supabase.rpc("increment_votes", { row_id: id });
    const next = new Set(voted).add(id);
    setVoted(next);
    localStorage.setItem("dc_voted", JSON.stringify([...next]));
  }

  return (
    <section id="requests" className="py-28 px-8 sm:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00C2FF]" />
              Fan Requests
            </p>
            <h2 className="text-5xl sm:text-6xl font-black text-white leading-none">
              Set<br />Requests
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs">
            Drop a track or genre you want to hear at the next set. Vote up what you love.
          </p>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Submit form */}
          <form onSubmit={handleSubmit} className="flex gap-0 mb-12">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Track name or genre..."
              maxLength={80}
              className="flex-1 bg-transparent border-b border-zinc-700 focus:border-[#00C2FF] px-0 py-3 text-white placeholder-zinc-700 text-sm outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={submitting || !input.trim()}
              className="ml-6 px-8 py-3 bg-[#00C2FF] hover:bg-white text-black font-black text-xs tracking-[0.3em] uppercase transition-colors disabled:opacity-40"
            >
              {submitting ? "..." : "Request →"}
            </button>
          </form>

          {/* Request list */}
          {requests.length === 0 ? (
            <p className="text-zinc-700 text-sm tracking-widest uppercase">Be the first to request a track.</p>
          ) : (
            <div className="flex flex-col divide-y divide-white/5">
              {requests.map((r, i) => (
                <div key={r.id} className="flex items-center gap-6 sm:gap-10 py-5">
                  <span className="text-xs font-black text-zinc-700 w-6 flex-shrink-0 tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="flex-1 text-white text-sm font-medium">{r.track}</p>
                  <button
                    onClick={() => handleVote(r.id)}
                    disabled={voted.has(r.id)}
                    className={`flex items-center gap-2 text-xs font-black tracking-widest transition-colors ${
                      voted.has(r.id)
                        ? "text-[#00C2FF] cursor-default"
                        : "text-zinc-600 hover:text-[#00C2FF]"
                    }`}
                  >
                    <span>{voted.has(r.id) ? "▲" : "△"}</span>
                    <span>{r.votes}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
