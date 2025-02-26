import { getAllPizza } from "@/actions/pizza.action";
import PizzaListItems from "./pizzas/PizzaListItems";

export default async function Home() {
  const pizzas = await getAllPizza();
  return <PizzaListItems pizzas={pizzas} />;
}
