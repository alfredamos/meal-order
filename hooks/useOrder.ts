import { AllState } from "@/states/allState";
import { useSelector } from "react-redux";

export function useOrder() {
  return useSelector((state: AllState) => state.order);
}
