"use client";

import { Pizza } from "@prisma/client";
import Image from "next/image";
import PizzaDeleteViewEditButton from "./pizzaDeleteViewEditButton";
import { useState, FormEvent } from "react";
import { set } from "zod";

type Props = {
  pizzas: Pizza[];
};
export default function PizzaListTable({ pizzas }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [enteredPizzas, setEnteredPizzas] = useState<Pizza[]>(pizzas);

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searchTerm : ", searchTerm);
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

  return (
    <div className="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4">
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
      <table className="table table-zebra">
        <thead>
          <tr className="text-gray-200 text-xl bg-gray-500">
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
                    className="object-cover w-20 h-20"
                  />
                </td>
                <td>{pizza.name}</td>
                <td>{pizza.price}</td>
                <td>{pizza.quantity}</td>
                <td>{pizza.description}</td>
                <td>{pizza.topping}</td>
                <td>
                  <PizzaDeleteViewEditButton pizza={pizza} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
