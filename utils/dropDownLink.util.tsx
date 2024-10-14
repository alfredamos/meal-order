"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  path: string;
  label: string;
};
export default function DropDownLink({ path, label}: Props) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={path === pathname ? "text-violet-400" : "text-black"}
      >
        {label}
      </Link>
    </li>
  );
}
