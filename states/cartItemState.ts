import { CartItem } from "@prisma/client";

export class CartItemState{
  cartItems: CartItem[] = [];
  customerId: string = "";
}