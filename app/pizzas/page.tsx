import { getAllPizza } from "@/actions/pizza.action";
import PizzaListItems from "./PizzaListItems";

async function ListPizzaPage() {
  const pizzas = await getAllPizza();
  console.log("ListPizzaPage : ", pizzas);
  return <PizzaListItems pizzas={pizzas} />;
}
export default ListPizzaPage;
