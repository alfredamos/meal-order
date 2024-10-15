"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  path: string;
  label: string;
  className?: string;
};
export default function DropDownLink({ path, label, className}: Props) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={path}
        className=  ""
      >
        {label}
      </Link>
    </li>
  );
}
