"use client";

import { CartItem } from "@prisma/client";
import { Fragment } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  carts: CartItem[];
  addToCart: (carts: CartItem[]) => void;
  backToPizza: () => void;
  decreaseQuantity: (cartId: string) => void;
  increaseQuantity: (cartId: string) => void;
};

export default function PizzaAddToCartConfirmation({ carts, addToCart, backToPizza, decreaseQuantity, increaseQuantity}: Props) {

  let total = 0;

 
  return (
    <div className="bg-white p-12 overflow-y-auto scrollbar max-width-2xl max-h-80 text-black rounded-2xl shadow-2xl">
      <h2 className="font-semibold border-b-2 text-3xl">
        <span>Add To Cart Confirmation</span>
      </h2>
      {carts?.map((cart) => {
        const subTotal = cart?.price * cart?.quantity;
        total += subTotal;

        if (Number.isNaN(total)) total = Number("");
        return (
          <Fragment key={cart.id}>
            <p className="flex justify-between items-center py-2 mt-2">
              <span className="font-light">Product</span>
              <span className="font-semibold">{cart.name}</span>
            </p>
            <p className="flex justify-between items-center py-2 mt-2">
              <span className="font-light">Price </span>
              <span className="font-semibold">${cart.price}</span>
            </p>
            <p className="flex justify-between items-center py-2 mt-2">
              <span className="font-light">Quantity </span>
              <span className=" flex gap-4 justify-center items-center font-semibold">
                <button className="border border-none" onClick={() => decreaseQuantity(cart.id)}>
                  <FaMinus size="20px" className="text-rose-500" />
                </button>

                {cart.quantity}
                <button className="border border-none" onClick={() => increaseQuantity(cart.id)}>
                  <FaPlus size="20px" className="text-indigo-500" />
                </button>
              </span>
            </p>

            <p className="flex justify-between items-center py-2 border-t-2 border-b-2">
              <span className="font-light">Sub Total</span>
              <span className="font-semibold text-wrap">{subTotal}</span>
            </p>
          </Fragment>
        );
      })}
      <p className="flex justify-between items-center py-2 border-b-2 mt-8">
        <span className="font-light">Total</span>
        <span className="font-semibold text-wrap">{total}</span>
      </p>
      <div className="flex gap-2 justify-between items-center w-full mt-8">
        <button
          type="button"
          className="flex-1 border-indigo-900 border-2 bg-white text-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 rounded-lg px-2 py-4 font-semibold"
          onClick={() => addToCart(carts)}
        >
          Add To Cart
        </button>
        <button
          type="button"
          className="flex-1 border-rose-900 border-2 bg-white text-rose-900 hover:bg-rose-900 hover:text-rose-100 rounded-lg px-2 py-4 font-semibold"
          onClick={backToPizza}
        >
          Back To Pizza
        </button>
      </div>
    </div>
  );
}
