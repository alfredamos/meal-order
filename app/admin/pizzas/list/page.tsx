import { getAllPizza } from "@/actions/pizza.action";
import PizzaListTable from "../_components/pizzaListTable";

async function PizzaListPage(){
  const pizzas = await getAllPizza();
  return (
    <PizzaListTable pizzas={pizzas}/>
  );

}

export default PizzaListPage;