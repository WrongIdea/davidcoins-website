"use client";
import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center px-8">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-6 rounded-full border border-[#00C2FF]/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]" />
            </div>
            <span className="font-black text-sm tracking-[0.2em] text-white uppercase">David Coins</span>
          </div>
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#00C2FF] mb-2">Admin</p>
          <h1 className="text-4xl font-black text-white">Sign In</h1>
        </div>

        <form action={action} className="flex flex-col gap-6">
          <div>
            <label className="text-[10px] font-black tracking-widest uppercase text-zinc-600 block mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              placeholder="Enter password"
              className="w-full bg-transparent border-b border-zinc-700 focus:border-[#00C2FF] px-0 py-3 text-white placeholder-zinc-700 text-sm outline-none transition-colors"
            />
          </div>
          {state?.error && <p className="text-red-400 text-xs">{state.error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="px-10 py-4 bg-[#00C2FF] hover:bg-white text-black font-black text-xs tracking-[0.3em] uppercase transition-colors disabled:opacity-50"
          >
            {pending ? "Signing in..." : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}
