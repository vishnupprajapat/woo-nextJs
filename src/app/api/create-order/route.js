import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { NextResponse } from "next/server";
import { isEmpty } from "lodash";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});

// Named export for the `POST` method
export async function POST(req) {
  try {
    const body = await req.json();

    if (isEmpty(body)) {
      return NextResponse.json({ success: false, error: "Required data not sent" }, { status: 400 });
    }

    const orderData = { ...body, status: "pending", set_paid: false };
    const { data } = await api.post("orders", orderData);

    return NextResponse.json({
      success: true,
      orderId: data.id,
      total: data.total,
      currency: data.currency,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
