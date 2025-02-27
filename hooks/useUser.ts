import { AllState } from "@/states/allState";
import { useSelector } from "react-redux";

export function useUser() {
  return useSelector((state: AllState) => state?.userState?.users);
}
