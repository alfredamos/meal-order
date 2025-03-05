import { getAllUsers } from "@/actions/user.action";
import { auth } from "@/auth";
import UserListTable from "./_components/userListTable";

async function ListUserPage() {
  /* const session = await auth();

  if (session?.user.role !== "Admin")
    return (
      <div className="flex justify-center items-center border-4 border-red-700 px-6 py-6 max-w-lg mx-auto mt-60 text-4xl">
        You are not authorized to view this page
      </div>
    ); */

  const users = await getAllUsers();
  return (
    <UserListTable users={users} />
  );
}
export default ListUserPage;
