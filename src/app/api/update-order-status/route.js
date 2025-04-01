  // this file is  not  used 
  import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
  import { NextResponse } from "next/server";
  import { isEmpty } from "lodash";

  const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3",
  });


  export async function PUT(req) {
    try {
        const body = await req.json();
        console.log("📩 Received Body:", body); // Debugging log

        const { orderId, newStatus } = body;
        if (!orderId || !newStatus) {
            return NextResponse.json({ success: false, error: "Required data not sent" }, { status: 400 });
        }

        const newOrderData = { status: newStatus };
        const { data } = await api.put(`orders/${orderId}`, newOrderData);

        return NextResponse.json({
            success: true,
            orderId: data.id,
            status: data.status,
        });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

