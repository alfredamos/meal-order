"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  path: string;
  label: string;
};
export default function DropDownLink({ path, label }: Props) {
  const pathname = usePathname();
  const isEqual = path.normalize() === pathname.normalize();
  const isSame = pathname.normalize() === "/users" || pathname.normalize() === "/pizzas/list";

  console.log("NavBar, pathname : ", { pathname, path, isEqual, isSame });

  return (
    <li
      className={`${
        isSame
          ? "text-rose-700 font-semibold bottom-b-2 border-rose-700 mb-2"
          : "text-black mb-2"
      }`}
    >
      <Link href={path}>{label}</Link>
    </li>
  );
}
