import { editPizzaById, getPizzaById } from "@/actions/pizza.action";
import { auth } from "@/auth";
import PizzaForm from "@/components/pizza/pizzaForm.form";

export type Params = {
  params: { id: string };
};

async function EditPizzaPage({ params }: Params) {
  const session = await auth();
  if (!session) return <div>Invalid credentials, please login again!</div>;

  const pizzaId = params.id;
  const pizza = await getPizzaById(pizzaId);

  return <PizzaForm pizza={pizza} action={editPizzaById} formName="Create" />;
}
export default EditPizzaPage;
