import { OrderModel } from "@/models/orderModel";
import { OrderProduct } from "@/models/orderProduct.model";
import { CartItem } from "@prisma/client";

export class OrderState{
  orders: OrderProduct[] = [];

}