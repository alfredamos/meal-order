import { Pizza } from "@prisma/client";

type Props = {
  pizza: Pizza;
  onCancel: () => void;
  onDelete: (id: string) => void;
};
export default function DeletePizzaConfirmation({
  onCancel,
  onDelete,
  pizza,
}: Props) {
  return (
    <div className="bg-white p-8 max-width-2xl text-black rounded-lg shadow-2xl w-1/4">
      <h2 className="font-semibold border-b-2">User Delete Confirmation!</h2>
      <p className="flex justify-between items-center py-2 mt-2">
        <span className="font-light">Name</span>
        <span className="font-semibold">{pizza.name}</span>
      </p>
      <p className="flex justify-between items-center py-2">
        <span className="font-light">Price </span>
        <span className="font-semibold">${pizza.price}</span>
      </p>
      <p className="flex justify-between items-center py-2">
        <span className="font-light">Quantity </span>
        <span className="font-semibold">{pizza.quantity}</span>
      </p>
      <p className="flex justify-between items-center py-2">
        <span className="block mr-6 text-wrap font-light">Toppings </span>
        <span className="font-semibold w-full text-end">{pizza.topping}</span>
      </p>
      <p className="flex justify-between items-center py-2">
        <span className="font-light">Description</span>
        <span className="font-semibold text-wrap">{pizza.description}</span>
      </p>
      <h4 className="mb-4 mt-4 border-b-2 border-t-2 font-semibold py-4">
        Do you really want to delete this user?
      </h4>
      <div className="flex justify-between items-center w-full mt-2">
        <button
          type="button"
          className="bg-violet-500 hover:bg-violet-700 text-slate-100 w-full rounded-lg mr-2 font-medium uppercase py-4"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-slate-100 w-full rounded-lg font-medium uppercase py-4"
          onClick={() => onDelete(pizza.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
