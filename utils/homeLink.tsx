import Link from "next/link";
import { CSSProperties } from "react";

type Props = {
  path: string;
  label: string;
  name: string;
  style?: CSSProperties;
};
export default function HomeLink({ path, name, label, style }: Props) {

 
  return (
    <Link
      href={path}
      
      style={style}
    >
      <span className="mr-4 ">{label}</span>
      <span>{name}</span>
    </Link>
  );
}
