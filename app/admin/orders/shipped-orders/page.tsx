import { getAllOrders } from "@/actions/order.action";
import { OrderModel } from "@/models/orderModel";
import { Status } from "@prisma/client";
import { auth } from "@/auth";
import ShippedOrdersClient from "@/app/orders/component/shippedOrdersClient";

export default async function ShippedOrders() {
   const session = await auth();

   if (session?.user.role !== "Admin")
     return <div>You are not authorized to view this page</div>;

  const orders = ((await getAllOrders()).filter(order => order.status === Status.Shipped)) as OrderModel[];

  return <ShippedOrdersClient orders={orders}/>
}
