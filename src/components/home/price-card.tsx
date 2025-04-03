import { CheckCircle, XCircle } from 'lucide-react';
import { Plan } from './pricing-section';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const PriceCard = ({ plan }: { plan: Plan }) => {
  return (
    <div
      className={cn(
        'p-8 rounded-2xl shadow-lg bg-white hover:scale-105 transition-all border',
        plan.id === 'pro' ? 'border-2 border-rose-900' : 'border-gray-200',
      )}
    >
      <h3 className="text-2xl font-semibold text-rose-600">{plan.name}</h3>
      <p className="text-gray-500 mt-2">
        {plan.name === 'Basic'
          ? 'For occasional users'
          : 'For professionals & teams'}
      </p>
      <div className="text-3xl font-bold mt-4">
        ${plan.price}
        <span className="text-lg text-gray-500">/mo</span>
      </div>
      <ul className="mt-6 space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="text-green-500 w-5 h-5" /> {feature}
          </li>
        ))}
        {plan.unavailable.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-gray-400 line-through"
          >
            <XCircle className="text-gray-400 w-5 h-5" /> {feature}
          </li>
        ))}
      </ul>
      <Link
        href={plan.paymentLink}
        className={cn(
          'mt-6 block w-full text-center font-semibold py-3 rounded-2xl transition-all',
          plan.id === 'pro'
            ? 'bg-gradient-to-r from-rose-700 via-rose-800 to-rose-900 hover:from-rose-800 hover:via-rose-900 hover:to-black text-white'
            : 'bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 hover:from-rose-600 hover:via-rose-700 hover:to-rose-800 text-white',
        )}
      >
        Buy Now
      </Link>
    </div>
  );
};
