"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

type Props = {
  user: User;
  onCancel: () => void;
};
export default function UserCardView({ user, onCancel }: Props) {
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
          <h2 className="card-title mb-2">
            <Link href="/users">{user.name}</Link>
          </h2>
          <p className="flex justify-between items-center">
            <span className="font-light mr-8">Email </span>
            <span className="font-semibold">{user.email}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-light mr-8">Phone </span>
            <span className="font-semibold">{user.phone}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-light mr-8">Gender </span>
            <span className="font-semibold text-wrap">{user.gender}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-light mr-8">Role</span>
            <span className="font-semibold">{user.role}</span>
          </p>
          <div className="flex justify-center items-center mt-10 w-full">
            <button
              className="btn btn-primary w-40 font-bold uppercase"
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
