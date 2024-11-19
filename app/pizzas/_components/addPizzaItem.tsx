"use client";

import Modal from "@/components/utils/modal.util";
//import Modal from "@/utils/modal";
import { CartItem } from "@prisma/client";

type Props = {
  carts: CartItem[];
  isAddToCart: boolean;
  backToList: () => void;
};

export default function AddPizzaItem({
  backToList,
  isAddToCart,
  carts,
}: Props) {
  return (
    <Modal open={isAddToCart} onClose={backToList}>
      <div className="bg-white p-12 max-width-auto text-black rounded-2xl shadow-2xl w-1/4">
        {!!carts &&
          carts?.map((cart) => {
            return (
              <div
                className="flex gap-2 justify-between items-center"
                key={cart.pizzaId}
              >
                <span className="tex-start">{cart.name}</span>
                <span className="text-center">{cart.price}</span>
                <span className="text-end">{cart.quantity}</span>
              </div>
            );
          })}

        <div className="flex justify-between items-center gap-2 mt-8">
          <button className=" border bg-indigo-100 text-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 rounded-lg px-2 py-4 font-semibold">
            Add To Cart
          </button>
          <button
            className="border bg-rose-100 text-rose-900 hover:bg-rose-900 hover:text-rose-100 rounded-lg px-2 py-4 font-semibold"
            onClick={backToList}
          >
            Back To Pizza
          </button>
        </div>
      </div>
    </Modal>
  );
}
