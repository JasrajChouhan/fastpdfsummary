import { Pizza } from 'lucide-react';

export const DemoSection = () => {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div></div>

        <div className="flex flex-col items-center text-center space-y-4 ">
          {/* Pizza Icon */}
          <div className="pizza_icon  inline-flex justify-center items-center p-2 rounded-2xl border border-gray-500/20 mb-4 bg-gray-100/80 backdrop-blur-xs">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>

          {/* Section Heading */}
          <div className="section_heading text-center mb-16 ">
            <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
              Watch how Sommaire transforms{' '}
              <span className="bg-linear-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
                this Next.js course PDF
              </span>{' '}
              into an easy-to-read summary!
            </h3>
          </div>

          {/* Summary Viewer */}
          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6"></div>
        </div>
      </div>
    </section>
  );
};
