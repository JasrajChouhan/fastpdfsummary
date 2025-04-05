'use client';
import React, { FormEvent } from 'react';
import { UploadFileInput } from './upload-file-input';
import { z } from 'zod';
import { useUploadThing } from '@/utils/uploadthing';

import { toast } from 'sonner';
import { generatePDFSummary } from '@/actions/upload-action';
import { Loader2 } from 'lucide-react';

const FileFormSchema = z.object({
  file: z
    .instanceof(File, {
      message: 'File is required',
    })
    .refine((file) => {
      return file.size < 10 * 1024 * 1024, 'File size must be less than 10MB';
    })
    .refine((file) => {
      return file.type === 'application/pdf', 'File must be a PDF';
    }),
});

export const UploadForm = () => {
  const { startUpload } = useUploadThing('PDFUploader', {
    onClientUploadComplete: () => {
      toast.success('File uploaded successfully');
    },
    onUploadError: () => {
      toast.error('error occurred while uploading');
    },
    onUploadBegin: ({ file }) => {
      console.log('upload has begun for', file);
      toast.info('upload has begun');
    },
  });

  const [loading, setLoading] = React.useState<boolean>(true);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    if (!form) {
      throw new Error('Form data is not available');
    }
    // Parse the form

    const file = form.get('file') as File;

    const validation = FileFormSchema.safeParse({ file });

    if (!validation.success) {
      console.log(validation.error.format()._errors[0] ?? 'Invalid file');
      toast.error(validation.error.format()._errors[0] ?? 'Invalid file');

      setLoading(false);
      return;
    }

    console.log('hello ', validation);

    try {
      const response = await startUpload([file]);

      if (!response) {
        toast.error('Upload failed. Please try again.');
        return;
      }

      const langchainResponse = await generatePDFSummary(response);

      if (!langchainResponse?.success) {
        toast.error('Summary generation failed. Please try again.');
        return;
      }

      toast.success('Summary generated successfully!');
      console.log('Summary:', langchainResponse?.data?.summary);
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div>
        <UploadFileInput onSubmit={handleSubmit} />
        {loading && (
          <div className="mx-auto max-w-2xl flex flex-col justify-center items-center">
            <Loader2 className="h10 w-10 animate-spin" />
            <p className="text-sm text-muted-foreground"> Please wait </p>
          </div>
        )}
      </div>
    </section>
  );
};
