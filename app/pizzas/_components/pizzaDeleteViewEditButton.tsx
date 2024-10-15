"use client";

import { Pizza } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PizzaDeleteDialog from "./pizzaDeleteDialog";
import PizzaViewDialog from "./pizzaViewDialog";

type Props = {
  pizza: Pizza;
}
export default function PizzaDeleteViewEditButton({pizza}: Props) {
  const router = useRouter();
  const [isDeletePizza, setIsDeletePizza] = useState(false);
  const [isViewPizza, setIsViewPizza] = useState(false);

  const pizzaDeleteConfirmation = () => {
    setIsDeletePizza((previous) => !previous);
    //router.push(`/pizzas/${pizza?.id}/delete`);
  };

  const viewPizza = () => {
    setIsViewPizza((previous) => !previous);
    /* const url = `/pizzas/${pizza?.id}/detail`;
    console.log({ message: "in view-pizza", pizza: pizza?.id, url });
    router.push(`/pizzas/${pizza?.id}/detail`); */
  };

  return (
    <>
      {isDeletePizza && pizza && <PizzaDeleteDialog pizza={pizza} />}
      {isViewPizza && pizza && <PizzaViewDialog onCancel={viewPizza} pizza={pizza} />}     
      <button
        type="submit"
        className="py-2 px-4 border-2 border-violet-900 hover:bg-violet-900 hover:text-indigo-100 text-violet-900 font-bold text-base rounded-lg mr-4"
      >
        view
      </button>
      <button
        type="submit"
        className="py-2 px-4 border-2 border-yellow-500 hover:bg-orange-400 hover:text-yellow-100 text-orange-400 font-bold text-base rounded-lg mr-4"
      >
        Edit
      </button>
      <button
        type="submit"
        className="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-rose-100 text-rose-900 font-bold text-base rounded-lg mr-4"
      >
        Delete
      </button>
    </>
  );
}