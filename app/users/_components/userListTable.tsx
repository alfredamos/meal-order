"use client";

import { User } from "@prisma/client";
import UserDeleteAndViewButton from "./userDeleteAndViewButton";
import Image from "next/image";
import { useState, FormEvent } from "react";

type Props = {
  users: User[];
};
export default function UserListTable({ users }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [enteredUsers, setEnteredUsers] = useState<User[]>(users);

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searchTerm : ", searchTerm);
    setEnteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSearchTerm("");
  };

  return (
    <div className="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4">
      <form onClick={searchHandler}>
        <div className="flex justify-between items-center mb-5 mt-5 w-3/4 mx-auto">
          <input
            type="search"
            name="searchTerm"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none text-black w-full rounded-lg p-3"
          />
          <button className="bg-blue-900 hover:bg-rose-700 text-blue-200 text-lg font-bold py-3 px-8 rounded-lg mx-4 uppercase">
            Search
          </button>
        </div>
      </form>
      <table className="table table-zebra">
        <thead>
          <tr className="text-gray-200 text-xl bg-gray-500">
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enteredUsers?.map((user) => {
            return (
              <tr key={user.id} className="text-base text-black">
                <td>
                  <Image
                    src={user?.image ? user.image : ""}
                    alt={user.name}
                    width={80}
                    height={60}
                    className="object-cover h-20 w-20 rounded-full"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>
                  <UserDeleteAndViewButton user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
