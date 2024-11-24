import { auth } from "@/auth";
import PaymentByStripe from "../component/paymentByStripe";

export default async function PaymentPage() {
  const session = await auth();

  if (!session) return <div>Invalid credentials, please login again!</div>;

  return <PaymentByStripe />;
}
