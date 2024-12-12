"use server";

import { signIn, signOut } from "@/auth";
import { authDb } from "@/db/auth.db";
import { ChangePasswordModel } from "@/models/changePassword.model";
import { EditProfileModel } from "@/models/editProfile.model";
import { LoginModel } from "@/models/login.model";
import { SignupModel } from "@/models/signup.model";
import { UserInfoModel } from "@/models/userInfo.model";
import { UserPayload } from "@/models/userPayload.model";
import { UserRoleChangeModel } from "@/models/userRoleChange.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changePasswordAction(formData: FormData) {
  //----> Get the payload.
  const { email, confirmPassword, oldPassword, newPassword } =
    Object.fromEntries(formData) as unknown as ChangePasswordModel;
  //----> Change the password and store the updated user credentials in the database.
  await authDb.changePassword({
    email,
    confirmPassword,
    oldPassword,
    newPassword,
  });

  //----> Send back the response.
  revalidatePath("/");
  return redirect("/");
}

export async function editProfileAction(formData: FormData) {
  //----> Get the edit-profile from form data.
  const { address, name, email, phone, image, gender, password } =
    Object.fromEntries(formData) as unknown as EditProfileModel;
  //----> edit user profile and store it in the database.
  console.log({address, name, email, phone, image, gender, password});
  
  await authDb.editProfile({
    address,
    name,
    email,
    phone,
    image,
    gender,
    password,
  });

  //----> Send back the response.
  revalidatePath("/");
  return redirect("/");
}

export async function loginAction(formData: FormData) {
  //----> Get the user credentials from the request.
  const loginCredentials = Object.fromEntries(
    formData
  ) as unknown as LoginModel;
  //----> Destructure formData.
  const { email, password } = loginCredentials;
  //----> Login the user in.
  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  //----> Send back the response.
  revalidatePath("/");
  return redirect("/");
}

export async function logoutAction() {
  console.log("logout action clicked!!!");
  await signOut({ redirectTo: "/auth/login" });
}

export async function signupAction(formData: FormData) {
  //----> Get the user credentials from the request.
  const {
    address,
    name,
    email,
    phone,
    image,
    confirmPassword,
    password,
    gender,
  } = Object.fromEntries(formData) as unknown as SignupModel;

  //----> Store the new user credentials in the database.
  await authDb.signup({
    address,
    name,
    email,
    phone,
    image,
    gender,
    confirmPassword,
    password,
  });

  //----> Send back the response.
  revalidatePath("/users");
  return redirect("/auth/login");
}

export async function currentUserAction(id: string) {
  //----> Get the current user from the database.
  const userCurrent = await authDb.currentUser(id);

  //----> Send back the response.
  return userCurrent;
}

export async function updateUserRoleAction(
  userInfo: UserInfoModel,
  userRoleChangeModel: UserRoleChangeModel
) {
  //----> Get the email and user details of person to be made admin.
  const { email, role } = userRoleChangeModel;

  //----> Change the user role and store the new credentials in the database.
  const userCredentials = await authDb.updateUserRole(userInfo, email, role);

  //----> Send back the response.
  return userCredentials;
}
