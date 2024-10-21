"use client";

import { useRouter } from "next/navigation";

export default function CancelButton() {
  const router = useRouter();
  const backButtonHandler = () => {
    router.back();
  }
  return (
    <button
      type="button"
      className="py-2 border-2 border-yellow-900 px-4 bg-white hover:bg-yellow-900 hover:text-white text-yellow-900 text-lg font-bold rounded-lg w-full"
      onClick={backButtonHandler}
    >
      Cancel
    </button>
  );
}