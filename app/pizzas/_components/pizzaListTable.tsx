"use client";

import { Pizza } from "@prisma/client";
import Image from "next/image";
import PizzaDeleteViewEditButton from "./pizzaDeleteViewEditButton";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deletePizza, editPizza } from "@/features/pizzaSlice";

type Props = {
  pizzas: Pizza[];
};
export default function PizzaListTable({ pizzas }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [enteredPizzas, setEnteredPizzas] = useState<Pizza[]>(pizzas);

  const dispatch = useDispatch();

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEnteredPizzas(
      pizzas.filter(
        (pizza) =>
          pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pizza.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pizza.topping.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSearchTerm("");
  };

  const deletePizzaHandler = (pizzaId: string) => {
    setEnteredPizzas((oldEnteredPizzas) =>
      oldEnteredPizzas?.filter((pizza) => pizza.id !== pizzaId)
    );

    dispatch(deletePizza({ pizzaId }));
  };

  const editPizzaHandler = (updatedPizza: Pizza) => {
    setEnteredPizzas((oldEnteredPizzas) =>
      oldEnteredPizzas?.map((pizza) =>
        pizza.id === updatedPizza.id ? updatedPizza : pizza
      )
    );

    dispatch(editPizza({ pizza: updatedPizza }));
  };

  return (
    <div className="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4 p-3">
      <form onClick={searchHandler}>
        <div className="flex justify-between items-center mb-5 mt-5 w-3/4 mx-auto">
          <input
            type="search"
            name="searchTerm"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className="border-solid border-2 border-gray-300  focus:border-solid focus:border-indigo-600 focus:outline-none text-black w-full rounded-lg p-3"
          />
          <button className="bg-blue-900 hover:bg-rose-700 text-blue-200 text-lg font-bold py-3 px-8 rounded-lg mx-4 uppercase">
            Search
          </button>
        </div>
      </form>
      <table className="table table-zebra border-1 border-gray-200 p-3">
        <thead className="text-gray-200 text-xl bg-gray-500">
          <tr className="">
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Topping</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enteredPizzas?.map((pizza) => {
            return (
              <tr key={pizza.id} className="text-base text-black">
                <td>
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    width={80}
                    height={80}
                    className="aspect-square object-cover w-20 h-auto"
                    priority
                  />
                </td>
                <td>{pizza.name}</td>
                <td>{pizza.price}</td>
                <td>{pizza.quantity}</td>
                <td>{pizza.description}</td>
                <td>{pizza.topping}</td>
                <td>
                  <PizzaDeleteViewEditButton
                    pizza={pizza}
                    id={pizza?.id}
                    onDelete={deletePizzaHandler}
                    onEdit={editPizzaHandler}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-end my-8">
        <Link
          href="/pizzas/new"
          className="bg-indigo-500 text-indigo-100 px-12 py-4 rounded-lg uppercase font-bold"
        >
          Add Pizza
        </Link>
      </div>
    </div>
  );
}
