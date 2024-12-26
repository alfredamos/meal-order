"use client";

import { changePasswordAction } from "@/actions/auth.action";
import { ChangePasswordModel } from "@/models/changePassword.model";
import CancelButton from "./cancelButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  user: ChangePasswordModel;
};
export default function ChangePasswordForm({ user }: Props) {
  const router = useRouter();
  
  const changePasswordSubmitHandler = async (formData: FormData) => {
    try {
      await changePasswordAction(formData); //----> Change password in the database.
      toast.success("Password has been changed successfully!"); //----> Show toast for successful change of password.
    } catch (error) {
      toast.error("Password change failed!"); //----> Show toast for failed change of password.
    }finally{
      router.back();
    }
  }
  return (
    <form
      action={changePasswordSubmitHandler}
      className="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
    >
      <h4 className="font-bold text-slate-800 text-2xl mb-6">
        Change Password Form
      </h4>
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
          defaultValue={user.email}
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>
      <div className="mb-6 w-full px-10">
        <label
          htmlFor="oldPassword"
          className="flex flex-start w-full font-medium"
        >
          Old Password
        </label>
        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          defaultValue=""
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>
      <div className="mb-6 w-full px-10">
        <label
          htmlFor="newPassword"
          className="flex flex-start w-full font-medium"
        >
          New Password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          defaultValue=""
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>
      <div className="mb-6 w-full px-10">
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
          defaultValue=""
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>
      <div className="flex justify-between w-full px-10">
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
