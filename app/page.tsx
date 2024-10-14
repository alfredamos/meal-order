import Image from "next/image";
import { auth } from "@/auth";
import { getAllPizza } from "@/actions/pizza.action";
import PizzaListItems from "./pizzas/PizzaListItems";

export default async function Home() {
  const pizzas = await getAllPizza();
  console.log("ListPizzaPage : ", pizzas);
  return <PizzaListItems pizzas={pizzas} />;
}
