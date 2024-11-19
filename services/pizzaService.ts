import { Pizza } from "@prisma/client";
import { ApiService } from "./apiService";

class PizzaService extends ApiService<Pizza>{
    constructor(){
      super("/pizzas")
    }
}

export const pizzaService = new PizzaService();

