
import { auth } from "@/auth";
import CartDetail from "../component/cartDetail"

async function AddToCartPage() {
  /*  const session = await auth();

   if (!session) return <div>Invalid credentials, please login again!</div>;

 */
  return (
    <CartDetail />
  )
}
export default AddToCartPage