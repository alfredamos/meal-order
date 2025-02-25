import { getAllOrdersByUserId } from "@/actions/order.action";
import { auth } from "@/auth";
import { OrderModel } from "@/models/orderModel";
import UserOrdersClient from "../component/userOrdersClient";

export default async function OrdersByUserId() {
 const session = await auth();

 if (!session?.user)
   return <div>You need to login to view this page</div>;

 const userId = session?.user?.id;
 
  const orders = (await getAllOrdersByUserId(userId)) as OrderModel[];

  return (
    <UserOrdersClient orders={orders}/>
  );
}