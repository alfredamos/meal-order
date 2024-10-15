"use client";

import DeletePizzaConfirmation from "@/app/pizzas/_components/deletePizzaConfirmation";
import Modal from "@/components/utils/modal.util";
import { Pizza } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  pizza: Pizza;
}
export default function PizzaDeleteDialog({pizza}: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const removePizzaHandler = () => {
    setModalIsOpen((previous) => previous);
  };

  const backToListHandler = () => {
    console.log("At point 1", { modalIsOpen });
    //router.push("/pizzas");
    setModalIsOpen((previous) => {
      console.log("At point 2", previous);
      return !previous;
    });
    console.log("At point 3", { modalIsOpen });
  };

  const pizzaDeleteHandler = (id: string) => {
    console.log("Delete pizza with id : ", id);
  };

  console.log({ modalIsOpen });

  return (
    <Modal open={!modalIsOpen} onClose={removePizzaHandler}>
      <DeletePizzaConfirmation
        onCancel={backToListHandler}
        onDelete={pizzaDeleteHandler}
        pizza={pizza}
      />
    </Modal>
  );
}