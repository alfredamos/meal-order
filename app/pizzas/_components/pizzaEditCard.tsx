"use client";

import PizzaInputForm from "@/components/pizza/pizzaInputForm.form";
import { Pizza } from "@prisma/client";
import ClientCancelButton from "./clientCancelButton";

type Props = {
  pizza: Pizza;
  onCancel: () => void;
  onEdit: (pizza: Pizza) => void;
  formName: string;
};
export default function PizzaEditCard({
  pizza,
  onCancel,
  onEdit,
  formName,
}: Props) {
  const submitHandler = (formData: FormData) => {
    const editedPizza = Object.fromEntries(formData) as unknown as Pizza;

    onEdit(editedPizza);
  };

  return (
    <form
      method="PATCH"
      className="bg-white text-slate-800 flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10"
      action={submitHandler}
    >
      <PizzaInputForm formName={formName} pizza={pizza}>
        <ClientCancelButton onCancel={onCancel} />
      </PizzaInputForm>
    </form>
  );
}
