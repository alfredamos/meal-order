import { auth } from "@/auth";
import PaymentByStripe from "../component/paymentByStripe";
/* import { Suspense } from "react";
import loading from '../loading'; */

export default async function PaymentPage() {
  const session = await auth();

  if (!session) return <div>Invalid credentials, please login again!</div>;

  const userId = session?.user?.id;

  return <PaymentByStripe userId={userId} />;
}
