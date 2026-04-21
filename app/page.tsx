import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Destinations from "./components/destinations";
import Categories from "./components/categories";
import Stats from "./components/stats";
import HowItWorks from "./components/how-it-works";
import Testimonials from "./components/testimonials";
import CTA from "./components/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Destinations />
        <Categories />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
