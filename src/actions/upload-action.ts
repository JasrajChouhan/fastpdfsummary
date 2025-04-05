'use server';

import { formatFileNameAsFileTitle } from '@/utils/format-title';
import { fetchAndExtractText } from '@/utils/langchain';
import { generatePDFSummaryFromOpenAI } from '@/utils/openai';

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

    const openaiSummary = await generatePDFSummaryFromOpenAI(summary);

    console.log({
      openaiSummary,
    });
    if (!openaiSummary) {
      throw new Error('OpenAI summary is empty');
    }

    const formatedFileName = formatFileNameAsFileTitle(name);

    return {
      success: true,
      message: 'File upload is successful',
      data: {
        userId,
        fileName: name,
        fileUrl: url,
        summary: openaiSummary,
        title: formatedFileName,
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
