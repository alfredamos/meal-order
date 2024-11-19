import { CartItem } from "@prisma/client";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  carts: CartItem[];
  /*  backToPizza: () => void;
  addToCart: (cartItems: CartItem[]) => void; */
};

export default function CartDetail({
  /* addToCart,
  backToPizza, */
  carts,
}: Props) {
  let total = 0;

  return (
    <div className="bg-white p-12 max-width-4xl text-black rounded-2xl shadow-2xl w-1/4 mx-auto mt-10">
      <h2 className="font-semibold border-b-2 text-3xl">
        <span>Pizza Order Detail</span>
      </h2>
      {carts?.map((cart) => {
        const subTotal = cart.price * cart.quantity;
        total += subTotal;
        return (
          <Fragment key={cart.id}>
            <p className="flex justify-between items-center py-2 mt-2">
              <span className="font-light">Product</span>
              <span className="font-semibold">{cart.name}</span>
            </p>
            <p className="flex justify-between items-center py-2">
              <span className="font-light">Price </span>
              <span className="font-semibold">${cart.price}</span>
            </p>
            <p className="flex justify-between items-center py-2">
              <span className="font-light">Quantity </span>
              <span className="font-semibold">{cart.quantity}</span>
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
        <Link
          type="button"
          className="flex-1 border-indigo-900 border-2 bg-white text-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 rounded-lg px-2 py-4 font-semibold"
          href="/orders/cart"
          // onClick={() => addToCart(carts)}
        >
          Add To Cart
        </Link>
        <Link
          type="button"
          href="/pizzas"
          className="flex-1 border-rose-900 border-2 bg-white text-rose-900 hover:bg-rose-900 hover:text-rose-100 rounded-lg px-2 py-4 font-semibold"
          // onClick={backToPizza}
        >
          Back To Pizza
        </Link>
      </div>
    </div>
  );
}