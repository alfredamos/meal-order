import { CartItemState } from "@/states/cartItemState";
import { CartItem } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartItemState = {
  cartItems: [],
  customerId: ""
};

export const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    createCartItem: (state, action: PayloadAction<{ cartItem: CartItem }>) => {
      state.cartItems = state.cartItems.concat(action.payload.cartItem);
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
