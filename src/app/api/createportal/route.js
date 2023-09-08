import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let data = await request.json();
  console.log("DATA", data);
  let customerId = data?.customer_id;

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: "https://chat-with-pdf-ten.vercel.app/transactions",
  });

  console.log("PORTAL", session);
  return NextResponse.json(session);
}
