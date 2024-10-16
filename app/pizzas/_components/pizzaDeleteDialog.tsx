"use client";

import DeletePizzaConfirmation from "@/app/pizzas/_components/deletePizzaConfirmation";
import Modal from "@/components/utils/modal.util";
import { Pizza } from "@prisma/client";

type Props = {
  isDelete: boolean;
  pizza: Pizza;
  backToList: () => void;
  onDelete: (id: string) => void;
};
export default function PizzaDeleteDialog({ backToList, pizza, isDelete, onDelete }: Props) {
 

  return (
    <Modal open={isDelete} onClose={backToList}>
      <DeletePizzaConfirmation
        onCancel={backToList}
        onDelete={onDelete}
        pizza={pizza}
      />
    </Modal>
  );
}
