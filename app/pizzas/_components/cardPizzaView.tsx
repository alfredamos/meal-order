"use client";

import { Pizza } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

type Props = {
  pizza: Pizza;
  onCancel: () => void;
};
export default function PizzaCardView({ pizza, onCancel }: Props) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl w-3/5 mx-auto mt-16">
      <figure>
        <Image
          src={pizza.image}
          alt={pizza.name}
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body text-stone-700">
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
    </div>
  );
}
