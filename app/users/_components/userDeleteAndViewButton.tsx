"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserDeleteDialog from "./userDeleteDialog";
import UserViewDialog from "./userViewDialog";

type Props = {
  user: User;
}
export default function UserDeleteAndViewButton({user}: Props) {
  const router = useRouter();
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [isViewUser, setIsViewUser] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const userDeleteConfirmation = () => {
    setIsDeleteUser((previous) => !previous);
  };

  const backToListHandler = () => {
    console.log("At point 1", { isDeleteUser });
    if (isDeleteUser) setIsDeleteUser((previous) => !previous);
    if (isViewUser) setIsViewUser((previous) => !previous);
    router.refresh();
  };

  const viewUserHandler = () => {
    setIsViewUser((previous) => !previous);
  };

  const deleteUserHandler = (id: string) => {
    console.log("user info deleted : ", id);

    fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data : ", data);
      })
      .catch((error) => {
        console.log("error : ", error);
      })
      .finally(() => {
        setIsDeleteUser((previous) => !previous);
        setRefresh(!refresh);
        router.refresh();
      });
    router.refresh();
  };

  return (
    <>
      {isDeleteUser && user && (
        <UserDeleteDialog
          isDelete={isDeleteUser}
          user={user}
          backToList={backToListHandler}
          onDelete={() => deleteUserHandler(user?.id)}
        />
      )}
      {isViewUser && user && (
        <UserViewDialog
          user={user}
          onCancel={backToListHandler}
          isView={isViewUser}
        />
      )}
      <button
        type="submit"
        className="py-2 px-4 border-2 border-violet-900 hover:bg-violet-900 hover:text-indigo-100 text-violet-900 font-bold text-base rounded-lg mr-6 md:m-1"
        onClick={viewUserHandler}
      >
        view
      </button>
      <button
        type="submit"
        className="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-rose-100 text-rose-900 font-bold text-base rounded-lg mr-4"
        onClick={userDeleteConfirmation}
      >
        Delete
      </button>
    </>
  );
}