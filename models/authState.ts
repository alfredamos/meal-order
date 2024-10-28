import { User } from "@prisma/client";

export class AuthState {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  currentUser: User | null = null;
  token: string | null = null;
}
