import { Pizza } from "@prisma/client";
import Link from "next/link";

type Props = {
  pizza: Pizza;
}
export default function PizzaItem({pizza}: Props) {
  return (
    <div className="card card-compact bg-base-100 w-full shadow-xl text-stone-700 m-2">
      <figure>
        <img
          src={pizza.image}
          alt={pizza.name}
          className="object-cover w-full h-48"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <Link href={`/pizzas/${pizza.id}/detail`}>{pizza.name}</Link>
        </h2>
        <p>${pizza.price}</p>
        <p>{pizza.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}