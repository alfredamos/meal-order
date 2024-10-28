import { AuthState } from "./authState";
import { CartItemState } from "./cartItemState";
import { OrderState } from "./orderState";
import { ProductState } from "./productState";
import { UserState } from "./userState";

export class AllState{
  auth!: AuthState;
  cart!: CartItemState;
  order!: OrderState;
  product!: ProductState;
  user!: UserState

}