import { CartItem } from "../validations/cartItemValidation";
import { Customer } from "../validations/customerValidation";
import { Status } from "./Status";

export class OrderModel {
  id!: string;
  customerId!: string;
  customer?: Customer;
  cartItems: CartItem[] = [];
  isDelivered?: boolean;
  isShipped?: boolean;
  deliveryDate?: Date;
  shippingDate?: Date;
  orderDate!: Date;
  status!: Status;
  totalPrice!: number;
  totalQuantity!: number;
}