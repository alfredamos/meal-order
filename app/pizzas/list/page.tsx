import { getAllPizza } from "@/actions/pizza.action";
import PizzaDeleteViewEditButton from "../_components/pizzaDeleteViewEditButton";
import { auth } from "@/auth";
type Props = {};
export default async function PizzaListPage({}: Props) {
  const session = await auth();
  console.log("PizzaListPage : ", session);

  if (session?.user.role !== "Admin")
    return <div>You are not authorized to view this page</div>;

  const pizzas = await getAllPizza();
  console.log("PizzaListPage : ", pizzas);

  return (
    <div className="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4">
      <table className="table table-zebra">
        <thead>
          <tr className="text-gray-200 text-xl bg-gray-500">
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Topping</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas?.map((pizza) => {
            return (
              <tr key={pizza.id} className="text-base text-black">
                <td>
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="object-cover w-20 h-20"
                  />
                </td>
                <td>{pizza.name}</td>
                <td>{pizza.price}</td>
                <td>{pizza.quantity}</td>
                <td>{pizza.description}</td>
                <td>{pizza.topping}</td>
                <td>
                  <PizzaDeleteViewEditButton pizza={pizza} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
