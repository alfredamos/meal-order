import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest){
  try {
    const {amount} = await request.json();

<<<<<<< HEAD
=======
    console.log("Amount : ", amount)

>>>>>>> 4a9352fb424501ac5b0468491a6843f959db890f
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {enabled: true}
    });

<<<<<<< HEAD
=======
    const clientSecret = paymentIntent.client_secret;

    console.log("Client-secret : ", clientSecret)

>>>>>>> 4a9352fb424501ac5b0468491a6843f959db890f
    return NextResponse.json({clientSecret: paymentIntent.client_secret});
  } catch (error) {

    console.error("Internal Error");

    return NextResponse.json({
      error: `Internal Server Error : ${error}`
    }, {status: 500});
    
  }
}