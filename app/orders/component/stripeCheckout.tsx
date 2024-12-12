"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { CartItem } from "@prisma/client";
import { useRouter } from "next/navigation";
import { OrderPayload } from "@/models/orderPayload.model";
import { orderCreate } from "@/actions/order.action";
import { useDispatch } from "react-redux";
import { emptyCartItem } from "@/features/cartItemSlice";
import { LocalStorageService } from "@/app/services/localStorage.service";

const localStorageService = new LocalStorageService<CartItem[]>

type Props = {
  total: number;
  cartItems: CartItem[];
  userId: string;
  paymentId: string;
};

export default function StripeCheckout({
  total: totalPrice,
  userId,
  cartItems,
  paymentId,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const totalQuantity = cartItems?.reduce(
    (subTotalQuantity, current) => subTotalQuantity + current.quantity,
    0
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (!elements || !stripe) return;

      const results = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/orders/payment-success?amount=${totalPrice}`,
        },
         redirect: "if_required",
      });

      if (results.error) {
        //----> the error here.
        setErrorMessage(results?.error?.message!);
      } else {
        //----> Save the order here
        //----> paymentId = results.paymentIntent.id
        //----> use router to redirect here
        const orderPayload: OrderPayload = {
          paymentId,
          userId,
          cartItems,
          totalPrice,
          totalQuantity,
          orderDate: new Date(),
        };

        await orderCreate(orderPayload);

        dispatch(emptyCartItem());

        localStorageService.removeLocalstorage("carts");



       router.replace(
         `http://localhost:3000/orders/payment-success?amount=${totalPrice}`
       );
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(true);
    }
  };

  const onBackToCheckOut = () => {
    router.push("/orders/checkout");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      <PaymentElement />
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["Nigeria", "Canada", "USA"],
        }}
      />
      <div className="flex justify-center gap-6 mt-6">
        <button
          type="submit"
          className="bg-indigo-500 text-indigo-100 px-6 py-2 rounded-md flex-1 font-bold uppercase"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onBackToCheckOut}
          className="bg-rose-500 text-rose-100 px-6 py-2 rounded-md flex-1 uppercase font-bold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
