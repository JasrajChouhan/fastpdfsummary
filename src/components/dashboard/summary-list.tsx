import { getPDFSummaries } from '@/actions/summary-action';
import { SummaryCard } from './summary-card';

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
    <section className={'flex justify-between items-center'}>
      <div className="mx-auto mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {summaryList.summaries.map((summary) => (
          <SummaryCard key={summary.id} {...summary} />
        ))}
      </div>
    </section>
  );
};
