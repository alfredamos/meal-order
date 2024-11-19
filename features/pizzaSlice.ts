import { AllState } from "@/states/allState";
import { PizzaState } from "@/states/pizzaState";
import { Pizza } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState: PizzaState = {
  pizzas: [],
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    createPizza: (state, action: PayloadAction<{pizza: Pizza}>) => {
      state.pizzas = state.pizzas.concat(action.payload.pizza);
    },
    deletePizza: (state, action: PayloadAction<{pizzaId: string}>) => {
      const index = state.pizzas.findIndex((pizza) => pizza.id === action.payload.pizzaId);
      state.pizzas.splice(index, 1);
    },
    editPizza: (state, action: PayloadAction<{pizza: Pizza}>) => {
      const index = state.pizzas.findIndex((pizza) => pizza.id === action.payload.pizza.id);
      state.pizzas[index] = action.payload.pizza;
    },
  },
});

export const { createPizza, deletePizza, editPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;


export const usePizza = () => useSelector((state: AllState) => state.pizzaState);