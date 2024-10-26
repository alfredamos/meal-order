"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

type Props = {
  path: string;
  label?: string;
  icon: ReactNode;
  style?: CSSProperties;
};

export default function SideBarLink({ path, label, style, icon }: Props) {
  const pathname = usePathname();
  const isActive = pathname === path;

  console.log("NavBar, pathname : ", { pathname, path, isActive });

  return (
    <li className="mb-8" style={{ marginLeft: "20px", marginBottom: "60px" }}>
      <Link href={path}>
        <span
          className={
            isActive
              ? "text-rose-900 border-b-2 border-rose-900 font-semibold mb-2 hover:text-indigo-900 hover:border-b-2 hover:border-indigo-900 hover:font-bold"
              : "text-indigo-900 font-semibold mb-2 hover:text-rose-900 hover:font-bold"
          }
        >
          {icon}
        </span>
      </Link>
    </li>
  );
}
