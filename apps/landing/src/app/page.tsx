import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { FounderVideo } from "@/components/FounderVideo";
import { WhyDispatch } from "@/components/WhyDispatch";
import { HowItWorks } from "@/components/HowItWorks";
import { Tokenomics } from "@/components/Tokenomics";
import { Seeker } from "@/components/Seeker";
import { LiveDemo } from "@/components/LiveDemo";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustStrip />
      <FounderVideo />
      <WhyDispatch />
      <HowItWorks />
      <Tokenomics />
      <Seeker />
      <LiveDemo />
      <CTA />
      <Footer />
    </main>
  );
}
