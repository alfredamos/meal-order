import { getAllOrders} from "@/actions/order.action"
import AllOrdersClient from "@/app/orders/component/allOrdersClient"
import { OrderModel } from "@/models/orderModel"

export default async function AllOrders() {
   /* const session = await auth();

   if (session?.user.role !== "Admin")
     return <div>You are not authorized to view this page</div>;
 */
  const orders = await getAllOrders() as OrderModel[]

  return <AllOrdersClient orders={orders}/>
}