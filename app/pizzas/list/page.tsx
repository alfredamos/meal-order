import { getAllPizza } from "@/actions/pizza.action";
import { auth } from "@/auth";
import PizzaListTable from "../_components/pizzaListTable";

type Props = {};
export default async function PizzaListPage({}: Props) {
  const session = await auth();

  if (session?.user.role !== "Admin")
    return <div>You are not authorized to view this page</div>;

  const pizzas = await getAllPizza();

  return (
    <PizzaListTable pizzas={pizzas} />
  );
}
