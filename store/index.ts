import { configureStore } from "@reduxjs/toolkit";
import cartItemReducer from "../features/cartItemSlice";
import orderReducer from "../features/orderSlice";
import pizzaReducer from "../features/pizzaSlice";
import authReducer from "../features/authSlice"



export const store = configureStore({
  reducer: {
    auth: authReducer,
    carts : cartItemReducer,
    orders: orderReducer,
    pizzas: pizzaReducer

  }
})