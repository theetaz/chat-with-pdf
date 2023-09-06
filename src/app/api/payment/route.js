import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let data = await request.json();
  let priceId = data.priceId;
  let userId = data.userId;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    client_reference_id: userId,
    mode: "payment",
    success_url: "https://chat-with-pdf-ten.vercel.app/",
    cancel_url: "https://chat-with-pdf-ten.vercel.app/pricing",
  });

  return NextResponse.json(session.url);
}
