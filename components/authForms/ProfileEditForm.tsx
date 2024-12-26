"use client";

import { editProfileAction } from "@/actions/auth.action";
import { EditProfileModel } from "@/models/editProfile.model";
import CancelButton from "./cancelButton";
import UserForm from "../users/userForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  user: EditProfileModel;
};
export default function ProfileEditForm({ user }: Props) {
  const router = useRouter();

  const editProfileSubmitHandler = async (formData: FormData) => {
    try {
      await editProfileAction(formData); //----> Save the edited profile in the database.
      toast.success("Profile has been edited successfully!"); //----> Show toast for successful edit of profile.
    } catch (error) {
      toast.error("Profile edit has failed!"); //----> Show toast for successful edit of profile.
    } finally {
      router.back();
    }
  };

  return (
    <form
      action={editProfileSubmitHandler}
      className="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
    >
      <UserForm formName="Edit Profile Form" user={user}>
        <CancelButton className="flex-1" />
      </UserForm>
    </form>
  );
}
