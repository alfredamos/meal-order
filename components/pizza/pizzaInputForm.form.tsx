import { Pizza } from "@prisma/client";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  formName: string;
  pizza: Pizza;
};

export default function PizzaInputForm({children, formName, pizza}: Props) {
  return (
    <>
      <h4 className="font-bold text-slate-800 text-2xl mb-6">
        {formName} Pizza Form
      </h4>
      <div className="grid grid-cols-2 gap px-8">
        <div className="mb-6 px-2">
          <label htmlFor="name" className="flex flex-start w-full font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={pizza.name}
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 p-2 rounded-lg text-black w-full"
          />
        </div>
        <div className="mb-6 px-2">
          <label
            htmlFor="quantity"
            className="flex flex-start w-full font-medium tracking-wide"
          >
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            defaultValue={pizza.quantity}
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>

        <div className="mb-6 px-2">
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
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>
        <div className="mb-6 px-2">
          <label
            htmlFor="image"
            className="flex flex-start w-full font-medium tracking-wide"
          >
            Image
          </label>
          <input
            id="image"
            name="image"
            type="text"
            defaultValue={pizza.image}
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>

        <div className="mb-6 px-2">
          <label
            htmlFor="topping"
            className="flex flex-start w-full font-medium"
          >
            Topping
          </label>
          <textarea
            id="topping"
            name="topping"
            defaultValue={pizza.topping}
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>
        <div className="mb-5 px-2">
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
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
          />
        </div>
      </div>
      <input
        id="userId"
        name="userId"
        defaultValue={pizza.userId}
        type="hidden"
      />
      <div className="flex w-full px-10">
        <button
          type="submit"
          className="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold text-lg rounded-lg flex-1 mr-4"
        >
          Submit
        </button>
        {children}
      </div>
    </>
  );
}