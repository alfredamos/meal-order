"use client";

import { Pizza } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PizzaDeleteDialog from "./pizzaDeleteDialog";
import PizzaViewDialog from "./pizzaViewDialog";
import PizzaEditDialog from "./pizzaEditDialog";
import {deletePizzaById, editPizzaById} from "@/actions/pizza.action"

type Props = {
  pizza: Pizza;
  id: string;
  onDelete: (pizzaId: string) => void;
  onEdit: (pizza: Pizza) => void;
};

export default function PizzaDeleteViewEditButton({ id, pizza, onDelete, onEdit }: Props) {
  const router = useRouter();
  const [isDeletePizza, setIsDeletePizza] = useState(false);
  const [isEditPizza, setIsEditPizza] = useState(false);
  const [isViewPizza, setIsViewPizza] = useState(false);
  const [refresh, setRefresh] = useState(false);


  const pizzaDeleteConfirmation = () => {
    setIsDeletePizza((previous) => !previous);
  };

  const pizzaEditConfirmation = () => {
    setIsEditPizza((previous) => !previous);
  };

  const editPizzaHandler = async (pizza: Pizza) => {
    console.log("pizza info edited : ", pizza);

    if (!pizza) {
      return <div>Please enter all values!</div>;
    }

    pizza.id = id;

    const updatedPizza = await editPizzaById(pizza);

    onEdit(updatedPizza); //----> Updated the UI pizza-table

    setIsEditPizza((previous) => !previous);
    setRefresh(!refresh);
    router.refresh();
  };

  const backToListHandler = () => {
    if (isDeletePizza) setIsDeletePizza((previous) => !previous);
    if (isEditPizza) setIsEditPizza((previous) => !previous);
    if (isViewPizza) setIsViewPizza((previous) => !previous);
    router.refresh();
  };

  const viewPizzaHandler = () => {
    setIsViewPizza((previous) => !previous);
  };

  const deletePizzaHandler = async (id: string) => {
    console.log("pizza info deleted : ", id);

    await deletePizzaById(id);

    setIsDeletePizza((previous) => !previous);
    setRefresh(!refresh);

    router.refresh();
  };

  return (
    <>
      {isDeletePizza && pizza && (
        <PizzaDeleteDialog
          isDelete={isDeletePizza}
          pizza={pizza}
          backToList={backToListHandler}
          onDelete={() => deletePizzaHandler(pizza?.id)}
        />
      )}
      {isEditPizza && pizza && (
        <PizzaEditDialog
          isEdit={isEditPizza}
          pizza={pizza}
          onCancel={backToListHandler}
          onEdit={editPizzaHandler}
        />
      )}
      {isViewPizza && pizza && (
        <PizzaViewDialog
          pizza={pizza}
          onCancel={backToListHandler}
          isView={isViewPizza}
        />
      )}
      <div className="flex items-center w-full mt-2">
        <button
          type="button"
          className="py-2 px-4 border-2 border-violet-900 hover:bg-violet-900 hover:text-indigo-100 text-violet-900 font-bold text-base rounded-lg mr-2"
          onClick={viewPizzaHandler}
        >
          view
        </button>
        <button
          type="button"
          className="py-2 px-4 border-2 border-yellow-500 hover:bg-orange-400 hover:text-yellow-100 text-orange-400 font-bold text-base rounded-lg mr-2"
          onClick={pizzaEditConfirmation}
        >
          Edit
        </button>
        <button
          type="button"
          className="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-rose-100 text-rose-900 font-bold text-base rounded-lg mr-2"
          onClick={pizzaDeleteConfirmation}
        >
          Delete
        </button>
      </div>
    </>
  );
}
