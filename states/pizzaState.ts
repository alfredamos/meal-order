import { Pizza } from "@prisma/client";

export class PizzaState{
  pizzas: Pizza[] = [];
  pizza: Pizza | null = null;
}