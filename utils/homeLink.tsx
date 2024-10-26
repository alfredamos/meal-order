"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";

type Props = {
  path: string;
  label: string;
  name: string;
  style?: CSSProperties;
};
export default function HomeLink({ path, name, label, style }: Props) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <>
      <Link href={path} style={style}>
        <span
          className={
            isActive
              ? "text-rose-900 font-semibold mb-2 hover:text-indigo-900 hover:border-b-2 hover:border-indigo-900 hover:font-bold mr-4"
              : "text-black font-semibold mb-2 hover:text-rose-900 hover:font-bold mr-4"
          }
        >
           Welcome {name}
        </span>
      </Link>
    </>
  );
}
