"use client"

import { useCart } from "@/features/cartItemSlice";
import { CartItem, Pizza } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import AddPizzaItem from "./_components/addPizzaItem";
import { LocalStorageService } from "../services/localStorage.service";
import { CartUtil } from "../services/cartUtil.service";

const localStorageService = new LocalStorageService<CartItem[]>;

type Props = {
  pizza: Pizza;
};
export default function PizzaCard({ pizza }: Props) {
  const cartItems = useCart()?.cartItems; //---> Retrieve cartItems from redux store
  //----> Set states for the following
  const [isAddToCart, setIsAddToCart] = useState(false);
  //const [carts, setCarts] = useState<CartItem[]>(cartItems);

  //----> Get dispatch function
  const dispatch = useDispatch();

  const router = useRouter();

  const addToCart = (pizza: Pizza) => {
    setIsAddToCart((previous) => !previous);

    CartUtil.makeCartItems(pizza, cartItems, dispatch);

    router.refresh();
  };

  const backToList = () => {
    setIsAddToCart(false);
    router.refresh();
  };

  const toCart = (cartItems: CartItem[]) => {
     localStorageService.setLocalStorage(cartItems, "carts");
     router.push("/orders/cart")
  };

  const quantityIncrease = () => {}

  const quantityDecrease = () => {}
  
  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl w-1/2 h-1/2 mx-auto mt-16">
        <figure className="flex-1">
          <Image
            src={pizza.image}
            alt={pizza.name}
            width={100}
            height={100}
            className="object-cover w-full  h-full"
          />
        </figure>
        <div className="card-body text-stone-700 flex-1">
          <h2 className="card-title">
            <Link href="/pizzas">{pizza.name}</Link>
          </h2>
          <p>${pizza.price}</p>
          <p>{pizza.description}</p>
          <p>Click the button to order your pizza!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => addToCart(pizza)}>Buy Now</button>
          </div>
        </div>
      </div>
      {isAddToCart && (
        <AddPizzaItem
          isAddToCart={isAddToCart}
          carts={cartItems}
          addToCart={toCart}
          backToList={backToList}
          decreaseQuantity={quantityDecrease}
          increaseQuantity={quantityIncrease}
        />
      )}
    </>
  );
}
