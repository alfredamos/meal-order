"use client";

import { CartItem, Pizza } from "@prisma/client";
import { useState } from "react";
import AddPizzaItem from "./_components/addPizzaItem";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { makeCartItems } from "@/utils/makeCartItems";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  editCartItem,
  useCart,
} from "@/features/cartItemSlice";

type Props = {
  pizzas: Pizza[];
};

export default function PizzaListItems({ pizzas }: Props) {
  const cartItems = useCart()?.cartItems; //---> Retrieve cartItems from redux store
  console.log("Initial-redux", { cartItems });
  //----> Set states for the following
  const [isAddToCart, setIsAddToCart] = useState(false);  

  //----> Get dispatch function
  const dispatch = useDispatch();

  const router = useRouter();

  const addToCart = (pizza: Pizza) => {
    console.log("Add to cart");
    setIsAddToCart((previous) => !previous);

    makeCartItems(pizza, cartItems, dispatch);

    router.refresh();
  };

  const backToList = () => {
    console.log("You must close now!!!");
    setIsAddToCart(false);
    router.refresh();
  };

  const toCart = (cartItems: CartItem[]) => {
    console.log("The cart-items to cart : ", { cartItems });

    localStorage.setItem(
      "carts",
      JSON.stringify(cartItems?.filter((cart) => cart?.quantity !== 0))
    );
    router.push("/orders/cart");
  };

  const increaseQuantity = (cartId: string) => {
    console.log("Increase quantity of cart-id : ", cartId);

    const newCartItems = cartItems?.map((cart) => {
      if (cart.id === cartId) {

        const newCart = {
          ...cart,
          quantity: cart.quantity >= 19 ? 20 : cart.quantity + 1,
        };
        dispatch(editCartItem({ cartItem: newCart }));

        return newCart;
      }

      return cart;
    }) as CartItem[];

    localStorage.setItem("carts", JSON.stringify(newCartItems));
  };

  const decreaseQuantity = (cartId: string) => {
    console.log("Decrease quantity of cart-id : ", cartId);

    const newCartItems = cartItems
      ?.map((cart) => {

        if (cart.id === cartId) {
          const newCart = {
            ...cart,
            quantity: cart.quantity <= 1 ? 1 : cart.quantity - 1,
          };
          if (cart?.quantity === 0)
            dispatch(deleteCartItem({ cartItemId: cart.id }));
          if (cart?.quantity > 0) dispatch(editCartItem({ cartItem: newCart }));

          return newCart;
        }

        return cart;
      })
      .filter((cart) => cart?.quantity !== 0) as CartItem[];

    localStorage.setItem("carts", JSON.stringify(newCartItems));
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 m-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pizzas.map((pizza) => {
          return (
            <div
              className="card card-compact bg-base-100 w-full shadow-xl text-stone-700 m-2"
              key={pizza.id}
            >
              <figure>
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  height={80}
                  width={80}
                  className="object-cover w-full h-48"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  <Link href={`/pizzas/${pizza.id}/detail`}>{pizza.name}</Link>
                </h2>
                <p>${pizza.price}</p>
                <p>{pizza.description}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(pizza)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isAddToCart && (
        <AddPizzaItem
          isAddToCart={isAddToCart}
          carts={cartItems}
          addToCart={toCart}
          backToList={backToList}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
        />
      )}
    </>
  );
}
