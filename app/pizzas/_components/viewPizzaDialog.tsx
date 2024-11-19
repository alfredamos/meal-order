"use client";

import { Pizza } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

type Props = {
  pizza: Pizza;
};
export default function PizzaViewDialog({ pizza }: Props) {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="card lg:card-side bg-base-100 shadow-xl w-1/2 mx-auto mt-16">
        <figure>
          <Image
            src={pizza.image}
            alt={pizza.name}
            width={100}
            height={100}
            className="object-cover w-full  h-full"
          />
        </figure>
        <div className="card-body text-stone-700">
          <h2 className="card-title">
            <Link href="/pizzas">{pizza.name}</Link>
          </h2>
          <p>${pizza.price}</p>
          <p>{pizza.description}</p>
          <p>Click the button to order your pizza!</p>
          <div className="card-actions justify-end">
            <form method="dialog">
              <button className="btn btn-primary">Back</button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
