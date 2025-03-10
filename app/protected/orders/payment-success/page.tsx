import Link from "next/link";

export default function PaymentSuccessPage({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">Payment made successful!</h2>
        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold curs  ">
          ${amount}
        </div>
        <Link
          href="/"
          className="flex justify-end items-end text-indigo-100 mt-6 font-bold"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
