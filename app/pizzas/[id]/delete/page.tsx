import { getPizzaById } from "@/actions/pizza.action";
import { auth } from "@/auth";
import { Params } from "../edit/page";

async function DeletePizzaPage({ params }: Params) {
  const session = await auth();
  if (!session) return <div>Invalid credentials, please login again!</div>;

  const pizzaId = params.id;
  const pizza = await getPizzaById(pizzaId);

  return <div>DeletePizzaPage</div>;
}
export default DeletePizzaPage;
