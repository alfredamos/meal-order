"use client";

import { Session } from "next-auth";
import AdminDropDownLinks from "./adminDropDownLinks";
import DropDownLinks from "./dropDownLinks.util";
import HomeLink from "./homeLink";
import LogoutLink from "./logoutLink.util";
import LoginAndSignupLinks from "./loginAndSignup.util";
import { dropDownLinks, adminDropDownLinks, authLinks } from "./navLinks";
import { useCart } from "@/features/cartItemSlice";
import { CSSProperties } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";

const inlineBlock: CSSProperties = {
  marginRight: "32px",
};

type Props = {
  session: Session | null;
};

export default function NavElements({ session }: Props) {
  const { storedCartItems } = useLocalStorage();
  console.log("local-storage, cart-items : ", { storedCartItems });
  const cartItems = useCart().cartItems ?? storedCartItems;

  const totalQuantity = cartItems?.reduce(
    (accumulator, current) => current.quantity + accumulator,
    0
  );

  return (
    <header>
      <nav className="border-solid border-2 border-gray-300 flex justify-between items-center bg-zinc-100 shadow-xl rounded text-black font-semibold py-6 px-4 mt-2">
        <div
          className={
            session && totalQuantity > 0
              ? "relative  bg-red-500 rounded-full text-red-100 px-4 py-2 font-semibold"
              : "hidden"
          }
        >
          <div
            className={
              session || totalQuantity === 0
                ? "absolute top-0 right-0"
                : "hidden"
            }
          >
            <Link href="/orders/cart">
              {totalQuantity ? totalQuantity : undefined}
            </Link>
          </div>
        </div>
        <HomeLink path="/" label="Home" name={session?.user?.name as string} />
        <div className="flex items-center gap-2 mr-2">
          {session?.user ? (
            <>
              <details className="dropdown" style={inlineBlock}>
                <summary>Settings</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <DropDownLinks navLinks={dropDownLinks} />
                  {session?.user?.role === "Admin" && (
                    <AdminDropDownLinks navLinks={adminDropDownLinks} />
                  )}
                </ul>
              </details>
              <LogoutLink style={inlineBlock} type="dropDown" />
            </>
          ) : (
            <LoginAndSignupLinks authLinks={authLinks} type="navbar" />
          )}
        </div>
      </nav>
    </header>
  );
}
