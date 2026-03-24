import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedDesigns } from "@/components/home/FeaturedDesigns";
import { ServiceTypes } from "@/components/home/ServiceTypes";
import { CustomCTA } from "@/components/home/CustomCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedDesigns />
        <ServiceTypes />
        <CustomCTA />
      </main>
      <Footer />
    </>
  );
}
