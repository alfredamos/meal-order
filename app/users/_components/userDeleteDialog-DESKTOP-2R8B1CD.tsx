"use client";

import Modal from "@/components/utils/modal.util";
import { User } from "@prisma/client";
import { useState } from "react";
import DeleteUserConfirmation from "./deleteUserConfirmation";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};
export default function UserDeleteDialog({ user }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const router = useRouter();

  const removeUserHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const backToListHandler = () => {
    console.log("At point 1", { modalIsOpen });
    //router.push("/users");
    setModalIsOpen((previous) => {
      console.log(previous);
      return !previous;
    });
    console.log("At point 2", { modalIsOpen });
  };

  const userDeleteHandler = (id: string) => {
    console.log("Delete user with id : ", id);
  };

  return (
    <Modal open={modalIsOpen} onClose={removeUserHandler}>
      <DeleteUserConfirmation
        onCancel={backToListHandler}
        onDelete={userDeleteHandler}
        user={user}
      />
    </Modal>
  );
}
