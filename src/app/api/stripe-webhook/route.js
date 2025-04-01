import {Stripe} from 'stripe';
import {NextResponse} from 'next/server';
import {headers} from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
  apiVersion:"2024-06-20"
} );

export async function POST(req) {
  let event
  try {
    const stripeSignature = (await headers()).get('stripe-signature');
console.log(stripeSignature)
    event = stripe.webhooks.constructEvent(
      await req.text(),
      stripeSignature ,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(event)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    // On error, log and return the error message.
    if (err) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      {message: `Webhook Error: ${errorMessage}`},
      {status: 400}
    );
  }

  // Successfully constructed event.
  console.log('✅ Success:', event.id);

  const permittedEvents= [
    'checkout.session.completed',
    'payment_intent.succeeded',
  ];

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          data = event.data.object 
          console.log(`💰 CheckoutSession status: ${data.payment_status}`);
          break;
        case 'payment_intent.succeeded':
          data = event.data.object 
          console.log(`💰 PaymentIntent status: ${data.status}`);
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {message: 'Webhook handler failed'},
        {status: 500}
      );
    }
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({message: 'Received'}, {status: 200});
}