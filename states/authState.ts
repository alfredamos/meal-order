import { User } from "@prisma/client";

export class AuthState{
  currentUser: User | null = null;
  token: string | null = null;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
}