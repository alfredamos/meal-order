import { AllState } from "@/states/allState";
import { useSelector } from "react-redux";

export function useCart(){
  return useSelector((state: AllState) => state.cartState)
}