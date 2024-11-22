import { CartItem, Pizza } from "@prisma/client";
import { findCartItem } from "./findCartItem";
import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "@reduxjs/toolkit";
import { createCartItem, editCartItem } from "@/features/cartItemSlice";

export function makeCartItems(
  pizza: Pizza,
  carts: CartItem[],
  dispatch: Dispatch
) {
  const cart = findCartItem(pizza, carts)!;

  let cartItem: CartItem;
  let allCartItems: CartItem[] = [];
  let cartItems: CartItem[] = [...carts];

  if (cart?.quantity > 0) {
    let quantity = Number(cart.quantity);
    cartItem = { ...cart, quantity: quantity + 1 };
    const newCartItems = cartItems?.filter((carte) =>
      carte?.id !== cart?.id ? cartItem : carte
    );
    dispatch(editCartItem({ cartItem }));

    allCartItems = [...newCartItems, cartItem];

    //localStorage.removeItem("carts");

    return { cartItems: allCartItems };
  } else if (!cart) {
    cartItem = {
      id: uuidv4(),
      name: pizza.name,
      price: pizza.price,
      quantity: 1,
      pizzaId: pizza.id,
      orderId: "",
    };

    dispatch(createCartItem({ cartItem }));

    allCartItems = [...cartItems, cartItem];

 //   localStorage.removeItem("carts");
  }

  return { cartItems: allCartItems };
}
