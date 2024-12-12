import { getAllPizza } from "@/actions/pizza.action";
import PizzaListItems from "./PizzaListItems";

async function ListPizzaPage() {
  


  const pizzas = await getAllPizza();
  
  return <PizzaListItems pizzas={pizzas} />;
}
export default ListPizzaPage;
