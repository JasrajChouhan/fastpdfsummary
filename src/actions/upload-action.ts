'use server';

import { fetchAndExtractText } from '@/utils/langchain';

export const generatePDFSummary = async (
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    },
  ],
) => {
  console.log('uploadResponse', uploadResponse);
  if (!uploadResponse) {
    return {
      success: false,
      message: 'File upload is failed',
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url, name },
    },
  } = uploadResponse[0];

  if (!url || !name) {
    return {
      success: false,
      message: 'File upload is failed',
      data: null,
    };
  }

  try {
    const summary = await fetchAndExtractText(url);
    console.log('summary', summary);
    return {
      success: true,
      message: 'File upload is successful',
      data: {
        userId,
        fileName: name,
        fileUrl: url,
        summary,
      },
    };
  } catch (error) {
    console.error('Error fetching or extracting text:', error);
    return {
      success: false,
      message: 'File upload is failed',
      data: null,
    };
  }
};
