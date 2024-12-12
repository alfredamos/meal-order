import { OrderState } from "@/states/orderState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllState } from "@/states/allState";
import { useSelector } from "react-redux";
import { OrderModel } from "@/models/orderModel";
import { OrderModelDatesString } from "@/models/orderModeldatesString.model";

const initialState: OrderState = {
  orders: [],
 
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<{order: OrderModelDatesString}>) => {
      state.orders = state.orders.concat(action.payload.order);
    },
   
    editOrder: (state, action: PayloadAction<{order: OrderModelDatesString}>) => {
      const findIndex = state.orders.findIndex(order => order.id === action.payload.order.id)
      state.orders[findIndex] = action.payload.order;
    },
    updateOrders: (state, action:PayloadAction<{orders: OrderModelDatesString[]}>) => {
        state.orders = [...action.payload.orders]
    },
    deleteOrder: (state, action: PayloadAction<{order: OrderModel}>) => {
      state.orders.filter(
        (order) => order.id === action.payload.order.id
      );
    },
   
  },
});

export const { createOrder, deleteOrder, editOrder, updateOrders } =
  orderSlice.actions;
export default orderSlice.reducer;

export const useOrder = () => useSelector((state: AllState) => state.orderState);