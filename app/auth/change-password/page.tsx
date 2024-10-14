import { currentUserAction } from "@/actions/auth.action";
import { auth } from "@/auth";
import ChangePasswordForm from "@/components/authForms/changePassword.form"
import { ChangePasswordModel } from "@/models/changePassword.model"
import { redirect } from "next/navigation";

const initialUser: ChangePasswordModel = {
  email: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
}


async function ChangePasswordPage() {
  //----> Check if the user is logged in.
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");
  //----> Get the current user from the database.
  const userCurrent = await currentUserAction(session.user.id);
  const user = {...initialUser, email: userCurrent.email}
  
  return <ChangePasswordForm user={user} />;
}
export default ChangePasswordPage