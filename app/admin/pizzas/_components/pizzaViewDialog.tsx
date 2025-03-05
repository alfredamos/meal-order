"use client";

import { Pizza } from "@prisma/client";
import Modal from "@/components/utils/modal.util";
import PizzaCardView from "./pizzaCardView";

type Props = {
  pizza: Pizza;
  onCancel: () => void;
  isView: boolean;
};
export default function PizzaViewDialog({ isView, pizza, onCancel }: Props) {
  
  return (
    <Modal open={isView} onClose={onCancel}>
      <PizzaCardView onCancel={onCancel} pizza={pizza} />
    </Modal>
  );
}
