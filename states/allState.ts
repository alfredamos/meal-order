import { AuthState } from "./authState";
import { CartItemState } from "./cartItemState";
import { OrderState } from "./orderState";
import { PizzaState } from "./pizzaState";
import { UserState } from "./userState";

export class AllState{
  cartState!: CartItemState;
  orderState!: OrderState;
  pizzaState!: PizzaState;
  userState!: UserState;
  authState!: AuthState
  

}