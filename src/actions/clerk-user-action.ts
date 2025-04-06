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
