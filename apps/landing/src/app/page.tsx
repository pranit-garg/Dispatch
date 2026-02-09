import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhyDispatch } from "@/components/WhyDispatch";
import { Architecture } from "@/components/Architecture";
import { CodePreview } from "@/components/CodePreview";
import { Chains } from "@/components/Chains";
import { Seeker } from "@/components/Seeker";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyDispatch />
      <Architecture />
      <CodePreview />
      <Chains />
      <Seeker />
      <CTA />
      <Footer />
    </main>
  );
}
