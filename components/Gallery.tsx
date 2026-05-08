"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { supabase } from "@/lib/supabase";

type Photo = { id: string; url: string; alt: string; span: string };

const fallback: Photo[] = [
  { id: "1", url: "/gallery/davidcoins1.jpeg", alt: "David Coins", span: "col-span-2 row-span-2" },
  { id: "2", url: "/gallery/davidcoins2.jpeg", alt: "David Coins", span: "" },
  { id: "3", url: "/gallery/davidcoins3.jpeg", alt: "David Coins", span: "" },
  { id: "4", url: "/gallery/davidcoins4.jpeg", alt: "David Coins", span: "" },
  { id: "5", url: "/gallery/davidcoins5.jpeg", alt: "David Coins", span: "" },
  { id: "6", url: "/gallery/davidcoins6.jpg", alt: "David Coins", span: "" },
  { id: "7", url: "/gallery/davidcoins7.jpg", alt: "David Coins", span: "" },
  { id: "8", url: "/gallery/davidcoins8.jpg", alt: "David Coins", span: "" },
  { id: "9", url: "/gallery/davidcoins9.jpg", alt: "David Coins", span: "" },
  { id: "10", url: "/gallery/davidcouins10.jpg", alt: "David Coins", span: "" },
];

export default function Gallery() {
  const { ref, inView } = useInView();
  const [photos, setPhotos] = useState<Photo[]>(fallback);

  useEffect(() => {
    supabase
      .from("gallery")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data }) => { if (data && data.length > 0) setPhotos(data); });
  }, []);

  return (
    <section id="gallery" className="py-28 px-8 sm:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00C2FF]" />
            Visual
          </p>
          <h2 className="text-5xl sm:text-6xl font-black text-white leading-none">Gallery</h2>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-2 sm:grid-cols-3 auto-rows-[240px] gap-2 transition-all duration-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {photos.map((p) => (
            <div key={p.id} className={`relative overflow-hidden group ${p.span}`}>
              <Image
                src={p.url}
                alt={p.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              {/* Cyan hover overlay */}
              <div className="absolute inset-0 bg-[#00C2FF]/0 group-hover:bg-[#00C2FF]/10 transition-colors duration-500" />
              <div className="absolute inset-0 border border-transparent group-hover:border-[#00C2FF]/30 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
