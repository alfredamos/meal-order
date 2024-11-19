import { User } from "@prisma/client";
import { ApiService } from "./apiService";

class UserService extends ApiService<User>{
  constructor(){
    super("/users")
  }
}

export const userService = new UserService();

