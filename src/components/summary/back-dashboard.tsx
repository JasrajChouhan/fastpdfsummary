import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BackToDashboard = () => {
  return (
    <div classname={'back_to_dashboard mb-2'}>
      <Link href="/dashboard">
        <Button
          size="lg"
          className="group flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg hover:from-rose-600 hover:to-rose-700 transition-colors duration-300 rounded-full px-6 py-4"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-base font-semibold tracking-wide">
            Back to Dashboard
          </span>
        </Button>
      </Link>
    </div>
  );
};
