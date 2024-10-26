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
    <div className="bg-white p-8 max-width-2xl text-black rounded-lg shadow-xl w-1/4">
      <h2 className="font-semibold border-b-2 mb-2">
        User Delete Confirmation!
      </h2>
      <p className="flex justify-between items-center">
        <span>Name</span>
        <span className="font-semibold">{user.name}</span>
      </p>
      <p className="flex justify-between items-center">
        <span>Email </span>
        <span className="font-semibold">{user.email}</span>
      </p>
      <p className="flex justify-between items-center">
        <span>Phone </span>
        <span className="font-semibold">{user.phone}</span>
      </p>
      <p className="flex justify-between items-center">
        <span>Genders </span>
        <span className="font-semibold text-wrap">{user.gender}</span>
      </p>
      <p className="flex justify-between items-center">
        <span>Role</span>
        <span className="font-semibold text-wrap">{user.role}</span>
      </p>
      <h4 className="mb-4 mt-4 border-b-2 border-t-2 font-medium">
        Do you really want to delete this user?
      </h4>
      <div className="flex justify-between items-center w-full mt-2">
        <button
          type="button"
          className="bg-violet-500 hover:bg-violet-700 text-slate-100 w-full rounded-lg mr-2 font-medium uppercase"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-slate-100 w-full rounded-lg font-medium uppercase"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
