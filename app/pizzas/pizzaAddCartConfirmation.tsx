"use client";

import { deleteCartItem, editCartItem } from "@/features/cartItemSlice";
import { CartItem } from "@prisma/client";
import { Fragment, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { MouseEvent } from "react";

type Props = {
  carts: CartItem[];
  backToPizza: () => void;
  addToCart: (carts: CartItem[]) => void;
};

export default function PizzaAddToCartConfirmation({
  addToCart,
  backToPizza,
  carts,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>(carts);

  let total = 0;

  const dispatch = useDispatch();

  const increaseQuantity = (e: MouseEvent, cartId: string) => {
    console.log("Event: ", { e });
    console.log("Increase quantity of cart-id : ", cartId);

   setQuantity((previous) => {
      if (previous >= 20) return previous;
      return previous + 1;
    }); 

    const newCartItems = cartItems?.map((cart) => {
      if (cart.id === cartId) {
        const newCart = {
          ...cart,
          quantity: quantity >= 19 ? 20 : quantity + 1,
        };
        dispatch(editCartItem({ cartItem: newCart }));

        return newCart;
      }

      return cart;
    }) as CartItem[];

    setCartItems(newCartItems);
    localStorage.setItem("carts", JSON.stringify(newCartItems));
  };

  const decreaseQuantity = (e: MouseEvent, cartId: string) => {
    console.log("Event: ", { e });
    console.log("Decrease quantity of cart-id : ", cartId);

    setQuantity((previous) => {
      if (previous <= 1) return previous;
      return previous - 1;
    });

    const newCartItems = cartItems
      ?.map((cart) => {
        if (cart.id === cartId) {
          const newCart = {
            ...cart,
            quantity: quantity <= 1 ? 1 : quantity -1,
          };
          if (cart?.quantity === 0)
            dispatch(deleteCartItem({ cartItemId: cart.id }));
          if (cart?.quantity > 0) dispatch(editCartItem({ cartItem: newCart }));

          return newCart;
        }

        return cart;
      })
      .filter((cart) => cart?.quantity !== 0) as CartItem[];

    setCartItems(newCartItems);
    localStorage.setItem("carts", JSON.stringify(newCartItems));
  };

  return (
    <div className="bg-white p-12 overflow-y-auto scrollbar max-width-2xl max-h-80 text-black rounded-2xl shadow-2xl">
      <h2 className="font-semibold border-b-2 text-3xl">
        <span>Add To Cart Confirmation</span>
      </h2>
      {cartItems?.map((cart) => {
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
                <button onClick={(e) => decreaseQuantity(e, cart.id)}>
                  <FaMinus size="20px" className="text-rose-500" />
                </button>

                {quantity}
                <button onClick={(e) => increaseQuantity(e, cart.id)}>
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
