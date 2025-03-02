"use client";

import { loginAction } from "@/actions/auth.action";
import CancelButton from "./cancelButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux"


export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch()
  const loginSubmitHandler = async (formData: FormData) => {
    try {
      const response = await loginAction(formData); //----> Login.
      console.log("In login : ", {response})
      toast.success("Login is successful!"); //----> Show toast for successful login.
    } catch (error) {
      toast.error("Login has failed!"); //----> Show toast for successful login.
    }finally{
      router.push("/");
    }
  }
  return (
    <form
      action={loginSubmitHandler}
      className="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
    >
      <h4 className="font-bold text-slate-800 text-2xl mb-6">Login Form</h4>
      <div className="mb-6 w-full px-10">
        <label
          htmlFor="email"
          className="flex flex-start w-full font-medium tracking-wide"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>
      <div className="mb-6 w-full px-10">
        <label
          htmlFor="password"
          className="flex flex-start w-full font-medium"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>
      <div className="flex justify-between w-full px-10 mb-6">
        <button
          type="submit"
          className="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold text-lg rounded-lg mr-4 w-full"
        >
          Submit
        </button>
        <CancelButton className="w-full" />
      </div>
    </form>
  );
}
