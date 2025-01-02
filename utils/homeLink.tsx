"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";
import Image from "next/image";

type Props = {
  path: string;
  image: string;
  name: string;
  style?: CSSProperties;
};
export default function HomeLink({ path, name, image, style }: Props) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <>
      <Link
        href={path}
        style={style}
        className="relative flex gap-4 justify-center items-center"
      >
        <span className="text-base text-black">
          <Image
            src={image}
            alt={name}
            width={50}
            height={50}
            priority
            className="aspect-square object-cover rounded-full"
          />
        </span>
        <span
          className={
            isActive
              ? "text-rose-900 font-semibold mb-2 hover:text-indigo-900 hover:border-b-2 hover:border-indigo-900 hover:font-bold mr-4"
              : "text-black font-semibold mb-2 hover:text-rose-900 hover:font-bold mr-4"
          }
        >
          {name}
        </span>
      </Link>
    </>
  );
}
