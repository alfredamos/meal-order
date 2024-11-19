import { AllState } from "@/states/allState";
import { CartItemState } from "@/states/cartItemState";
import { CartItem } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState: CartItemState = {
  cartItems: [],
  customerId: ""
};

export const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    createCartItem: (state, action: PayloadAction<{ cartItem: CartItem }>) => {
      
      console.log("In create-cart-item, action : ", action.payload.cartItem)
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
  },
});

export const { createCartItem, deleteCartItem, editCartItem } = cartItemSlice.actions;
export default cartItemSlice.reducer;

export const useCart= () =>useSelector((state: AllState) => state.cartState);
