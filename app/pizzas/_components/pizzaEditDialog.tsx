import Modal from "@/components/utils/modal.util";
import { Pizza } from "@prisma/client";
import PizzaEditCard from "./pizzaEditCard";

type Props = {
  isEdit: boolean;
  pizza: Pizza;
  onCancel: () => void;
  onEdit: (pizza: Pizza) => void;
};
export default function PizzaEditDialog({
  pizza,
  onCancel,
  onEdit,
  isEdit,
}: Props) {
  return (
    <Modal open={isEdit} onClose={onCancel}>
      <PizzaEditCard
        onCancel={onCancel}
        pizza={pizza}
        onEdit={onEdit}
        formName="Edit"
      />
    </Modal>
  );
}
