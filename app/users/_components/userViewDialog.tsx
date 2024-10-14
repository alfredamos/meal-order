import Modal from "@/components/utils/modal.util";
import { User, Gender } from "@prisma/client";
import Image from "next/image";
import ViewUserConfirmation from "./viewUserConfirmation";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};
export default function UserViewDialog({ user }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const removeUserHandler = () => {
    setModalIsOpen((previous) => previous);
  };

  const backToListHandler = () => {
    console.log("At point 1", { modalIsOpen });
    //router.push("/users");
    setModalIsOpen((previous) => {
      console.log("At point 2", previous);
      return !previous;
    });
    console.log("At point 3", { modalIsOpen });
  };

  console.log({ modalIsOpen });

  return (
    <Modal open={!modalIsOpen} onClose={removeUserHandler}>
      <ViewUserConfirmation onCancel={backToListHandler} user={user} />
    </Modal>
  );
}
