import { getAllUsers } from "@/actions/user.action";
import UserDeleteAndViewButton from "./_components/userDeleteAndViewButton";
import { auth } from "@/auth";
import Image from "next/image";
import UserListTable from "./_components/userListTable";

async function ListUserPage() {
  const session = await auth();

  if (session?.user.role !== "Admin")
    return (
      <div className="flex justify-center items-center border-4 border-red-700 px-6 py-6 max-w-lg mx-auto mt-60 text-4xl">
        You are not authorized to view this page
      </div>
    );
  console.log("ListUserPage : ", session);

  const users = await getAllUsers();
  console.log(users);

  return (
    <UserListTable users={users} />
  );
}
export default ListUserPage;
