"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { convertToSubCurrency } from "@/utils/convertToSubCurrency";
import StripeCheckout from "./stripeCheckout";
import { useCart } from "@/hooks/useCart";
import { sumTotal } from "@/utils/sumTotal";
import { createPaymentIntent } from "@/actions/stripe.action";
import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;

if (STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined!");
}
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY!);

type Props = {
  userId: string;
};

export default function PaymentByStripe({ userId }: Props) {
  const cartItems = useCart()?.cartItems;

  const [clientSecret, setClientSecret] = useState<string | null>("");
  const [paymentId, setPaymentId] = useState<string | null>("");
  const [_isLoading, setIsLoading] = useState(false);

  let total = 0;

  const initiateStripe = async () => {
    setIsLoading(true);
    const totalPrice = convertToSubCurrency(sumTotal(cartItems));
    const { client_secret, id } = await createPaymentIntent(totalPrice,"description");

    setClientSecret(client_secret);
    setPaymentId(id);
    setIsLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      {
        !clientSecret && (
          <div className="bg-white p-8 overflow-y-auto scrollbar max-w-4xl max-h-96 text-black rounded-xl shadow-2xl mx-auto my-auto">
            <h2 className="font-semibold border-b-2 text-3xl">
              <span>Checkout Details</span>
            </h2>
            {cartItems?.map((cart) => {
             const subTotal = cart?.price * cart?.quantity;
             total += subTotal;
             if (Number.isNaN(total)) total = Number("");
              return (
                <Fragment key={cart.id}>
                  <p className="py-2 mt-2">
                    <Image
                      className="object-cover w-full h-48 rounded-lg"
                      width={80}
                      height={80}
                      alt={cart.name}
                      src={cart.image}
                    />
                  </p>
                  <p className="flex justify-between items-center py-2 mt-2">
                    <span className="font-light">Price </span>
                    <span className="font-semibold text-end">
                      ${cart.price}
                    </span>
                  </p>
                  <p className="flex justify-between items-center py-2 mt-2 mb-2">
                    <span className="font-light">Quantity </span>
                    <span className="font-semibold text-end">
                      {cart.quantity}
                    </span>
                  </p>

                  <p className="flex justify-between items-center py-2 border-t-2 border-b-2">
                    <span className="font-semibold">Sub Total</span>
                    <span className="font-semibold text-wrap">{subTotal}</span>
                  </p>
                </Fragment>
              );
            })}

            <p className="flex justify-between items-center py-2 border-b-2 mt-8">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-wrap">{total}</span>
            </p>
            <div className="flex gap-2 justify-center items-center w-full mt-8">
              <button
                type="button"
                className="border-indigo-900 border-2 bg-white text-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 rounded-lg px-2 py-4 font-semibold w-1/2 flex justify-center items-center"
                onClick={initiateStripe}
              >
                Pay
              </button>
              <Link
                type="button"
                href="/orders/checkout"
                className="border-rose-900 border-2 bg-white text-rose-900 hover:bg-rose-900 hover:text-rose-100 rounded-lg px-2 py-4 font-semibold w-1/2 flex justify-center items-center"
              >
                Back To Checkout
              </Link>
            </div>
          </div>
        )

      }

      {!!clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
          }}
        >
          <StripeCheckout
            cartItems={cartItems}
            userId={userId}
            paymentId={paymentId as string}
          />
        </Elements>
      )}
    </main>
  );
}
