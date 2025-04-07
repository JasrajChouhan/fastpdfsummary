'use server';

import { prisma } from '@/lib/prisma';
import { onAuthenticateUser } from './user-auth';

export interface SavePDFSummaryType {
  userId?: string;
  originalFileUrl: string;
  summaryText: string;
  title: string;
  fileName: string;
}
export const savePDFSummary = async ({
  originalFileUrl,
  summaryText,
  title,
  fileName,
}: SavePDFSummaryType) => {
  try {
    const user = await onAuthenticateUser();
    if (user.status !== 200) {
      throw new Error(user.message);
    }

    console.log({ user });

    // save pdf summary
    const savedSummary = await prisma.pdfSummaries.create({
      data: {
        userId: user.data?.userId as string,
        originalFileUrl,
        summaryText,
        title,
        fileName,
      },
    });

    console.log({
      savedSummary,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: 'PDF Summary not saved in DB.',
      };
    }

    console.log('✅ PDF summary saved to database:', savedSummary.id);

    return {
      success: true,
      message: 'PDF Summary is save into DB',
    };
  } catch (error) {
    console.error('❌ Failed to save PDF summary:', error);
    return {
      success: false,
      message: 'Failed to save PDF summary.',
      error,
    };
  }
};

export const getPDFSummaries = async () => {
  try {
    const { status, data, message } = await onAuthenticateUser();

    if (status !== 200) {
      throw new Error(message);
    }

    const summaries = await prisma.pdfSummaries.findMany({
      where: {
        userId: data?.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!summaries || summaries.length === 0) {
      return {
        success: false,
        message: 'No summaries found.',
        summaries: [],
      };
    }

    return {
      success: true,
      message: 'Successfully fetched all summaries.',
      summaries,
    };
  } catch (error) {
    console.error('❌ Error fetching summaries:', error);
    return {
      success: false,
      message: 'Failed to get summaries.',
      error: (error as Error).message,
    };
  }
};
