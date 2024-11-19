"use client";

import Modal from "@/components/utils/modal.util";
//import Modal from "@/utils/modal";
import { CartItem } from "@prisma/client";
import PizzaAddToCartConfirmation from "../pizzaAddCartConfirmation";

type Props = {
  carts: CartItem[];
  isAddToCart: boolean;
  addToCart: (cartItems: CartItem[]) => void;
  backToList: () => void;
};

export default function AddPizzaItem({
  addToCart,
  backToList,
  isAddToCart,
  carts,
}: Props) {
  return (
    <Modal open={isAddToCart} onClose={backToList}>
      <PizzaAddToCartConfirmation
        addToCart={addToCart}
        backToPizza={backToList}
        carts={carts}
      />
      
    </Modal>
  );
}
