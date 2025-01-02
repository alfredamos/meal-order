"use client";

import { CartItem, Pizza } from "@prisma/client";
import { useState } from "react";
import AddPizzaItem from "./_components/addPizzaItem";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useCart } from "@/features/cartItemSlice";
import { LocalStorageService } from "../services/localStorage.service";
import { CartUtil } from "../services/cartUtil.service";

type Props = {
  pizzas: Pizza[];
};

const localStorageService = new LocalStorageService<CartItem[]>();

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

    CartUtil.makeCartItems(pizza, cartItems, dispatch); //----> Get items into cart

    router.refresh();
  };

  const backToList = () => {
    console.log("You must close now!!!");
    setIsAddToCart(false);
    router.refresh();
  };

  const toCart = (cartItems: CartItem[]) => {
    localStorageService.setLocalStorage(cartItems, "carts");
    router.push("/orders/cart");
  };

  const increaseQuantity = (cart: CartItem) => {
    const updateCart = CartUtil.increaseQuantity(cart, dispatch); //----> Increase cart quantity.

    //----> Update cart-items.
    const newCartItems = cartItems?.map((cartItem) =>
      cartItem.id === cart.id ? updateCart : cartItem
    );

    //----> Update local-storage.
    localStorageService.setLocalStorage(newCartItems, "carts");
  };

  const decreaseQuantity = (cart: CartItem) => {
    const updateCart = CartUtil.decreaseQuantity(cart, dispatch); //----> Decrease quantity in cart-item.

    //----> Update cart-items.
    const newCartItems = cartItems?.map((cartItem) =>
      cartItem.id === cart.id ? updateCart : cartItem
    );

    //----> Update local-storage.
    localStorageService.setLocalStorage(newCartItems, "carts");
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
                  priority
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
