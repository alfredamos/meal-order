"use client"

import { useCart } from "@/features/cartItemSlice";
import { CartItem, Pizza } from "@prisma/client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AddPizzaItem from "./addPizzaItem";
import { updateOnePizza } from "@/features/pizzaSlice";
import { CartUtil } from "@/app/services/cartUtil.service";
import * as ls from "local-storage"

type Props = {
  pizza: Pizza;
}

export default function DetailPizzaClient({pizza}: Props) {
  const cartItems = useCart()?.cartItems; //---> Retrieve cartItems from redux store
  //----> State
  const [isAddToCart, setIsAddToCart] = useState(false);
  
    //----> Get dispatch function
    const dispatch = useDispatch();
  
    const router = useRouter();
  
    const addToCart = (pizza: Pizza) => {
      setIsAddToCart((previous) => !previous);
  
      CartUtil.makeCartItems(pizza, cartItems, dispatch); //----> Get items into cart
  
      router.refresh();
    };
  
    const backToList = () => {
      setIsAddToCart(false);
      router.refresh();
    };
  
    const toCart = (cartItems: CartItem[]) => {
      ls.set<CartItem[]>("carts", cartItems);
      router.push("/protected/orders/cart");
    };
  
    const increaseQuantity = (cart: CartItem) => {
      const updateCart = CartUtil.increaseQuantity(cart, dispatch); //----> Increase cart quantity.
  
      //----> Update cart-items.
      const newCartItems = cartItems?.map((cartItem) =>
        cartItem.id === cart.id ? updateCart : cartItem
      );
  
      //----> Update local-storage.
      ls.set<CartItem[]>("carts", newCartItems);
    };
  
    const decreaseQuantity = (cart: CartItem) => {
      const updateCart = CartUtil.decreaseQuantity(cart, dispatch); //----> Decrease quantity in cart-item.
  
      //----> Update cart-items.
      const newCartItems = cartItems?.map((cartItem) =>
        cartItem.id === cart.id ? updateCart : cartItem
      );
  
      //----> Update local-storage.
      ls.set<CartItem[]>("carts", newCartItems);
    };
  
  return (
    <>
  <div className="flex p-2 min-h-screen text-zinc-300">
  <div className="flex-1 min-h-screen m-4 rounded-3xl">
    <div
    className="card card-compact bg-base-100 w-full shadow-xl text-stone-700 m-2"
  >
    <figure>
      <img
        src={pizza.image}
        alt={pizza.name}
        height="500"
        width="500"
        className="object-fit w-full min-h-screen rounded-xl"
      />
    </figure>
  </div>
  </div>
<div className="flex-1 my-4 mx-8">
  <div className="flex flex-col">
    <h1 className="text-5xl">{pizza.name}</h1>
    <p className="text-xl mt-12">{pizza.description}</p>
    <p className="text-xl font-bold mt-12">${pizza.price }</p>
    <p className="flex justify-between items-center mt-6 font-bold">
      <Link href="/" className="bg-zinc-400 border border-rose-900 hover:bg-rose-900 hover:text-zinc-200 text-rose-900 px-6 py-2 rounded-lg text-xl">Back</Link>
      <button className="bg-zinc-400 border border-indigo-900 hover:bg-indigo-900 hover:text-zinc-200 text-indigo-900 px-6 py-2 rounded-lg text-xl" onClick={() => addToCart(pizza)}>Buy</button>
    </p>


  </div>
</div>
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
