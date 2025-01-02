import {
  createCartItem,
  deleteCartItem,
  editCartItem,
} from "@/features/cartItemSlice";
import { CartItem, Pizza } from "@prisma/client";
import { Dispatch } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export class CartUtil {
  static increaseQuantity = (cart: CartItem, dispatch: Dispatch) => {
    const newCart = {
      ...cart,
      quantity: cart.quantity >= 20 ? 20 : cart.quantity + 1,
    };

    dispatch(editCartItem({ cartItem: newCart }));

    toast.success("Cart item is increased!"); //----> Show toast for increased item.

    return newCart; //----> Cart with increase quantity.
  };

  static decreaseQuantity = (cart: CartItem, dispatch: Dispatch) => {
    const newCart = {
      ...cart,
      quantity: cart.quantity <= 1 ? 1 : cart.quantity - 1,
    };
    if (cart?.quantity === 0) dispatch(deleteCartItem({ cartItemId: cart.id }));
    if (cart?.quantity > 0) dispatch(editCartItem({ cartItem: newCart }));

    toast.success("Cart item is decreased!"); //----> Show toast for decreased item.

    return newCart; //----> Cart with decreased quantity
  };

  static removePizza = (cart: CartItem, dispatch: Dispatch) => {
    dispatch(deleteCartItem({ cartItemId: cart.id }));

    toast.success("Cart item is removed successfully!"); //----> Show toast for removed item.
  };

  static makeCartItems = (
    pizza: Pizza,
    carts: CartItem[],
    dispatch: Dispatch
  ) => {
    const cart = this.findCartItem(pizza, carts)!;

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

      return { cartItems: allCartItems };
    } else if (!cart) {
      cartItem = {
        id: uuidv4(),
        name: pizza.name,
        price: pizza.price,
        quantity: 1,
        pizzaId: pizza.id,
        image: pizza.image,
        orderId: "",
      };

      dispatch(createCartItem({ cartItem }));

      allCartItems = [...cartItems, cartItem];
    }

    return { cartItems: allCartItems };
  };

  private static findCartItem(pizza: Pizza, carts: CartItem[]) {
    return carts?.find((cartItem) => cartItem?.pizzaId === pizza.id);
  }
}
