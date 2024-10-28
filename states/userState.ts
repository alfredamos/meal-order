import { User } from "@prisma/client";

export class UserState{
  users: User[] = [];
}