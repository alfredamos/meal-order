"use client";

import { AllState } from "@/states/allState";
import { CartItemState } from "@/states/cartItemState";
import { CartItem } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { LocalStorageService } from "../app/services/localStorage.service";

const localStorageService = new LocalStorageService<CartItem[]>();

const defaultValue = () => localStorageService.getLocalStorage("carts") as CartItem[];

const initialState: CartItemState = {
  cartItems: defaultValue() ?? [],
  customerId: "",
};

export const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    createCartItem: (state, action: PayloadAction<{ cartItem: CartItem }>) => {
      state.cartItems.push(action.payload.cartItem);
    },
    deleteCartItem: (state, action: PayloadAction<{ cartItemId: string }>) => {
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.cartItemId
      );
      state.cartItems.splice(index, 1);
    },
    editCartItem: (state, action: PayloadAction<{ cartItem: CartItem }>) => {
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.cartItem.id
      );
      state.cartItems[index] = action.payload.cartItem;
    },
    emptyCartItem: (state) => {
      state.cartItems = [];
    },
  },
});

export const { createCartItem, deleteCartItem, editCartItem, emptyCartItem } =
  cartItemSlice.actions;
export default cartItemSlice.reducer;

export const useCart = () => useSelector((state: AllState) => state.cartState);
