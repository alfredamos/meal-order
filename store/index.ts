import { configureStore } from "@reduxjs/toolkit";
import cartItemReducer from "../features/cartItemSlice";
import orderReducer from "../features/orderSlice";
import pizzaReducer from "../features/pizzaSlice";

export const store = configureStore({
  reducer: {
    cartState: cartItemReducer,
    orderState: orderReducer,
    pizzaState: pizzaReducer,
  },
});
