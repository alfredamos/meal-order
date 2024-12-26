import { AllState } from "@/states/allState";
import { useSelector } from "react-redux";

export function usePizza(){
<<<<<<< HEAD
  return useSelector((state: AllState) => state.pizza)
=======
  return useSelector((state: AllState) => state.pizzaState)
>>>>>>> 4a9352fb424501ac5b0468491a6843f959db890f
}