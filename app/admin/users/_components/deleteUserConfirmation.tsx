"use client";

import { User } from "@prisma/client";

type Props = {
  user: User;
  onCancel: () => void;
  onDelete: (id: string) => void;
};
export default function DeleteUserConfirmation({
  onCancel,
  onDelete,
  user,
}: Props) {
  return (
    <div className="bg-white p-12 max-width-2xl text-black rounded-2xl shadow-2xl w-1/2">
      <span className="flex justify-end items-center">
        <button type="button" className=" text-rose-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold" onClick={onCancel}>Close</button>
      </span>
      <h2 className="font-semibold border-b-2 text-3xl">
        User Delete Confirmation!
      </h2>
      <p className="flex justify-between items-center py-2 mt-2">
        <span className="font-light">Name</span>
        <span className="font-semibold">{user.name}</span>
      </p>
      <p className="flex justify-between items-center py-2">
        <span className="font-light">Email </span>
        <span className="font-semibold">${user.email}</span>
      </p>
      <p className="flex justify-between items-center py-2">
        <span className="font-light">Phone </span>
        <span className="font-semibold">{user.phone}</span>
      </p>
      <p className="flex justify-between items-center py-2">
        <span className="font-light">Gender </span>
        <span className="font-semibold w-full text-end">{user.gender}</span>
      </p>
      <p className="flex justify-between items-center py-2">
        <span className="font-light">role</span>
        <span className="font-semibold text-wrap">{user.role}</span>
      </p>
      <h4 className="mb-4 mt-4 border-b-2 border-t-2 font-semibold py-4 text-xl">
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
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
