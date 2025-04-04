'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface UploadFileInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const UploadFileInput = ({ onSubmit }: UploadFileInputProps) => {
  return (
    <div className="flex flex-col gap-6 mt-10">
      <form onSubmit={onSubmit} className="flex gap-2 w-full max-w-2xl">
        <Input
          type={'file'}
          name={'file'}
          id={'file'}
          required
          placeholder="Select your File"
          className=""
          accept="application/pdf"
        />

        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
};
