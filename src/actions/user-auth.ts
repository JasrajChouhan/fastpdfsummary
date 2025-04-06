/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { auth } from '@clerk/nextjs/server';

export const onAuthenticateUser = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        status: 401,
        message: 'Unauthorized',
      };
    }

    return {
      status: 200,
      message: 'User is authenticated',
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: 'Internal Server Error',
    };
  }
};
