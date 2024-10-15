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
          src="https://www.istockphoto.com/photo/multi-ethnic-group-of-people-gm902647950-248979115?utm_campaign=srp_photos_10&utm_content=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Favatar%2F&utm_medium=affiliate&utm_source=pexels&utm_term=avatar"
          alt="Profile"
          className="object-cover w-full h-48"
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
