'use client';
import { FormEvent } from 'react';
import { UploadFileInput } from './upload-file-input';
import { z } from 'zod';
import { useUploadThing } from '@/utils/uploadthing';

import { toast } from 'sonner';
import { generatePDFSummary } from '@/actions/upload-action';

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
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    }

    console.log('hello ', validation);

    const response = await startUpload([file]);

    const langchainResponse = await generatePDFSummary(response);
    console.log(langchainResponse);
    console.log('data', langchainResponse?.data);

    if (!response) {
      toast.error('Something went wrong, Plese try again');
      return;
    }
  };
  return (
    <section>
      <div>
        <UploadFileInput onSubmit={handleSubmit} />
      </div>
    </section>
  );
};
