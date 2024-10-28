import { OrderModel } from "@/models/orderModel";
import { OrderProduct } from "@/models/orderProduct.model";

export class OrderState{
  customerId: string = ""
  orders: OrderProduct[] = [];
  ordersFromDb: OrderModel[] = [];
  order: OrderProduct = null!;
  totalCost: number = 0;
  quantities: number = 0;

}