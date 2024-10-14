"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";

type Props = {
  path: string;
  label: string;
  style?: CSSProperties;
};
export default function NavLink({ label, path, style }: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={
        path === pathname
          ? "text-indigo-400 font-semibold bottom-b-2"
          : "text-black"
      }
      style={style}
    >
      {label}
    </Link>
  );
}
