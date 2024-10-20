import Link from "next/link";
import { CSSProperties } from "react";

type Props = {
  path: string;
  label: string;
  style?: CSSProperties;
};
export default function NavLink({ label, path, style }: Props) {
  return (
    <Link
      href={path}
      style={style}
    >
      {label}
    </Link>
  );
}
