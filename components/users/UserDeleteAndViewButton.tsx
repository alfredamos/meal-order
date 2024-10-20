"use client";

import UserDeleteDialog from "@/app/users/_components/userDeleteDialog";
import UserViewDialog from "@/app/users/_components/userViewDialog";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

type Props = {
  user: User;
};

export default function UserDeleteAndViewButton({ user }: Props) {
  const router = useRouter();
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [isViewUser, setIsViewUser] = useState(false);

  const userDeleteConfirmation = () => {
    setIsDeleteUser((previous) => !previous);
    //router.push(`/users/${user?.id}/delete`);
  };

  const viewUser = () => {
    setIsViewUser((previous) => !previous);
    /* const url = `/users/${user?.id}/detail`;
    console.log({ message: "in view-user", user: user?.id, url });
    router.push(`/users/${user?.id}/detail`); */
  };

  return (
    <>
      {isDeleteUser && user && <UserDeleteDialog user={user} />}
      {isViewUser && user && <UserViewDialog user={user} />}
      {/* <button
        type="button"
        className="py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-900 hover:text-white text-indigo-100 m-2 uppercase font-semibold"
        onClick={viewUser}
      >
        View
      </button>
      <button
        type="button"
        className="py-2 px-4 rounded-lg bg-red-500 hover:bg-red-900 hover:text-white text-red-100 m-2 uppercase font-semibold"
        onClick={userDeleteConfirmation}
      >
        Delete
      </button> */}
      <button
        type="submit"
        className="py-2 px-4 border-2 border-violet-900 hover:bg-violet-900 hover:text-indigo-100 text-violet-900 font-bold text-base rounded-lg mr-4"
      >
        view
      </button>
      <button
        type="submit"
        className="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-rose-100 text-rose-900 font-bold text-base rounded-lg mr-4"
      >
        Delete
      </button>
    </>
  );
}
