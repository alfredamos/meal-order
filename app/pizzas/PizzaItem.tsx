"use client";

import { CartItem, Pizza } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import AddPizzaItem from "./_components/addPizzaItem";
=======
>>>>>>> 4a9352fb424501ac5b0468491a6843f959db890f

type Props = {
  pizza: Pizza;
  onCart: (isCart: boolean) => void;
};
export default function PizzaItem({ onCart, pizza }: Props) {
  const cart = useCart();
  const dispatch = useDispatch();

<<<<<<< HEAD
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [carts, setCarts] = useState<CartItem[]>(cart?.cartItems);
=======
  const [_isAddToCart, setIsAddToCart] = useState(false);
  const [_carts, _setCarts] = useState<CartItem[]>(cart?.cartItems);
>>>>>>> 4a9352fb424501ac5b0468491a6843f959db890f

  const addCartItems = (pizza: Pizza) => {
    console.log({ pizza });
    setIsAddToCart((previous) => {
      onCart(!previous);
      return !previous;
    });
<<<<<<< HEAD
    //onCart(isAddToCart);
=======
    
>>>>>>> 4a9352fb424501ac5b0468491a6843f959db890f
  };

  return (
    <div className="card card-compact bg-base-100 w-full shadow-xl text-stone-700 m-2">
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
            onClick={() => addCartItems(pizza)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
