'use server';

import { prisma } from '@/lib/prisma';
import { onAuthenticateUser } from './user-auth';

export interface SavePDFSummaryType {
  userId: string;
  originalFileUrl: string;
  summaryText: string;
  title: string;
  fileName: string;
}
export const savePDFSummary = async ({
  userId,
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
        userId,
        originalFileUrl,
        summaryText,
        title,
        fileName,
      },
    });

    console.log({
      savePDFSummary,
    });

    if (!savePDFSummary) {
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
