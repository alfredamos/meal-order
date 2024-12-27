"use client";

import { useCart } from "@/features/cartItemSlice";
import { useRouter } from "next/navigation";
import { Fragment} from "react";
import toast from "react-hot-toast";


export default function Checkout() {
const carts = useCart()?.cartItems;

  let total = 0;
  const router = useRouter();

  const makePayment = () => {
    toast.success("Items checkout successfully!"); //----> Show toast for items-checkout successfully.
    router.push("/orders/payment")
  }

  const backToCart = () => {
    router.push("/orders/cart")
  }


  return carts?.length < 1 ? (
    <div className="bg-white p-12 shadow-xl rounded-lg text-indigo-500 max-w-md flex justify-center items-center font-bold mx-auto mt-96 text-4xl">
      No order to display
    </div>
  ) : (
    <div className="bg-white p-12 overflow-y-auto scrollbar max-w-2xl  max-h-80 text-black rounded-xl shadow-2xl mx-auto mt-20">
      <h2 className="font-semibold border-b-2 text-3xl">
        <span>Checkout Details</span>
      </h2>
      {carts?.map((cart) => {
        const subTotal = cart?.price * cart?.quantity;
        total += subTotal;
        if (Number.isNaN(total)) total = Number("");

        return (
          !!cart && (
            <Fragment key={cart.id}>
              <p className="flex justify-between items-center py-2 mt-2">
                <span className="font-light">Product</span>
                <span className="font-semibold text-end">{cart.name}</span>
              </p>
              <p className="flex justify-between items-center py-2 mt-2">
                <span className="font-light">Price </span>
                <span className="font-semibold text-end">${cart.price}</span>
              </p>
              <p className="flex justify-between items-center py-2 mt-2 mb-2">
                <span className="font-light">Quantity </span>
                <span className="font-semibold text-end">{cart.quantity}</span>
              </p>

              <p className="flex justify-between items-center py-2 border-t-2 border-b-2">
                <span className="font-semibold">Sub Total</span>
                <span className="font-semibold text-wrap">{subTotal}</span>
              </p>
            </Fragment>
          )
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
          onClick={makePayment}
        >
          Make Payment
        </button>
        <button
          type="button"
          onClick={backToCart}
          className="border-rose-900 border-2 bg-white text-rose-900 hover:bg-rose-900 hover:text-rose-100 rounded-lg px-2 py-4 font-semibold w-1/2 flex justify-center items-center"
        >
          Back To Cart
        </button>
      </div>
    </div>
  );
}
