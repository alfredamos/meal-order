import { AllState } from "@/states/allState";
import { useSelector } from "react-redux";

export function useAuth(){
  useSelector((state: AllState) => state.authState)
}