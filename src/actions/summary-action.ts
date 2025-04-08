'use server';

import { prisma } from '@/lib/prisma';
import { onAuthenticateUser } from './user-auth';
import { utapi } from '@/utils/uploadthing';
import { revalidatePath } from 'next/cache';

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

export const deletePDFSummary = async (id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        message: 'Id must be for delete a PDF',
      };
    }

    const { status, data, message } = await onAuthenticateUser();

    if (status != 200) {
      throw new Error(message);
    }

    const resp = await prisma.pdfSummaries.delete({
      where: {
        id,
      },
    });

    if (!resp) {
      return {
        success: false,
        message: 'delete pdf operation failed on db lavel',
      };
    }

    const uploadthingDeleteResp = await utapi.deleteFiles(resp.fileName);

    if (!uploadthingDeleteResp.success) {
      return {
        success: false,
        message: 'delete pdf operation failed on db lavel',
      };
    }

    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'PDF delete successfully',
      deleteCount: uploadthingDeleteResp.deletedCount,
    };
  } catch (error) {
    console.log('PDF delete failed');
    return {
      success: false,
      message: 'Internal server error',
      error,
    };
  }
};
