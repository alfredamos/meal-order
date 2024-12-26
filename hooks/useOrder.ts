import { AllState } from "@/states/allState";
import { useSelector } from "react-redux";

export function useOrder() {
<<<<<<< HEAD
  return useSelector((state: AllState) => state.order);
=======
  return useSelector((state: AllState) => state.orderState.orders);
>>>>>>> 4a9352fb424501ac5b0468491a6843f959db890f
}
