import { getAllUsers } from "@/actions/user.action";
import UserDeleteAndViewButton from "@/components/users/UserDeleteAndViewButton";

async function ListUserPage() {
  const users = await getAllUsers();
  console.log(users);

  return (
    <div className="overflow-x-auto bg-white m-6 shadow-inner rounded">
      <table className="table table-zebra">
        <thead>
          <tr className="text-gray-200 text-xl bg-gray-500">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            const evenOrOdd = (index + 1) % 2;
            return (
              <tr
                key={user.id}
                className="text-base text-black"
              >
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
