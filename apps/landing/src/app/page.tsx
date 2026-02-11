import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyDispatch } from "@/components/WhyDispatch";
import { LiveDemo } from "@/components/LiveDemo";
import { Seeker } from "@/components/Seeker";
import { DualChain } from "@/components/DualChain";
import { Tokenomics } from "@/components/Tokenomics";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyDispatch />
      <LiveDemo />
      <Seeker />
      <DualChain />
      <Tokenomics />
      <CTA />
      <Footer />
    </main>
  );
}
