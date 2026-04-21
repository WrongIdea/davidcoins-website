const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "SoundCloud", href: "#" },
  { label: "Podomatic", href: "https://www.podomatic.com/search?q=SIX%20DOUBLE%20TWO%20SESSIONS" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        <span className="font-black text-2xl tracking-widest text-white uppercase">
          David<span className="text-[#00C2FF]">Coins</span>
        </span>
        <p className="text-xs font-black tracking-[0.3em] uppercase text-zinc-600">Deep House DJ · South Africa</p>
        <div className="flex flex-wrap justify-center gap-6">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-[#00C2FF] transition-colors uppercase tracking-widest font-bold">
              {s.label}
            </a>
          ))}
        </div>
        <p className="text-zinc-700 text-xs">© {new Date().getFullYear()} David Coins. All rights reserved.</p>
      </div>
    </footer>
  );
}
