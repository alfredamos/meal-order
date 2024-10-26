import { editProfileAction } from "@/actions/auth.action";
import { EditProfileModel } from "@/models/editProfile.model";
import CancelButton from "./cancelButton";
import UserForm from "../users/userForm";

type Props = {
  user: EditProfileModel;
};
export default function ProfileEditForm({ user }: Props) {
  return (
    <form
      action={editProfileAction}
      className="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
    >
      <UserForm formName="Edit Profile Form" user={user}>
        <CancelButton className="flex-1" />
      </UserForm>
    </form>
  );
}
