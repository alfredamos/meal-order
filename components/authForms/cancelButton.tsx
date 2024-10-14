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
      className="py-2 border-2 border-gray-900 px-4 bg-white hover:bg-black hover:text-white text-gray-900 text-lg font-bold rounded-lg w-full"
      onClick={backButtonHandler}
    >
      Cancel
    </button>
  );
}