import { updateOrder } from "@/actions/update-order-status";
import axios from 'axios';
import { NextResponse } from "next/server";
import Stripe from "stripe";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// const api = new WooCommerceRestApi({
//   url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
//   consumerKey: process.env.WC_CONSUMER_KEY,
//   consumerSecret: process.env.WC_CONSUMER_SECRET,
//   version: "wc/v3",
//   axiosConfig: {
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//       Authorization: `Basic ${Buffer.from(
//         process.env.WC_CONSUMER_KEY + ":" + process.env.WC_CONSUMER_SECRET
//       ).toString("base64")}`,
//     },
//   },
// });

/**
 * Update Order Status on WooCommerce.
 */
// const updateWooOrder = async (newStatus, orderId, transactionId = "") => {
//   try {
//     const response = await api.put(`orders/${orderId}`, {
//       status: newStatus,
//       transaction_id: transactionId,
//     }
//   );

//     console.log("✅ WooCommerce Order Updated:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Failed to update WooCommerce order:", error.response);
//     throw error;
//   }
// };


export async function POST(request) {
  try {
    const body = await request.text();
    const signature = await request.headers.get("stripe-signature"); // ✅ FIXED: Use request.headers

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("❌ Webhook signature verification failed:", error);
      return NextResponse.json(
        { error: "Webhook Signature Verification Failed" },
        { status: 400 }
      );
    }

    const session = event.data.object;

    if (event.type === "checkout.session.completed") {
      console.log("✅ Payment Successful - Order ID:", session.metadata.orderId);
      // try {
      //   await updateWooOrder("completed", session.metadata.orderId, session.id);
      //   // await updateOrder(
      //   //   session.metadata.orderId,
      //   //   "completed",
      //   //   session.id
      //   // );
      // } catch (error) {
      
      //   // await updateOrder(
      //   //   session.metadata.orderId,
      //   //   "failed",
      //   //   session.id
      //   // );
      //   await updateWooOrder("completed", session.metadata.orderId, session.id);
      //   console.error("❌ Order Update Failed:", error);
      // }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Handler Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Disable body parsing to get raw body (needed for Stripe webhook verification)
export const config = {
  api: {
    bodyParser: false,
  },
};
