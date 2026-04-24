import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mixes from "@/components/Mixes";
import About from "@/components/About";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Merch from "@/components/Merch";
import dynamic from "next/dynamic";
const SetRequests = dynamic(() => import("@/components/SetRequests"), { ssr: false });
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Mixes />
        <About />
        <Events />
        <Gallery />
        <Merch />
        <SetRequests />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
