/* eslint-disable @typescript-eslint/no-explicit-any */
import { onAuthenticateUser } from '@/actions/user-auth';
import { prisma } from '@/lib/prisma';
import { razorpay } from '@/lib/razorpay';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // check user is authenticated or not
    const user = await onAuthenticateUser();
    if (user.status != 200) {
      throw new Error(user.message);
    }

    const { plan } = await req.json();

    if (!['basic', 'pro'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const amount = plan === 'pro' ? 2999 * 100 : 0;

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `${plan}--plan--receipt--${Date.now()}`,
      notes: {},
    });

    // save the order in DB
    await prisma.payment.create({
      data: {
        amount,
        razorpayOrderId: order.id,
        plan,
        status: false,
        userId: user.data?.userId as string,
        userEmail: user.data?.email as string,
      },
    });

    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
