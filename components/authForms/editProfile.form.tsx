import { editProfileAction } from "@/actions/auth.action";
import { EditProfileModel } from "@/models/editProfile.model";
import CancelButton from "./cancelButton";

type Props = {
  user: EditProfileModel;
};
export default function EditProfileForm({ user }: Props) {
  return (
    <form
      action={editProfileAction}
      className="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
    >
      <h4 className="font-bold text-slate-800 text-2xl mb-6">
        Edit Profile Form
      </h4>
      <div className="mb-6 w-full px-10">
        <label htmlFor="name" className="flex flex-start w-full font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={user.name}
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 p-2 rounded-lg text-black w-full"
        />
      </div>
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
          htmlFor="phone"
          className="flex flex-start w-full font-medium tracking-wide"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={user.phone}
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>
      <div className="mb-6 w-full px-10">
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
          defaultValue={user.image}
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
          defaultValue=""
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>
      <div className="mb-6 w-full px-10">
        <label htmlFor="gender" className="flex flex-start w-full font-medium">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          defaultValue={user.gender}
          className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        >
          <option>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
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
