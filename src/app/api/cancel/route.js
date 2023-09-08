import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function DELETE(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // let data = await request.json();

  let subscriptionId = "sub_1NncKdDroRPwlsvPhWM44wKl";
  const deletedSubscription = await stripe.subscriptions.cancel(subscriptionId);

  console.log(deletedSubscription);
  return NextResponse.json(deletedSubscription);
}
