import { Pizza } from "@prisma/client";
import {useState} from "react";

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
  //----> State
  const [isShowMore, setIsShowMore] = useState(false);

  //----> Handlers
  const showMoreTextHandler = () => {
    setIsShowMore(showMore => !showMore);
  }

  return (
    <div className="bg-white p-12 max-width-2xl text-black rounded-2xl shadow-2xl w-1/2">
      <span className="flex justify-end items-center">
        <button type="button" className=" text-rose-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold" onClick={onCancel}>Close</button>
      </span>
      <h2 className="font-semibold border-b-2 text-3xl">
        <span>User Delete Confirmation!</span>
      </h2>
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
      <p>
            <span className="font-light mr-5">Description</span>
            <span className="text-muted mr-4">{isShowMore ? pizza.description : pizza.description.substring(0,40) }</span>
            <button type="button" className=" text-indigo-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold" onClick={() => showMoreTextHandler()}>{isShowMore ? "Less" : "More"}</button>
          </p>
      <h4 className="mb-4 mt-4 border-b-2 border-t-2 font-semibold py-4 text-xl">
        <span>Do you really want to delete this user?</span>
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
