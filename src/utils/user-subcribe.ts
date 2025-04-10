import { onAuthenticateUser } from '@/actions/user-auth';
import { prisma } from '@/lib/prisma';

export const isUserSubscribePlan = async () => {
  try {
    const user = await onAuthenticateUser();
    if (user.status != 200) {
      throw new Error(user.message);
    }

    const isSubscirbedThePlane = await prisma.user.findFirst({
      where: {
        userId: user.data?.userId as string,
      },
    });

    if (isSubscirbedThePlane?.status) {
      return {
        success: true,
        message: 'user purched a plan.',
      };
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
