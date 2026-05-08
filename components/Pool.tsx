"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useInView } from "@/hooks/useInView";

type PoolOption = {
  id: string;
  label: string;
  votes: number;
  is_result: boolean;
  pool_name: string;
  created_at: string;
};

export default function Pool() {
  const [options, setOptions] = useState<PoolOption[]>([]);
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    const stored = localStorage.getItem("dc_pool_voted");
    if (stored) setVoted(new Set(JSON.parse(stored)));

    supabase
      .from("pool_options")
      .select("*")
      .order("votes", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error("Pool fetch error:", error);
        if (data) setOptions(data);
        setLoading(false);
      });

    const channel = supabase
      .channel("pool_options")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "pool_options" },
        () => {
          supabase
            .from("pool_options")
            .select("*")
            .order("votes", { ascending: false })
            .then(({ data }) => {
              if (data) setOptions(data);
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleVote(id: string) {
    if (voted.has(id)) return;
    await supabase.rpc("increment_pool_votes", { row_id: id });
    const next = new Set(voted).add(id);
    setVoted(next);
    localStorage.setItem("dc_pool_voted", JSON.stringify([...next]));
  }

  if (loading || options.length === 0) return null;

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);
  const poolName = options[0]?.pool_name ?? "Current Pool";
  const hasResults = options.some((o) => o.is_result);
  const results = options.filter((o) => o.is_result);

  function odds(votes: number) {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  }

  return (
    <section id="pool" className="py-28 px-8 sm:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-[#00C2FF]" />
              {hasResults ? "Pool Closed" : "Live Pool"}
            </p>
            <h2 className="text-5xl sm:text-6xl font-black text-white leading-none">
              {poolName}
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs">
            {hasResults
              ? "Results are in. See how the odds played out."
              : `${totalVotes} vote${totalVotes !== 1 ? "s" : ""} cast — cast yours and watch the odds shift.`}
          </p>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Results banner */}
          {hasResults && (
            <div className="mb-10 p-6 border border-[#00C2FF]/20 bg-[#00C2FF]/5">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-3">
                Results
              </p>
              <div className="flex flex-wrap gap-4">
                {results.map((r) => (
                  <div key={r.id} className="flex items-center gap-3">
                    <span className="text-[#00C2FF] text-lg">✓</span>
                    <span className="text-white font-black">{r.label}</span>
                    <span className="text-zinc-500 text-xs">
                      {odds(r.votes)}% odds
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Odds list */}
          <div className="flex flex-col divide-y divide-white/5">
            {options.map((o, i) => {
              const pct = odds(o.votes);
              const isWinner = o.is_result;
              const hasVoted = voted.has(o.id);

              return (
                <div
                  key={o.id}
                  className={`flex items-center gap-6 sm:gap-10 py-6 ${isWinner ? "opacity-100" : hasResults ? "opacity-40" : "opacity-100"}`}
                >
                  {/* Rank */}
                  <span className="text-xs font-black text-zinc-700 w-6 flex-shrink-0 tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Label + bar */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-white text-sm font-black truncate">{o.label}</p>
                      {isWinner && (
                        <span className="text-[10px] font-black tracking-widest uppercase text-black bg-[#00C2FF] px-2 py-0.5 flex-shrink-0">
                          Result
                        </span>
                      )}
                    </div>
                    <div className="h-px w-full bg-white/5 relative">
                      <div
                        className="absolute top-0 left-0 h-px bg-[#00C2FF] transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Odds */}
                  <div className="text-right flex-shrink-0 w-16">
                    <p className="text-white font-black text-lg leading-none">{pct}%</p>
                    <p className="text-zinc-600 text-[10px] tracking-widest uppercase mt-0.5">
                      {o.votes} vote{o.votes !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Vote button — hidden when pool is closed */}
                  {!hasResults && (
                    <button
                      onClick={() => handleVote(o.id)}
                      disabled={hasVoted}
                      className={`flex items-center gap-2 text-xs font-black tracking-widest transition-colors flex-shrink-0 ${
                        hasVoted
                          ? "text-[#00C2FF] cursor-default"
                          : "text-zinc-600 hover:text-[#00C2FF]"
                      }`}
                    >
                      <span>{hasVoted ? "▲" : "△"}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
