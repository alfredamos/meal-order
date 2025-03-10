"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserDeleteDialog from "./userDeleteDialog";
import UserViewDialog from "./userViewDialog";
import { deleteUserById } from "@/actions/user.action";
import toast from "react-hot-toast";

type Props = {
  user: User;
  onDelete: (userId: string) => void;
};
export default function UserDeleteAndViewButton({ user, onDelete }: Props) {
  const router = useRouter();
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [isViewUser, setIsViewUser] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const userDeleteConfirmation = () => {
    setIsDeleteUser((previous) => !previous);
  };

  const backToListHandler = () => {
    if (isDeleteUser) setIsDeleteUser((previous) => !previous);
    if (isViewUser) setIsViewUser((previous) => !previous);
    router.refresh();
  };

  const viewUserHandler = () => {
    setIsViewUser((previous) => !previous);
  };

  const deleteUserHandler = (id: string) => {
    try {
      deleteUserById(id); //----> Delete user from the database.

      onDelete(id); //----> Update the user-table in the ui.

      toast.success("User is deleted successfully!"); //----> Show toast for successful deletion.
    } catch (error) {
      toast.error("User is deletion has failed!"); //----> Show toast for failed deletion.
    } finally {
      setIsDeleteUser((previous) => !previous);
      setRefresh(!refresh);
      router.refresh();
    }
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
      <form action={viewUserHandler}>
        <button
          type="submit"
          className="py-2 px-4 border-2 border-violet-900 hover:bg-violet-900 hover:text-indigo-100 text-violet-900 font-bold text-base rounded-lg mr-4 md:m-1"
        >
          view
        </button>
        <button
          type="button"
          className="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-rose-100 text-rose-900 font-bold text-base rounded-lg mr-4 md:m-1"
          onClick={userDeleteConfirmation}
        >
          Delete
        </button>
      </form>
    </>
  );
}
