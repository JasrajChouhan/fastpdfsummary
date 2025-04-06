/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { FormEvent } from 'react';
import { UploadFileInput } from './upload-file-input';
import { z } from 'zod';
import { useUploadThing } from '@/utils/uploadthing';

import { toast } from 'sonner';
import { generatePDFSummary } from '@/actions/upload-action';
import { Loader2 } from 'lucide-react';
import { savePDFSummary } from '@/actions/summary-action';

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
      toast.success('🎉 File uploaded successfully!');
    },
    onUploadError: () => {
      toast.error('🚫 Error occurred during upload. Please try again.');
    },
    onUploadBegin: ({}) => {
      console.log('upload has begun for');
      toast.info(`📤 File Upload start`);
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);
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
      toast.error(
        `⚠️ ${validation.error.format().file?._errors?.[0] || 'Invalid file'}`,
      );
      setLoading(false);
      return;
    }

    console.log('hello ', validation);
    toast.info('📡 Uploading your file, please wait...');

    try {
      const response = await startUpload([file]);
      console.log(response);

      if (!response) {
        toast.error('❌ Upload failed. Please try again.');
        return;
      }

      toast.loading(
        '🧠 Generating summary from your PDF... This might take a few seconds.',
        {
          duration: 4000,
        },
      );

      const {
        data = null,
        message = null,
        success,
      } = await generatePDFSummary(response);

      console.log({ data });

      if (!success) {
        toast.error('🛑 Failed to generate summary. Please try again.');
        return;
      }

      await savePDFSummary({
        userId: data?.userId as string,
        originalFileUrl: data?.fileUrl as string,
        fileName: file.name as string,
        title: data?.title as string,
        summaryText: data?.summary as string,
      });

      toast.success('✅ Summary generated successfully!');
      console.log('Summary:', data?.summary);
    } catch (error) {
      toast.error('🚨 Something went wrong. Try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div>
        {loading ? (
          <div className="mx-auto max-w-2xl flex flex-col justify-center items-center">
            <Loader2 className="h10 w-10 animate-spin" />
            <p className="text-sm text-muted-foreground"> Please wait </p>
          </div>
        ) : (
          <UploadFileInput onSubmit={handleSubmit} />
        )}
      </div>
    </section>
  );
};
