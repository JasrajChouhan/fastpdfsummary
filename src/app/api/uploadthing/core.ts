import { currentUser } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

export const ourFileRouter = {
  PDFUploader: f({
    pdf: {
      maxFileSize: '16MB',
    },
  })
    .middleware(async ({ req }) => {
      // user Info
      //
      const user = await currentUser();

      if (!user) {
        throw new UploadThingError('Unauthorized');
      }
      return { userId: user.id };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId : ', metadata.userId);
      console.log('File Url : ', file.ufsUrl);

      return {
        uploadedBy: metadata.userId,
        file,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
