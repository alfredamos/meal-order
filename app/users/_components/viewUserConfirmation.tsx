import { User } from "@prisma/client";
import Image from "next/image";

type Props = {
  user: User;
  onCancel: () => void;
};
export default function ViewUserConfirmation({ onCancel, user }: Props) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl text-stone-700 mt-10">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
          alt="Album"          
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">User Details</h2>
        <p>Name : {user.name}</p>
        <p>Email : {user.email}</p>
        <p>Phone : {user.phone}</p>
        <p>Gender : {user.gender}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onCancel}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
