import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "David Coins — Deep House DJ",
  description: "Official website of David Coins — Deep House DJ. Mixes, bookings, events and more.",
  openGraph: {
    title: "David Coins — Deep House DJ",
    description: "Official website of David Coins — Deep House DJ.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#08080f] text-zinc-200 antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
