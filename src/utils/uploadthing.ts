// import {
//   generateUploadButton,
//   generateUploadDropzone,
// } from '@uploadthing/react';

import type { OurFileRouter } from '../app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react/native';
import { UTApi } from 'uploadthing/server';

// export const UploadButton = generateUploadButton<OurFileRouter>();
// export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
  logLevel: 'All',
});
