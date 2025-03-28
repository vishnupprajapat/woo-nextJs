import { NextResponse } from "next/server";
import Stripe from "stripe";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});

/**
 * Update Order Status on WooCommerce.
 */
const updateOrder = async (newStatus, orderId, transactionId = "") => {
  let newOrderData = { status: newStatus };
  if (transactionId) {
    newOrderData.transaction_id = transactionId;
  }

  try {
    const { data } = await api.put(`orders/${orderId}`, newOrderData);
    console.log("✅ Order updated successfully:", data);
  } catch (ex) {
    console.error("❌ Order update error:", ex);
    throw ex;
  }
};

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");

  let stripeEvent;
  try {
    const buf = await req.text(); // ✅ Fix: Use `.text()` instead of `arrayBuffer()`
    stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    console.log("🔔 Stripe Event:", stripeEvent);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Signature Verification Failed: ${err.message}` },
      { status: 400 }
    );
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;
    console.log("✅ Payment Successful - Order ID:", session.metadata.orderId);

    try {
      await updateOrder("processing", session.metadata.orderId, session.id);
    } catch (error) {
      await updateOrder("failed", session.metadata.orderId);
      console.error("❌ Order Update Failed:", error);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

export const config = {
  api: {
    bodyParser: false, // ✅ Fix: Disable bodyParser for raw request body
  },
};
