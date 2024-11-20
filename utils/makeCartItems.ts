import { CartItem, Pizza } from "@prisma/client";
import { findCartItem } from "./findCartItem";
import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "@reduxjs/toolkit";
import { createCartItem, editCartItem } from "@/features/cartItemSlice";
import { store } from "@/store";

const initialCart: CartItem = {
  id: "",
  name: "",
  price: 0,
  quantity: 0,
  pizzaId: "",
  orderId: "",
};

export function makeCartItems(
  pizza: Pizza,
  carts: CartItem[],
  dispatch: Dispatch
) {
  const cart = findCartItem(pizza, carts)!;

  let cartItem: CartItem;
  let allCartItems: CartItem[] = [];
  let cartItems: CartItem[] = [...carts];

  if (!!cart) {
    let quantity = Number(cart.quantity);
    cartItem = { ...cart, quantity: quantity + 1 };
    const newCartItems = cartItems?.filter((carti) =>
      carti.id !== cart.id ? cartItem : carti
    );
    dispatch(editCartItem({ cartItem }));

    allCartItems = [...newCartItems, cartItem];

    localStorage.removeItem("carts");

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

    localStorage.removeItem("carts");

    storeCartItems();
  }
  
  return { cartItems: allCartItems };
}

function storeCartItems() {
  localStorage.removeItem("carts");

  const cartItems = store.getState()?.cartState?.cartItems;

  localStorage.setItem("carts", JSON.stringify(cartItems));
}
