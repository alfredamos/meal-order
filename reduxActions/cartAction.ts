import { CartItem } from "@prisma/client";
import { PayloadAction } from "@reduxjs/toolkit";

export class CartAction{
  constructor(public action: CartItem | string){}
}