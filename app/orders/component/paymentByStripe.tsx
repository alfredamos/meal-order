"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { convertToSubCurrency } from "@/utils/convertToSubCurrency";
import StripeCheckout from "./stripeCheckout";
import { useCart } from "@/hooks/useCart";
import { sumTotal } from "@/utils/sumTotal";
import { createPaymentIntent } from "@/actions/stripe.action";
import { useState } from "react";

const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;

console.log("STRIPE_KEY : ", STRIPE_PUBLIC_KEY);

if (STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined!");
}
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY!);

type Props = {
  userId: string 
}

export default function PaymentByStripe({ userId }: Props) {
  const cartItems = useCart()?.cartItems;
 
  const [clientSecret, setClientSecret] = useState<string | null>("");
  const [paymentId, setPaymentId] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  const total = sumTotal(cartItems);

  const initiateStripe = async () => {
    setIsLoading(true);
    const amount = convertToSubCurrency(total);
    const {client_secret, id} = await createPaymentIntent(amount, "description");
    console.log({clientSecret: client_secret, paymentId: id})
    
    setClientSecret(client_secret);
    setPaymentId(id);
    setIsLoading(false)
  
  };

  return (
    <main className="max-w-3xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
    {
      !clientSecret &&  <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          Please pay for your order!
        </h1>
        <h2 className="text-2xl">
          Your total order is : <span>${total}</span>
        </h2>
        <button
          // disabled={isLoading}
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
          onClick={initiateStripe}
          type="button"
        >
          pay
          {/* {!isLoading ? `$${total}` : "Processing..."} */}
        </button>
      </div>
    }
     
      {!!clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
          }}
        >
          <StripeCheckout total={total} cartItems={cartItems} userId={userId} paymentId={paymentId as string}/>
        </Elements>
      )}
    </main>
  );
}
