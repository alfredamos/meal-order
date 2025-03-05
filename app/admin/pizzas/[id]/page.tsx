import Link from "next/link";
import { getPizzaById } from "@/actions/pizza.action";
import { Pizza } from "@prisma/client";
import DetailPizzaClient from "../_components/DetailPizzaClient";

export type Params = {
  params: { id: string };
};

async function PizzaDetailOnePage({ params }: Params) {
  /* const session = await auth();
  if (!session) return <div>Invalid credentials, please login again!</div>;
 */
  const pizzaId = params.id;
  const pizza = await getPizzaById(pizzaId);

  const addToCart = (pizza: Pizza) => {
    console.log("pizza: ", pizza)
  }

  return (
    <DetailPizzaClient pizza={pizza}/>
    );
}
export default PizzaDetailOnePage;

