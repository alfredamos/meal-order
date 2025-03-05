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
    //router.push("/users");
    setModalIsOpen((previous) => {
      return !previous;
    });
  };

  const userDeleteHandler = (id: string) => {
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
