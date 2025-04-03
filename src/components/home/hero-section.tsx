import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkle } from 'lucide-react';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="bg-background text-foreground py-16 sm:py-20 lg:pb-24">
      <div className="relative mx-auto flex flex-col justify-center items-center max-w-7xl px-4 sm:px-6 lg:px-12 z-0">
        {/* Badge */}
        <div className="flex">
          <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
            <Badge
              className="relative px-6 py-2 text-base font-medium text-white group-hover:bg-gray-50 transition-colors duration-300"
              variant={'secondary'}
            >
              <Sparkle className="h-8 w-8 mr-2 text-rose-600 animate-pulse" />
              <p className="text-base text-rose-600">Powered by AI</p>
            </Badge>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mt-8">
          Transform PDFs into{' '}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">concise </span>
            <span
              className="absolute inset-0 rounded-lg bg-rose-200/50 -rotate-2 transform -skew-y-1 "
              area-hidden="true"
            ></span>
          </span>
          Vinama{' '}
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl text-center mt-4 text-gray-600">
          Get a beautiful summary reel of the document in seconds.
        </h2>

        {/* Call to Action Button */}
        <div className="mt-8 sm:mt-12">
          <Button
            variant={'link'}
            className="text-base text-white mt-6 sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"
          >
            <Link href={'/#pricing'} className="flex gap-2 items-center">
              <span>Try Vinama</span>
              <ArrowRight className="animate-pluse" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
