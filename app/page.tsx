import { getAllPizza } from "@/actions/pizza.action";
import PizzaListItems from "./admin/pizzas/_components/PizzaListItems";

export default async function Home() {
  const pizzas = await getAllPizza();
  return <PizzaListItems pizzas={pizzas} />;
}
