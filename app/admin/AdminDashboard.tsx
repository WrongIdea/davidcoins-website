"use client";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addEvent, deleteEvent, uploadPhoto, deletePhoto, logout } from "./actions";

type Event = { id: string; date: string; month: string; name: string; venue: string; city: string; tickets: string | null };
type Photo = { id: string; url: string; alt: string };

const inputCls = "w-full bg-transparent border-b border-zinc-700 focus:border-[#00C2FF] px-0 py-2 text-white placeholder-zinc-700 text-sm outline-none transition-colors";
const labelCls = "text-[10px] font-black tracking-widest uppercase text-zinc-600 block mb-1";

export default function AdminDashboard({ events, photos }: { events: Event[]; photos: Photo[] }) {
  const [tab, setTab] = useState<"events" | "gallery">("events");
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const eventFormRef = useRef<HTMLFormElement>(null);
  const photoFormRef = useRef<HTMLFormElement>(null);
  const [eventMsg, setEventMsg] = useState("");
  const [uploadMsg, setUploadMsg] = useState("");

  function refresh() { router.refresh(); }

  async function handleAddEvent(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await addEvent(undefined, formData);
    if (result?.error) {
      setEventMsg(`Error: ${result.error}`);
    } else {
      setEventMsg("Event added!");
      eventFormRef.current?.reset();
      refresh();
      setTimeout(() => setEventMsg(""), 3000);
    }
  }

  async function handleUploadPhoto(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploadMsg("Uploading...");
    const formData = new FormData(e.currentTarget);
    const result = await uploadPhoto(undefined, formData);
    if (result?.error) {
      setUploadMsg(`Error: ${result.error}`);
    } else {
      setUploadMsg("Uploaded!");
      photoFormRef.current?.reset();
      refresh();
      setTimeout(() => setUploadMsg(""), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-[#08080f] text-zinc-200">
      {/* Header */}
      <header className="border-b border-white/5 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border border-[#00C2FF]/60 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]" />
          </div>
          <span className="font-black text-sm tracking-[0.2em] text-white uppercase">Admin Panel</span>
        </div>
        <form action={logout}>
          <button type="submit" className="text-[10px] font-black tracking-widest uppercase text-zinc-500 hover:text-white transition-colors">
            Sign Out
          </button>
        </form>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-8 mb-12 border-b border-white/5">
          {(["events", "gallery"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-4 text-[10px] font-black tracking-[0.3em] uppercase transition-colors border-b-2 -mb-px capitalize ${
                tab === t
                  ? "text-[#00C2FF] border-[#00C2FF]"
                  : "text-zinc-600 border-transparent hover:text-zinc-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Events Tab ── */}
        {tab === "events" && (
          <div>
            <h2 className="text-2xl font-black text-white mb-8">Events</h2>

            <div className="flex flex-col divide-y divide-white/5 mb-12">
              {events.length === 0 && (
                <p className="text-zinc-600 text-sm py-4">No events yet — add one below.</p>
              )}
              {events.map((ev) => (
                <div key={ev.id} className="flex items-start justify-between gap-4 py-5">
                  <div>
                    <p className="text-white font-black">{ev.name}</p>
                    <p className="text-zinc-500 text-xs mt-1">
                      {ev.date} {ev.month} · {ev.venue} · {ev.city}
                    </p>
                    {ev.tickets && (
                      <p className="text-[#00C2FF] text-xs mt-0.5 truncate max-w-xs">{ev.tickets}</p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (!confirm("Delete this event?")) return;
                      startTransition(async () => { await deleteEvent(ev.id); refresh(); });
                    }}
                    disabled={pending}
                    className="text-[10px] font-black tracking-widest uppercase text-red-500 hover:text-red-400 transition-colors flex-shrink-0 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Add event form */}
            <div className="border-t border-white/5 pt-10">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-6">Add Event</p>
              <form ref={eventFormRef} onSubmit={handleAddEvent} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Event Name *</label>
                    <input name="name" required placeholder="Six Double Two Sessions" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Venue</label>
                    <input name="venue" placeholder="TBA" className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className={labelCls}>Date</label>
                    <input name="date" placeholder="15 or TBA" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Month / Year</label>
                    <input name="month" placeholder="Jun 2026" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>City</label>
                    <input name="city" placeholder="South Africa" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Tickets URL</label>
                  <input name="tickets" type="url" placeholder="https://..." className={inputCls} />
                </div>
                {eventMsg && (
                  <p className={`text-xs ${eventMsg.startsWith("Error") ? "text-red-400" : "text-green-400"}`}>
                    {eventMsg}
                  </p>
                )}
                <button
                  type="submit"
                  className="self-start px-10 py-4 bg-[#00C2FF] hover:bg-white text-black font-black text-xs tracking-[0.3em] uppercase transition-colors"
                >
                  Add Event →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── Gallery Tab ── */}
        {tab === "gallery" && (
          <div>
            <h2 className="text-2xl font-black text-white mb-8">Gallery</h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-12">
              {photos.length === 0 && (
                <p className="text-zinc-600 text-sm col-span-4 py-4">No photos yet — upload one below.</p>
              )}
              {photos.map((p) => (
                <div key={p.id} className="relative group aspect-square bg-zinc-900">
                  <Image src={p.url} alt={p.alt} fill className="object-cover" sizes="25vw" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <button
                      onClick={() => {
                        if (!confirm("Delete this photo?")) return;
                        startTransition(async () => { await deletePhoto(p.id, p.url); refresh(); });
                      }}
                      disabled={pending}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black tracking-widest uppercase text-red-400 hover:text-red-300 disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload form */}
            <div className="border-t border-white/5 pt-10">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-6">Upload Photo</p>
              <form ref={photoFormRef} onSubmit={handleUploadPhoto} className="flex flex-col gap-6">
                <div>
                  <label className={labelCls}>Photo *</label>
                  <input
                    name="photo"
                    type="file"
                    accept="image/*"
                    required
                    className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#00C2FF] file:text-black file:font-black file:text-[10px] file:tracking-widest file:uppercase file:cursor-pointer"
                  />
                </div>
                {uploadMsg && (
                  <p className={`text-xs ${uploadMsg.startsWith("Error") ? "text-red-400" : "text-green-400"}`}>
                    {uploadMsg}
                  </p>
                )}
                <button
                  type="submit"
                  className="self-start px-10 py-4 bg-[#00C2FF] hover:bg-white text-black font-black text-xs tracking-[0.3em] uppercase transition-colors"
                >
                  Upload →
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
