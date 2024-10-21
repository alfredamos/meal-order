"use client";

import { Pizza } from "@prisma/client";
import { FormEvent } from "react";

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
    console.log("formData : ", formData);
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
      <h4 className="font-bold text-slate-800 text-2xl mb-6">
        {formName} Pizza Form
      </h4>
      <div className="flex justify-center items-center">
        <div className="flex-1">
          <div className="mb-6 w-full px-10">
            <label
              htmlFor="name"
              className="flex flex-start w-full font-medium"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={pizza.name}
              className="border-2 bg-slate-200 p-2 rounded-lg text-black w-full"
            />
          </div>
          <div className="mb-6 w-full px-10">
            <label
              htmlFor="price"
              className="flex flex-start w-full font-medium tracking-wide"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              defaultValue={pizza.price}
              className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
            />
          </div>
          <div className="mb-6 w-full px-10">
            <label
              htmlFor="topping"
              className="flex flex-start w-full font-medium tracking-wide"
            >
              Topping
            </label>
            <textarea
              id="topping"
              name="topping"
              defaultValue={pizza.topping}
              className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
            />
          </div>
          <input id="id" name="id" defaultValue={pizza?.id} type="hidden" />
        </div>
        <div className="flex-1">
          <div className="mb-6 w-full px-10">
            <label
              htmlFor="quantity"
              className="flex flex-start w-full font-medium"
            >
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              defaultValue={pizza.quantity}
              className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
            />
          </div>
          <div className="mb-6 w-full px-10">
            <label
              htmlFor="image"
              className="flex flex-start w-full font-medium"
            >
              Image
            </label>
            <input
              id="image"
              type="text"
              name="image"
              defaultValue={pizza.image}
              className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
            />
          </div>
          <div className="mb-5 w-full px-10">
            <label
              htmlFor="description"
              className="flex flex-start w-full font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={pizza.description}
              className="border-2 bg-slate-200 w-full p-2 rounded-lg text-black"
            />
          </div>
          <input
            id="userId"
            name="userId"
            defaultValue={pizza.userId}
            type="hidden"
          />
        </div>
      </div>

      <div className="flex w-full px-10">
        <button
          type="submit"
          className="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold text-lg rounded-lg flex-1 mr-4"
        >
          Submit
        </button>
        <button
          type="button"
          className="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-white text-rose-900 font-bold text-lg rounded-lg flex-1"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
