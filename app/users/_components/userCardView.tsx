"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

type Props = {
  user: User;
  onCancel: () => void;
};
export default function UserCardView({ user, onCancel }: Props) {
  console.log("UserCard : ", user);
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl w-1/3 mx-auto mt-16">
      <figure>
        <Image
          src={user.image as string}
          alt={user.name}
          width={400}
          height={75}
          className="object-cover h-full w-full"
        />
      </figure>
      <div className="card-body text-stone-700 w-full">
        <h2 className="card-title">
          <Link href="/users">{user.name}</Link>
        </h2>
        <p className="flex justify-between items-center">
          <span className="mr-10">Email </span>
          <span className="font-semibold">{user.email}</span>
        </p>
        <p className="flex justify-between items-center">
          <span>Phone </span>
          <span className="font-semibold">{user.phone}</span>
        </p>
        <p className="flex justify-between items-center">
          <span>Gender </span>
          <span className="font-semibold">{user.gender}</span>
        </p>
        <p className="flex justify-between items-center">
          <span>Role</span>
          <span className="font-semibold">{user.role}</span>
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onCancel}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
