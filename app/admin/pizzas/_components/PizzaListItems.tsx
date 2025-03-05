"use client";

import { CartItem, Pizza } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useCart } from "@/features/cartItemSlice";
import { updateOnePizza } from "@/features/pizzaSlice";
import { CartUtil } from "../../../services/cartUtil.service";
import * as ls from "local-storage"
import AddPizzaItem from "./addPizzaItem";

type Props = {
  pizzas: Pizza[];
};

export default function PizzaListItems({ pizzas }: Props) {
  const cartItems = useCart()?.cartItems; //---> Retrieve cartItems from redux store
  //----> Set states for the following
  const [isShowMore, setIsShowMore] = useState(false)
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
    router.push("/orders/cart");
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

  const detailPizza = (pizza: Pizza) => {
    dispatch(updateOnePizza({pizza}))
    console.log("Got to pizza-detail");
    router.push(`/admin/pizzas/${pizza.id}`)
  }

  const showMoreTextHandler = (pizzaId: string) => {
    console.log("Pizza-id : ", pizzaId)
    pizzas?.forEach(pizza =>  {
        if(pizza.id === pizzaId){
          console.log("loop-id : ", pizza.id , " , ", "given-id : ", pizzaId)
          setIsShowMore(showMore => !showMore)
        }
    })
  }

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
              <span className="flex justify-end mr-1 text-rose-900 font-bold hover:text-indigo-900"><button className="border-none text-rose-900 hover:text-indigo-900" onClick={() => detailPizza(pizza)}>Detail</button></span>
              <div className="card-body">
                <h2 className="card-title">
                  <Link href={`/admin/pizzas/${pizza.id}`}>{pizza.name}</Link>
                </h2>
                <p>${pizza.price}</p>
                <p>
                  <span className="text-muted mr-4">{isShowMore ? pizza.description : pizza.description.substring(0,40) }</span>
                  <button type="button" className="bg-zinc-200 text-indigo-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold" onClick={() => showMoreTextHandler(pizza.id)}>{isShowMore ? "Less" : "More"}</button>
                </p>
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
