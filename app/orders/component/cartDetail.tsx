"use client";

import { CartItem } from "@prisma/client";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  editCartItem,
  useCart,
} from "@/features/cartItemSlice";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LocalStorageService } from "@/app/services/localStorage.service";
import toast from "react-hot-toast";
import { CartUtil } from "@/app/services/cartUtil.service";

const localStorageService = new LocalStorageService<CartItem[]>();

export default function CartDetail() {
  const carts = useCart()?.cartItems;
  const [cartItems, setCartItems] = useState<CartItem[]>(carts);

  const router = useRouter();

  const dispatch = useDispatch();

  let total = 0;

  const increaseQuantity = (cart: CartItem) => {
    const updatedCart = CartUtil.increaseQuantity(cart, dispatch);

    //----> Update the cartItems.
    setCartItems((oldCartItems) =>
      oldCartItems?.map((cartItem) =>
        cartItem.id === cart.id ? updatedCart : cart
      )
    );

    //----> Update the local-storage
    localStorageService.setLocalStorage(cartItems, "carts");
  };

  const decreaseQuantity = (cart: CartItem) => {
    const updatedCart = CartUtil.decreaseQuantity(cart, dispatch);

    //----> Update the cartItems.
    setCartItems((oldCartItems) =>
      oldCartItems?.map((cartItem) =>
        cartItem.id === cart.id ? updatedCart : cart
      )
    );

    //----> Update the local-storage.
    localStorageService.setLocalStorage(cartItems, "carts");
  };

  const removePizza = (cart: CartItem) => {
    CartUtil.removePizza(cart, dispatch);

    //----> Update cart-items.
    setCartItems((oldCartItems) =>
      oldCartItems.filter((cartItem) => cartItem.id !== cart.id)
    );

    //----> Local-storage.
    localStorageService.setLocalStorage(cartItems, "carts");
    if (cartItems?.length === 1)
      localStorageService.removeLocalstorage("carts");
  };

  const makeCheckout = () => {
    toast.success("Cart items selected!"); //----> Show toast for selected items.
    router.push("/orders/checkout");
  };

  const backToPizzas = () => {
    router.push("/pizzas");
  };

  return cartItems?.length < 1 ? (
    <div className="bg-white p-12 shadow-xl rounded-lg max-w-lg flex justify-center items-center font-bold mx-auto mt-80">
      <p className="flex flex-col gap-10">
        <span className="text-4xl">No order to display</span>
        <span className="flex justify-end items-center">
          <Link href="/pizzas" className="text-indigo-500">
            <span className="flex gap-2 justify-center items-center">
              <FaArrowLeft size="20px" />
              <FaArrowLeft size="20px" />
              <span className="text-2xl">Home</span>
            </span>
          </Link>
        </span>
      </p>
    </div>
  ) : (
    <div className="bg-white p-12 overflow-y-auto scrollbar max-w-2xl  max-h-80 text-black rounded-xl shadow-2xl mx-auto mt-20">
      <h2 className="font-semibold border-b-2 text-3xl">
        <span>Order Details</span>
      </h2>
      {cartItems?.map((cart) => {
        const subTotal = cart?.price * cart?.quantity;
        total += subTotal;
        if (Number.isNaN(total)) total = Number("");

        return (
          !!cart && (
            <Fragment key={cart.id}>
              <p className="flex justify-between items-center py-2 mt-2">
                <span className="font-light">Product</span>
                <span className="font-semibold text-end">{cart.name}</span>
                <span>
                  <FaPlus
                    size="20px"
                    className="cursor-pointer text-indigo-900 text-end"
                    onClick={() => increaseQuantity(cart)}
                  />
                </span>
              </p>
              <p className="flex justify-between items-center py-2 mt-2">
                <span className="font-light">Price </span>
                <span className="font-semibold text-end">${cart.price}</span>
                <span className="text-end">
                  <FaMinus
                    size="20px"
                    className="cursor-pointer text-amber-500"
                    onClick={() => decreaseQuantity(cart)}
                  />
                </span>
              </p>
              <p className="flex justify-between items-center py-2 mt-2 mb-2">
                <span className="font-light">Quantity </span>
                <span className="font-semibold text-end">{cart.quantity}</span>
                <span className="text-end">
                  <FaTrash
                    size="20px"
                    className="cursor-pointer text-rose-700"
                    onClick={() => removePizza(cart)}
                  />
                </span>
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
          onClick={makeCheckout}
        >
          Checkout
        </button>
        <button
          type="button"
          onClick={backToPizzas}
          className="border-rose-900 border-2 bg-white text-rose-900 hover:bg-rose-900 hover:text-rose-100 rounded-lg px-2 py-4 font-semibold w-1/2 flex justify-center items-center"
        >
          Back To Pizza
        </button>
      </div>
    </div>
  );
}
