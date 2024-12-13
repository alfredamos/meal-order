import { auth } from "@/auth";
import NavElements from "./navElements";

export const revalidate = 3;

async function NavigationBar() {
  const session = await auth();

  return <NavElements session={session} />;
}
export default NavigationBar;
