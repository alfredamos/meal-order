"use client";

import { Pizza } from "@prisma/client";
import DeletePizzaConfirmation from "./deletePizzaConfirmation";
import Modal from "@/components/utils/modal.util";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  pizza: Pizza;
  onCancel: () => void;
}
export default function PizzaViewDialog({pizza}: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const removePizzaHandler = () => {
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
    <Modal open={!modalIsOpen} onClose={removePizzaHandler}>
      <DeletePizzaConfirmation onCancel={backToListHandler} onDelete={removePizzaHandler}  pizza={pizza} />
    </Modal>
  );
}