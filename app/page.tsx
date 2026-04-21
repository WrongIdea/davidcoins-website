import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mixes from "@/components/Mixes";
import About from "@/components/About";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Merch from "@/components/Merch";
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
        <Booking />
      </main>
      <Footer />
    </>
  );
}
