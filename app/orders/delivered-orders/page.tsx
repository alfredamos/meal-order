import { getAllOrders } from "@/actions/order.action";
import { auth } from "@/auth";
import { OrderModel } from "@/models/orderModel";
import { Status } from "@prisma/client";

export default async function DeliveredOrders() {
   const session = await auth();

   if (session?.user.role !== "Admin")
     return <div>You are not authorized to view this page</div>;

  const orders = (await getAllOrders()).filter(
    (order) => order.status === Status.Delivered
  ) as OrderModel[];

   if (!orders?.length) {
     return (
       <div className="flex justify-center items-center mx-auto my-auto bg-white text-black max-w-lg px-12 py-40 rounded-lg shadow-lg mt-24">
         <h1 className="text-3xl">There are no orders to display!</h1>
       </div>
     );
   }

  return (
    <div className="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4 p-3">
      <table className="table table-zebra border-1 border-gray-200 p-3">
        <thead className="text-gray-200 text-xl bg-gray-500">
          <tr className="">
            <th>Order No.</th>
            <th>Items</th>
            <th>Price</th>
            <th>Quantities</th>
            <th>Date Order</th>
            <th>Status</th>
            <th>Order By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr className="text-base text-black" key={order.id}>
              <td>{order.id}</td>
              <td>
                {order?.cartItems?.map((item) => (
                  <ul key={item.id}>
                    <li>
                      <p>{item.name}</p>
                    </li>
                  </ul>
                ))}
              </td>

              <td>{order.totalPrice}</td>
              <td>{order.totalQuantity}</td>
              <td>{order.orderDate.toDateString()}</td>
              <td>{order.status}</td>
              <td>{order.user?.name}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}