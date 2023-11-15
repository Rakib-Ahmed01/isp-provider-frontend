import Cors from 'micro-cors';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import util from 'util';

util.inspect.defaultOptions.depth = null;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) as Stripe;

Cors({
  allowMethods: ['POST', 'HEAD'],
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = headers().get('stripe-signature') as string;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    const session = event.data.object as Stripe.Checkout.Session;
    let orderData = {} as { planId: string; userId: string };

    if (event.type === 'checkout.session.completed') {
      const event = await stripe.checkout.sessions.retrieve(
        session.id as string
      );
      orderData = event.metadata as { planId: string; userId: string };
    }

    if (event.type === 'invoice.payment_succeeded') {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ``,
          },
          body: JSON.stringify({
            planId: orderData.planId,
            userId: orderData.userId,
            // status: 'pending',
          }),
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    return NextResponse.json({ message: 'OK', ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'something went wrong',
        ok: false,
      },
      { status: 500 }
    );
  }
}
