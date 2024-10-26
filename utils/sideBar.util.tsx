import { auth } from "@/auth";
import Link from "next/link";
import LogoutLink from "./logoutLink.util";
import { CSSProperties } from "react";
import { sideLinks } from "./navLinks";
import SideBarLink from "./sideBarLink.util";
import { Role } from "@prisma/client";

const margins: CSSProperties = {
  marginLeft: "25px",
  marginBottom: "60px",
};
const inlineBlock: CSSProperties = {
  marginRight: "32px",
};

const marginBottom: CSSProperties = {
  marginBottom: "40px",
};

export default async function SideBar() {
  const session = await auth();
  const isAdmin = session?.user?.role === Role.Admin;

  console.log("isAdmin : ", isAdmin);
  return (
    <aside className="w-70 font-semibold mr-6">
      {session?.user ? (
        <ul className="flex flex-col space-y-10 mt-10 text-semibold">
          {sideLinks.map((link) =>
            link.admin && isAdmin ? (
              <SideBarLink
                path={link.path}
                label={link.label}
                style={margins}
                key={link.path}
              />
            ) : (
              !link.admin && (
                <SideBarLink
                  path={link.path}
                  label={link.label}
                  style={margins}
                  key={link.path}
                />
              )
            )
          )}

          <li className="px-4 mb-10" style={marginBottom}>
            <LogoutLink style={inlineBlock} />
          </li>
        </ul>
      ) : (
        // <ul className="flex flex-col items-stretch mt-10 font-semibold text-base">
        <ul className="flex flex-col items-stretch mt-10 font-semibold">
          <li className="px-4" style={{ marginBottom: "80px" }}>
            <Link href="/auth/login" className="text-black">
              Login
            </Link>
          </li>
          <li className="px-4">
            <Link href="/auth/signup" className="text-black">
              Signup
            </Link>
          </li>
        </ul>
      )}
    </aside>
  );
}
