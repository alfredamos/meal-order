
import { getPizzaById } from "@/actions/pizza.action";
import PizzaCard from "../../_components/pizzaCard";
export type Params = {
  params: { id: string };
};

async function PizzaDetailOnePage({ params }: Params) {
  /* const session = await auth();
  if (!session) return <div>Invalid credentials, please login again!</div>;
 */
  const pizzaId = params.id;
  const pizza = await getPizzaById(pizzaId);

  return <PizzaCard pizza={ pizza } />;
}
export default PizzaDetailOnePage;

