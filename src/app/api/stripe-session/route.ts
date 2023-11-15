import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY || '';

const stripe = new Stripe(key, {
  apiVersion: '2023-10-16',
});

type Payload = {
  plan: Plan;
  userId: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { plan, userId } = body as Payload;

  try {
    if (plan.title) {
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        invoice_creation: {
          enabled: true,
        },
        line_items: [
          {
            price_data: {
              currency: 'bdt',
              product_data: {
                name: plan.title,
                description: plan.description,
                metadata: {
                  user: 'Rakib Ahmed',
                  planId: plan.id,
                },
              },
              unit_amount: plan.price * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${request.headers.get(
          'origin'
        )}/dashboard/user/orders/success?planId=${plan.id}&userId=${userId}`,
        cancel_url: `${request.headers.get('origin')}`,
        metadata: {
          planId: plan.id,
          userId,
        },
      });

      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: 'No Data Found' });
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}
