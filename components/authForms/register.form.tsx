import { signupAction } from "@/actions/auth.action";
import { SignupModel } from "@/models/signup.model";
import CancelButton from "./cancelButton";
import { Address } from '@prisma/client';

type Props = {
  user: Omit<SignupModel, "gender">;
};
export default function RegisterForm({ user }: Props) {
  return (
    <form
      action={signupAction}
      className="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
    >
      <h4 className="font-bold text-slate-800 text-2xl mb-6">Signup Form</h4>
      <div className="flex">
        <div className="mb-6 flex-1 px-10">
          <label htmlFor="name" className="flex flex-start w-full font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="border-2 bg-slate-200 p-2 rounded-lg text-black w-full"
          />
        </div>
        <div className="mb-6 flex-1 px-10">
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
            className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>
      </div>
      <div className="flex">
        <div className="mb-6 flex-1 px-10">
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
            className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>
        <div className="mb-6 flex-1 px-10">
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
            className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>
      </div>
      <div className="flex">
        <div className="mb-6 px-10 flex-1">
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
            className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>
        <div className="mb-5 flex-1 px-10">
          <label
            htmlFor="confirmPassword"
            className="flex flex-start w-full font-medium"
          >
            Confirm Password
          </label>
          <input
            id="password"
            name="confirmPassword"
            type="password"
            className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
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
          className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
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
          className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
        ></textarea>
      </div>

      <div className="flex justify-between w-full px-10">
        <button
          type="submit"
          className="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold text-lg rounded-lg mr-4 w-full"
        >
          Submit
        </button>
        <CancelButton />
      </div>
    </form>
  );
}