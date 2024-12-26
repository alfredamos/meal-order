import { AllState } from "@/states/allState";
import { useSelector } from "react-redux";

export function useUser() {
<<<<<<< HEAD
  return useSelector((state: AllState) => state.user);
=======
  return useSelector((state: AllState) => state.userState);
>>>>>>> 4a9352fb424501ac5b0468491a6843f959db890f
}
