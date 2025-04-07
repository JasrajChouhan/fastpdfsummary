import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Delete, File } from 'lucide-react';
import { Button } from '../ui/button';
import clsx from 'clsx';
import { Trash2 } from 'lucide-react';

interface Props {
  id: string;
  status: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  originalFileUrl: string;
  summaryText: string;
  title: string;
  fileName: string;
}

export const SummaryCard = ({ ...summary }: Props) => {
  const isCompleted = summary.status === true;

  return (
    <Card
      className={clsx(
        'w-[300px] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg rounded-2xl  bg-white cursor-pointer',
        {
          'border border-green-200 bg-green-50': isCompleted,
          'border border-rose-100 bg-rose-50': !isCompleted,
        },
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between  gap-4">
          <div className="flex gap-3 items-center">
            <div className="bg-white border rounded-xl p-2 shadow-sm">
              <File className="h-8 w-8 text-rose-500" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {summary.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(summary.createdAt))}
              </CardDescription>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="bg-gray-500"
            aria-label="Delete Summary"
          >
            <Trash2 className="h-6 w-6 text-red-500 text-white" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
          {summary.summaryText}
        </p>
      </CardContent>

      <CardFooter>
        <span
          className={clsx(
            'text-sm font-medium transition-all',
            isCompleted
              ? 'text-green-600 hover:text-green-700'
              : 'text-red-600 hover:text-red-700 animate-pulse',
          )}
        >
          {isCompleted ? 'Completed' : 'Uncompleted'}
        </span>
      </CardFooter>
    </Card>
  );
};
