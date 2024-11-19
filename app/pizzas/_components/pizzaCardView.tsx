"use client";

import { Pizza } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

type Props = {
  pizza: Pizza;
  onCancel: () => void;
};
export default function PizzaCardView({ pizza, onCancel }: Props) {
  console.log("PizzaCard : ", pizza);
  return (
    <div className="bg-slate-100 max-w-lg shadow-2xl flex flex-col gap-2 rounded-2xl overflow-hidden items-center justify-center">
      <div className="flex 1 w-full h-full">
        <Image
          src={pizza.image}
          alt={pizza.name}
          width={200}
          height={200}
          className="object-cover w-full h-72"
        />
      </div>
      <div className="flex 1 p-10">
        <div className="flex flex-col">
          <h2 className="card-title">
            <Link href="/pizzas">{pizza.name}</Link>
          </h2>
          <p className="flex justify-between items-center">
            <span className="font-light">Price </span>
            <span className="font-semibold">${pizza.price}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-light">Quantity </span>
            <span className="font-semibold">{pizza.quantity}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-light mr-5">Toppings </span>
            <span className="font-semibold text-wrap">{pizza.topping}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-light">Description</span>
            <span className="font-semibold">{pizza.description}</span>
          </p>
          <div className="flex justify-center items-center mt-4 w-full">
            <button
              className="btn btn-primary font-bold uppercase w-full"
              onClick={onCancel}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  {
    /* <div className="flex bg-base-100 shadow-xl w-3/5 mx-auto mt-16">
      <figure className="flex 1">
        <Image
          src={pizza.image}
          alt={pizza.name}
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="flex 1 text-stone-700">
        <h2 className="card-title">
          <Link href="/pizzas">{pizza.name}</Link>
        </h2>
        <p className="flex justify-between items-center">
          <span>Price </span>
          <span className="font-semibold">${pizza.price}</span>
        </p>
        <p className="flex justify-between items-center">
          <span>Quantity </span>
          <span className="font-semibold">{pizza.quantity}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="block mr-5">Toppings </span>
          <span className="font-semibold text-wrap">{pizza.topping}</span>
        </p>
        <p className="flex justify-between items-center">
          <span>Description</span>
          <span className="font-semibold">{pizza.description}</span>
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onCancel}>
            Back
          </button>
        </div>
      </div>
    </div> */
  }
}
