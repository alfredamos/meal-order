import { getAllOrders } from "@/actions/order.action";
import PendingOrdersClient from "../../../orders/component/pendingOrdersClient";
import { OrderModel } from "@/models/orderModel";
import { Status } from "@prisma/client";
import { auth } from "@/auth";

export default async function PendingOrders() {
  const session = await auth();

  if (session?.user.role !== "Admin")
    return <div>You are not authorized to view this page</div>;

  const orders = (await getAllOrders()).filter(
    (order) => order.status === Status.Pending
  ) as OrderModel[];

  return <PendingOrdersClient orders={orders} />;
}
