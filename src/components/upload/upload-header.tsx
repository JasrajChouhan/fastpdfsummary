import { Badge } from '@/components/ui/badge';
import { Sparkle } from 'lucide-react';

export const UploadHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
        <Badge
          className="relative px-6 py-2 text-base font-medium text-white group-hover:bg-gray-50 transition-colors duration-300"
          variant={'secondary'}
        >
          <Sparkle className="h-8 w-8 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base text-rose-600">Content Creation By AI</p>
        </Badge>
      </div>

      <h1 className="uppercase tracking-tight  text-gray-900 text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mt-8">
        Start uploading{' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">your PDF&apos;s </span>
          <span
            className="absolute inset-0 rounded-lg bg-rose-200/50 -rotate-2 transform -skew-y-1 "
            area-hidden="true"
          ></span>
        </span>
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center mt-4 text-gray-600">
        Get a beautiful summary reel of the document in seconds.
      </h2>
    </div>
  );
};
