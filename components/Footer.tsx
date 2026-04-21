const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "SoundCloud", href: "#" },
  { label: "Podomatic", href: "https://www.podomatic.com/search?q=SIX%20DOUBLE%20TWO%20SESSIONS" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-8 sm:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-[#00C2FF]/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]" />
            </div>
            <span className="font-black text-sm tracking-[0.2em] text-white uppercase">David Coins</span>
          </div>

          <div className="flex flex-wrap gap-8">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-zinc-600 hover:text-[#00C2FF] transition-colors uppercase tracking-[0.2em] font-black">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#00C2FF]/20 via-white/5 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-zinc-700 text-[10px] tracking-widest uppercase">
            © {new Date().getFullYear()} David Coins · All rights reserved
          </p>
          <p className="text-zinc-700 text-[10px] tracking-widest uppercase">
            Deep House · South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
