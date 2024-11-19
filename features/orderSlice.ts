import { OrderState } from "@/states/orderState";
import { OrderProduct } from "@/models/orderProduct.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllState } from "@/states/allState";
import { useSelector } from "react-redux";

const initialState: OrderState = {
  orders: [],
 
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<{order: OrderProduct}>) => {
      state.orders = state.orders.concat(action.payload.order);
    },
   
    editOrder: (state, action: PayloadAction<{order: OrderProduct}>) => {
      const findIndex = state.orders.findIndex(order => order.order.id === action.payload.order.order.id)
      state.orders[findIndex] = action.payload.order;
    },
    deleteOrder: (state, action: PayloadAction<{order: OrderProduct}>) => {
      state.orders.filter(
        (order) => order.order.id === action.payload.order.order.id
      );
    },
   
  },
});

export const { createOrder, deleteOrder, editOrder } =
  orderSlice.actions;
export default orderSlice.reducer;

export const useOrder = () => useSelector((state: AllState) => state.orderState);