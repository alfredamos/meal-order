import { auth } from "@/auth";
import NavElements from "./navElements";

export const revalidate = 3;

async function NavigationBar() {
  const session = await auth();

  console.log("In navbar", { session });

  return <NavElements session={session} />;
}
export default NavigationBar;
