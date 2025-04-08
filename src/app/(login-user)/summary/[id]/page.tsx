import { getPDFSummaryById } from '@/actions/summary-action';

interface SummaryParams {
  params: Promise<{ id: string }>;
}

import { DeleteButton } from '@/components/dashboard/delete-button';
import { SummaryStatusWrapper } from '@/components/summary/summary-status-wrapper';
import { Download } from 'lucide-react';
import { redirect } from 'next/navigation';
import { BackToDashboard } from '@/components/summary/back-dashboard';

const SummaryDetails = async ({ params }: SummaryParams) => {
  const { id } = await params;

  if (!id) {
    throw new Error('ID is required to fetch individual summary.');
  }

  const response = await getPDFSummaryById(id);

  if (!response.success || response.error) {
    redirect('/dashboard');
  }

  const summary = response.summary;

  if (!summary) {
    return (
      <section className="w-full py-10 text-center text-muted-foreground">
        <p> Summary not found.</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <BackToDashboard />
      <div
        key={summary.id}
        className="rounded-2xl shadow-md p-6 border border-border bg-background"
      >
        <div
          className={
            'flex flex-col my-3 sm:my-0 sm:flex-row sm:items-center sm:justify-between'
          }
        >
          <div>
            <h2 className="text-2xl font-semibold mb-2">{summary.title}</h2>
            <p className="text-muted-foreground text-sm mb-4">
              File: {summary.fileName} | Uploaded:{' '}
              {new Date(summary.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className={'summary_menu flex gap-6'}>
            <SummaryStatusWrapper
              initialStatus={summary.status}
              summaryId={summary.id}
            />
            <DeleteButton summaryId={summary?.id} />
            <Download className="h-6 w-6 mt-3" />{' '}
            {/** TODO : Download summary in diff format */}
          </div>
        </div>
        <div className="max-h-[250px] overflow-y-auto pr-2  text-base text-foreground whitespace-pre-wrap">
          {summary.summaryText}
        </div>
        <a
          href={summary.originalFileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-blue-600 hover:underline text-sm"
        >
          View Original PDF
        </a>
      </div>
    </section>
  );
};

export default SummaryDetails;
