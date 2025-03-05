"use client";

import PizzaAddToCartConfirmation from "@/app/admin/pizzas/_components/pizzaAddCartConfirmation";
import Modal from "@/components/utils/modal.util";
//import Modal from "@/utils/modal";
import { CartItem } from "@prisma/client";

type Props = {
  carts: CartItem[];
  isAddToCart: boolean;
  addToCart: (cartItems: CartItem[]) => void;
  backToList: () => void;
  decreaseQuantity: (cart: CartItem) => void;
  increaseQuantity: (cart: CartItem) => void;
};

export default function AddPizzaItem({
  addToCart,
  backToList,
  isAddToCart,
  carts,
  decreaseQuantity, increaseQuantity
}: Props) {
  return (
    <Modal open={isAddToCart} onClose={backToList}>
      <PizzaAddToCartConfirmation
        addToCart={addToCart}
        backToPizza={backToList}
        carts={carts}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
      />
      
    </Modal>
  );
}
