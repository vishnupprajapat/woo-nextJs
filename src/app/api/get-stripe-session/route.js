import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return Response.json({ error: "Session ID is required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return Response.json(session, { status: 200 });
  } catch (error) {
    console.error("Error retrieving Stripe session:", error.message);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
