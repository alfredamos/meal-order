import { createPizza } from "@/actions/pizza.action";
import { auth } from "@/auth";
import FormPizza from "@/components/pizza/formPizza.form";

const pizza = {
  id: "",
  name: "",
  price: 0,
  topping: "",
  quantity: 10,
  image: "",
  description: "",
  userId: "",
};

async function AddNewPizzaPage() {
  const session = await auth();
  if (!session) return <div>Invalid credentials, please login again!</div>;
  const userId = session.user.id;
  pizza.userId = userId;

  return <FormPizza pizza={pizza} action={createPizza} formName="Create" />;
}
export default AddNewPizzaPage;
