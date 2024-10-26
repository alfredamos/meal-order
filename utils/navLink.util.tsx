import Link from "next/link";
import React, { CSSProperties, ReactNode } from "react";

type Props = {
  path: string;
  label: string;
  style?: CSSProperties;
  icon: ReactNode;
  type: "navbar" | "sideBar";
};
export default function NavLink({ icon, label, path, style, type }: Props) {
  console.log({ icon, label, path, style, type });
  
  return (
    <Link
      href={path}
      style={style}
    >
      {type === "navbar" ? (
        <span>{label}</span>
      ) : (
        <>
          {icon}
        </>
      )}
    </Link>
  );
}
