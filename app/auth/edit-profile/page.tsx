import { currentUserAction } from "@/actions/auth.action";
import { auth } from "@/auth";
import ProfileEditForm from "@/components/authForms/ProfileEditForm";
import { EditProfileModel } from "@/models/editProfile.model";
import { UserDetailModel } from "@/models/userDetail.model";
import { Gender, Role, User } from "@prisma/client";
import { redirect } from "next/navigation";

const userDetail: UserDetailModel = {
  name: "",
  id: "",
  email: "",
  phone: "",
  password: "",
  gender: Gender.Male,
  role: Role.User,
};

async function EditProfilePage() {
  //----> Check if the user is logged in.
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");
  //----> Get the current user from the database.
  const userCurrent = await currentUserAction(session.user.id);
  //----> Get the user info.
  const userInfo = { ...userCurrent, password: "" } as EditProfileModel;

  return <ProfileEditForm user={userInfo} />;
}
export default EditProfilePage;
