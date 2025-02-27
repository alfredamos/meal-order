import { auth } from "@/auth";
import {Role} from "@prisma/client";
import NavElements from "./navElements";

export const revalidate = 3;

async function NavigationBar() {
  //----> Get the auth-useCarter.
  const session = await auth();
   //----> Get the user.
   const user = session?.user;
   //----> Get the admin flag.
   const isAdmin = user?.role === Role.Admin
   
  return <NavElements session={session} isAdmin={isAdmin}/>;
}
export default NavigationBar;
