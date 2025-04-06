'use server';

import { prisma } from '@/lib/prisma';

interface ClerkUser {
  email: string;
  fullName: string;
  primeId: string;
}

export async function createUser({ email, fullName, primeId }: ClerkUser) {
  try {
    // Check if user already exists by primeId and email
    const existingUser = await prisma.user.findUnique({
      where: { primeId, email },
    });

    if (existingUser) {
      console.log('User already exists:', existingUser.id);
      return existingUser;
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        primeId,
      },
    });

    console.log('New user created:', newUser.id);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('User creation failed.');
  }
}

export async function updateUser({ email, fullName, primeId }: ClerkUser) {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { primeId, email },
    });

    if (!existingUser) {
      return {
        status: 404,
        message: 'User not found. Cannot update.',
      };
    }

    // Update user with new info
    const updatedUser = await prisma.user.update({
      where: { primeId, email },
      data: {
        email,
        fullName,
      },
    });

    console.log('[User Updated] ID:', updatedUser.id);
    return {
      status: 200,
      message: 'User updated successfully',
      data: updatedUser,
    };
  } catch (error) {
    console.error('[Update User Error]:', error);
    return {
      status: 500,
      message: 'Failed to update user',
    };
  }
}
