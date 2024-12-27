"use client";

import { logoutAction } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutForm() {

  const router = useRouter();

  const logoutSubmitHandler = async () => {
    try {
      await logoutAction(); //----> Logout.
      toast.success("Logout is successful!"); //----> Show toast for successful logout.
    } catch (error) {
      toast.error("Logout has failed!"); //----> Show toast for failed logout.
    }finally{
      router.push("/")
    }
  }

  return (
    <form
      action={logoutSubmitHandler}
      className="flex justify-center items-center bg-white text-black"
    >
      <button type="submit">Log out</button>
    </form>
  );
}
