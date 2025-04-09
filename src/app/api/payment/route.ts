import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/utils/prismaDB";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  try {
    const data = await request.json();
    const { priceId, userId } = data;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/cancel`,
    });

    // Update the user's isPremium attribute in the database
    await prisma.user.update({
      where: { id: userId },
      data: { isPremium: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating payment session:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}