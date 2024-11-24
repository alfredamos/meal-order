"use client";

import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import { convertToSubCurrency } from "@/utils/convertToSubCurrency";
import StripeCheckout from './stripeCheckout';
import { useCart } from "@/hooks/useCart";
import { sumTotal } from "@/utils/sumTotal";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined!");
}
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PaymentByStripe() {
  const cartItems = useCart()?.cartItems;
  
  const total = sumTotal(cartItems)
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          Please pay for your order!
        </h1>
        <h2 className="text-2xl">
          Your total order is : <span>${total}</span>
        </h2>
        
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubCurrency(total),
          currency: "usd",
        }}
      >
        <StripeCheckout total={total}></StripeCheckout>
      </Elements>
    </main>
  );
}