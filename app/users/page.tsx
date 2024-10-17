import { getAllUsers } from "@/actions/user.action";
import UserDeleteAndViewButton from "./_components/userDeleteAndViewButton";
import { auth } from "@/auth";

async function ListUserPage() {
  const session = await auth();

  if (session?.user.role !== "Admin")
    return <div className="flex justify-center items-center border-4 border-red-700 px-6 py-6 max-w-lg mx-auto mt-60 text-4xl">You are not authorized to view this page</div>;
  console.log("ListUserPage : ", session);


  const users = await getAllUsers();
  console.log(users);

  return (
    <div className="overflow-x-auto bg-white m-6 shadow-inner rounded">
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
          {users?.map((user) => {
            return (
              <tr key={user.id} className="text-base text-black">
                <td>
                  <img
                    src={user.image}
                    alt={user.name}
                    className="object-cover w-20 h-20 rounded-full"
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
export default ListUserPage;
