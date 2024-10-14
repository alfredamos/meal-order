import { Pizza } from "@prisma/client";
import PizzaItem from "./PizzaItem";

type Props = {
  pizzas: Pizza[];
}
export default function PizzaListItems({pizzas}: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 m-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {pizzas.map((pizza) => { 
        return <PizzaItem pizza={pizza} key={pizza.id} />
      })}
    </div>
  )
}