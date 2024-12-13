import { AllState } from "@/states/allState";
import { useSelector } from "react-redux";

export function usePizza(){
  return useSelector((state: AllState) => state.pizzaState)
}