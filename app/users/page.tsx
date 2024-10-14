import { getAllUsers } from "@/actions/user.action";
import UserDeleteAndViewButton from "@/components/users/UserDeleteAndViewButton";

async function ListUserPage() {
  const users = await getAllUsers();
  console.log(users);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr className="text-white">
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
                className={`${
                  evenOrOdd === 0 ? " text-black font-semibold " : " text-white "
                }`}
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
