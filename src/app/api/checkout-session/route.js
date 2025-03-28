import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// Helper function: Convert products to Stripe's line_items format
const getStripeLineItems = (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    return [];
  }

  return products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product?.name ?? "",
        images: product?.image?.sourceUrl ? [product.image.sourceUrl] : [],
      },
      unit_amount: Math.round(product?.price * 100), // Convert price to cents
    },
    quantity: product?.qty ?? 1,
  }));
};

// Helper function: Create metadata
const getMetaData = (input, orderId) => ({
  billing: JSON.stringify(input?.billing),
  shipping: JSON.stringify(
    input.billingDifferentThanShipping
      ? input?.billing?.email
      : input?.shipping?.email
  ),
  orderId,
});

export async function POST(req) {
  try {
    const { products, input, orderId } = await req.json(); // Use `req.json()` instead of `req.body`

    const session = await stripe.checkout.sessions.create({
      success_url: `${req.headers.get("origin")}/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: req.headers.get("origin"),
      customer_email: input.billingDifferentThanShipping
        ? input?.billing?.email
        : input?.shipping?.email,
      line_items: getStripeLineItems(products),
      metadata: getMetaData(input, orderId),
      payment_method_types: ["card"],
      mode: "payment",
    });

    return Response.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

