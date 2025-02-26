import Checkout from "../component/checkout";
import { auth } from "@/auth";

async function CheckoutPage() {
  /* const session = await auth();

  if (!session) return <div>Invalid credentials, please login again!</div>;
 */
  

  return <Checkout />;
}
export default CheckoutPage;
