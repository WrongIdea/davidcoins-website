"use client";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const photos = [
  { src: "/gallery/davidcoins1.jpeg", alt: "David Coins" },
  { src: "/gallery/davidcoins3.jpeg", alt: "David Coins" },
  { src: "/gallery/davidcoins4.jpeg", alt: "David Coins" },
  { src: "/gallery/davidcoins5.jpeg", alt: "David Coins" },
  { src: "/gallery/davidcoins2.jpeg", alt: "David Coins" },
];

export default function Gallery() {
  const { ref, inView } = useInView();

  return (
    <section id="gallery" className="py-28 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-xs font-black tracking-[0.3em] uppercase text-[#00C2FF] mb-4">Visual</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">Gallery</h2>
        </div>

        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Large first image */}
            <div className="col-span-2 relative aspect-video rounded-2xl overflow-hidden">
              <Image src={photos[0].src} alt={photos[0].alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 66vw" />
            </div>
            {/* Right single */}
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image src={photos[1].src} alt={photos[1].alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="33vw" />
            </div>
            {/* Bottom three */}
            {photos.slice(2).map((p) => (
              <div key={p.src} className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src={p.src} alt={p.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
