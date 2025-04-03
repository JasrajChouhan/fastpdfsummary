// import BGGradient from '@/components/commons/BGGradient';
import { HowItWorks } from '@/components/commons/how-it-works';
import { CTASection } from '@/components/home/cta-section';
import { DemoSection } from '@/components/home/demo-section';

import { HeroSection } from '@/components/home/hero-section';
import { PricingSection } from '@/components/home/pricing-section';

export default function Home() {
  return (
    <main className="w-full relative">
      {/* <BGGradient /> */}
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorks />
        <PricingSection />
        <CTASection />
      </div>
    </main>
  );
}
