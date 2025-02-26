import { getPizzaById } from "@/actions/pizza.action";
import { auth } from "@/auth";
import PizzaCard from "../../pizzaCard";
import { Params } from "../edit/page";

async function DetailPizzaPage({ params }: Params) {
  /* const session = await auth();
  if (!session) return <div>Invalid credentials, please login again!</div>;
 */
  const pizzaId = params.id;
  const pizza = await getPizzaById(pizzaId);

  return <PizzaCard pizza={pizza} />;
}
export default DetailPizzaPage;
