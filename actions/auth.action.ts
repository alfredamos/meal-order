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
  const {email, confirmPassword, oldPassword, newPassword} = Object.fromEntries(formData) as unknown as ChangePasswordModel;
  //----> Change the password and store the updated user credentials in the database.
  await authDb.changePassword({email, confirmPassword, oldPassword, newPassword});

  //----> Send back the response.
  revalidatePath("/");
  return redirect("/");
}

export async function deleteAllUserAddressesByUserIdAction(prevState: {
  userId: string;
}) {
  const { userId } = prevState;
  //----> Delete the user and all the addresses.
  await authDb.deleteAllUserAddressesByUserId(userId);
  //----> Send back the response.
  revalidatePath("/users");
  return redirect("/users");
}

export async function deleteOneAddressByUserIdAction(prevState: {
  addressId: string;
  userId: string;
}) {
  //----> Destructure the address id and user id.
  const { addressId, userId } = prevState;
  //----> delete one address from database.
  await authDb.deleteOneAddressByUserId(
    addressId,
    userId
  );
  //----> Send back the response.
  revalidatePath("/");
  return redirect("/");
}

export async function editAllAddressesByUserIdAction(
  prevState: { userId: string },
  userPayload: UserPayload
) {
  const { userId } = prevState; //----> Get the user id from params.

  //----> edit all addresses by user id
  const { editedUser, updatedAddresses } =
    await authDb.editAllAddressesByUserId(userId, userPayload);

  //----> Send back the response.
  revalidatePath("/users");
  return redirect("/users");
}

export async function editOneAddressByUserIdAction(
  prevState: { addressId: string; userId: string },
  userPayload: UserPayload
) {
  //----> Destructure the address id and user id;
  const { addressId, userId } = prevState;
  //----> Edit one address by userId and addressId.
   await authDb.editOneAddressByUserId(
    addressId,
    userId,
    userPayload
  );

  //----> Send back the response.
  revalidatePath("/");
  return redirect("/");
}

export async function editProfileAction(formData: FormData) { 
  //----> Get the edit-profile from form data.
  const {name, email, phone, image, gender, password} = Object.fromEntries(
    formData
  ) as unknown as EditProfileModel;
  //----> edit user profile and store it in the database.
  await authDb.editProfile({name, email, phone, image, gender, password});

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
  console.log({ email, password });
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
  console.log("logout action clicked!!!")
  await signOut({redirectTo: "/auth/login"});
}

export async function signupAction(formData: FormData) {
  //----> Get the user credentials from the request.
  const credentialsOfUser = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    confirmPassword: formData.get("confirmPassword"),
    password: formData.get("password"),
  } as SignupModel;

  console.log({ credentialsOfUser });
  //----> Store the new user credentials in the database.
  await authDb.signup(credentialsOfUser);

  //----> Send back the response.
  revalidatePath("/users");
  return redirect("/auth/login");
}

export async function signupWithMultipleAddressAction(formData: FormData) {
  //----> Get the user credentials
  const userPayload = Object.fromEntries(formData) as unknown as UserPayload;

  //----> Store the new user credentials in the database.
  await authDb.signupWithMultipleAddresses(userPayload);

  //----> Send back the response.
  revalidatePath("/users");
  return redirect("/users");
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
