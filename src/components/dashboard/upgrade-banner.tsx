import Link from 'next/link';

interface UpgradeBannerProps {
  remainingDocs: number;
}

export const UpgradeBanner = ({ remainingDocs }: UpgradeBannerProps) => {
  return (
    <div className="w-full mt-6 rounded-xl border border-rose-400 bg-rose-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base">
      <p className="text-rose-800 font-medium mb-2 sm:mb-0">
        You have <strong>{remainingDocs}</strong> document
        {remainingDocs > 1 ? 's' : ''} remaining.
      </p>
      <Link
        href="/#pricing"
        className="text-rose-600 underline hover:text-rose-700 font-medium transition"
      >
        Upgrade your plan
      </Link>
    </div>
  );
};
