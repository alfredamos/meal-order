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
    <div className="bg-slate-100 max-w-lg shadow-2xl flex flex-col gap-2 rounded-2xl overflow-hidden items-center justify-center">
      <div className="flex 1 w-full h-full">
        <Image
          src={user.image as string}
          alt={user.name}
          width={200}
          height={200}
          className="object-cover w-full h-72"
        />
      </div>
      <div className="flex 1 p-10">
        <div className="flex flex-col">
          <h2 className="card-title">
            <Link href="/pizzas">{user.name}</Link>
          </h2>
          <p className="flex justify-between items-center">
            <span className="font-light">Email </span>
            <span className="font-semibold">{user.email}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-light">Phone </span>
            <span className="font-semibold">{user.phone}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-light mr-5">Gender </span>
            <span className="font-semibold text-wrap">{user.gender}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-light">Role</span>
            <span className="font-semibold">{user.role}</span>
          </p>
          <div className="flex justify-center items-center mt-4 w-full">
            <button
              className="btn btn-primary w-40 font-bold uppercase w-full"
              onClick={onCancel}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
