"use client";

import PizzaInputForm from "@/components/pizza/pizzaInputForm.form";
import { Pizza } from "@prisma/client";
import { FormEvent } from "react";
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
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const editedPizza = Object.fromEntries(
      formData.entries()
    ) as unknown as Pizza;
    onEdit(editedPizza);
  };

  return (
    <form
      method="PATCH"
      className="bg-white text-slate-800 flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10"
      onSubmit={(event) => submitHandler(event)}
    >
      <PizzaInputForm formName={formName} pizza={pizza}>
        <ClientCancelButton onCancel={onCancel}/>
      </PizzaInputForm>
    </form>
  );
}
