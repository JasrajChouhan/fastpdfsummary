// import BGGradient from '@/components/commons/BGGradient';
import { HowItWorks } from '@/components/commons/how-it-works';
import { DemoSection } from '@/components/home/demo-section';

import { HeroSection } from '@/components/home/hero-section';

export default function Home() {
  return (
    <main className="w-full relative">
      {/* <BGGradient /> */}
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorks />
      </div>
    </main>
  );
}
