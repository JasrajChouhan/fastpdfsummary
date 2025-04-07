import { getPDFSummaries } from '@/actions/summary-action';
import { SummaryCardClientWrapper } from './summary-card-wrapper';
import { SummaryCard } from './summary-card.tsx';
import Link from 'next/link';

export const SummaryList = async () => {
  const summaryList = await getPDFSummaries();

  if (!summaryList.success || !summaryList.summaries) {
    return (
      <section className="mt-10 text-center text-gray-500">
        <p>No summaries found or failed to load.</p>
      </section>
    );
  }

  return (
    <section>
      <div className="mt-10 grid gap-4">
        {summaryList.summaries.map((summary) => (
          <Link key={summary.id} href={`/summary/${summary.id}`}>
            <SummaryCard {...summary} />
          </Link>
        ))}
      </div>
    </section>
  );
};
