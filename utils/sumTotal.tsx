import { CartItem } from "@prisma/client";

export function sumTotal(carts: CartItem[]){
  return carts?.reduce((accumulator, current) =>  accumulator += current.price * current.quantity, 0)
}