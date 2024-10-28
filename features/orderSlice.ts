import { OrderState } from "@/states/orderState";
import { OrderProduct } from "@/models/orderProduct.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: OrderState = {
  orders: [],
  customerId: "",
  ordersFromDb: [],
  order: new OrderProduct,
  totalCost: 0,
  quantities: 0
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<{order: OrderProduct}>) => {
      state.orders = state.orders.concat(action.payload.order);
    },
   
  },
});