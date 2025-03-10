"use client";

import { signupAction } from "@/actions/auth.action";
import CancelButton from "./cancelButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createUser } from "@/features/userSlice";
import { User } from "@prisma/client";

export default function MemberForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const signupSubmitHandler = async (formData: FormData) => {
    try {
      const newUser = await signupAction(formData); //----> signup.

      dispatch(createUser({ user: newUser as User })); //----> Update the user-list in the UI.

      toast.success("Signup is successful!"); //----> Show toast for successful signup.
    } catch (error) {
      toast.error("Signup is not successful!"); //----> Show toast for failed signup.
    } finally {
      router.push("/");
    }
  };

  return (
    <form
      action={signupSubmitHandler}
      className="bg-white text-slate-800 max-w-lg mx-auto rounded-xl shadow-2xl py-10 px-2 mt-10"
    >
      <h4 className="font-bold text-slate-800 text-2xl mb-6 flex justify-center items-center">
        Signup Form
      </h4>
      <div className="grid grid-cols-2 gap px-8">
        <div className="mb-6 px-2">
          <label htmlFor="name" className="flex flex-start w-full font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 p-2 rounded-lg text-black w-full"
          />
        </div>
        <div className="mb-6 px-2">
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

        <div className="mb-6 px-2">
          <label
            htmlFor="phone"
            className="flex flex-start w-full font-medium tracking-wide"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>
        <div className="mb-6 px-2">
          <label
            htmlFor="image"
            className="flex flex-start w-full font-medium tracking-wide"
          >
            Image
          </label>
          <input
            id="image"
            name="image"
            type="text"
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>

        <div className="mb-6 px-2">
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
        <div className="mb-5 px-2">
          <label
            htmlFor="confirmPassword"
            className="flex flex-start w-full font-medium"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>
      </div>

      <div className="mb-6 w-full px-10">
        <label htmlFor="gender" className="flex flex-start w-full font-medium">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        >
          <option>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="mb-6 w-full px-10">
        <label htmlFor="address" className="flex flex-start w-full font-medium">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        ></textarea>
      </div>

      <div className="flex justify-between w-full px-10">
        <button
          type="submit"
          className="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold text-lg rounded-lg mr-4 mx-1 w-full"
        >
          Submit
        </button>
        <CancelButton className="w-full" />
      </div>
    </form>
  );
}
