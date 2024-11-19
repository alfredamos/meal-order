import { CartItem, Pizza } from "@prisma/client";

export function findCartItem(pizza: Pizza, carts: CartItem[]){

  return carts?.find(cartItem => cartItem.pizzaId === pizza.id)
  
  
}