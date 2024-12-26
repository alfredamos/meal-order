import { auth } from "@/auth";
import Link from "next/link";
import { CSSProperties } from "react";
import LogoutLink from "./logoutLink.util";
import LoginAndSignupLinks from "./loginAndSignup.util";
import { authLinks } from "./navLinks";

const inlineBlock: CSSProperties = {
  marginRight: "32px",
};

export default async function NavigationBar() {
  const session = await auth();
  const admin = session?.user?.role === "Admin";
  return (
    // <div className="navbar bg-base-300 rounded-box">
    <div className="navbar bg-white text-black rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <Link href="/" className="text-lg font-bold">
          <span className="mr-4">Meal Order</span>
          <span></span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end px-2">
        <div className="flex items-stretch">
          {session?.user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost rounded-btn"
                >
                  Dropdown
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
                >
                  <li>
                    <Link href="/auth/change-password">Change Password</Link>
                  </li>
                  <li>
                    <Link href="/auth/edit-profile">Edit Profile</Link>
                  </li>
                  {admin && (
                    <>
                      <li>
                        <Link href="/pizzas">Pizzas</Link>
                      </li>
                      <li>
                        <Link href="/users">Users</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
<<<<<<< HEAD
              <LogoutLink style={inlineBlock} />
            </>
          ) : (
            <LoginAndSignupLinks authLinks={authLinks} />
=======
              <LogoutLink style={inlineBlock} type="dropDown" />
            </>
          ) : (
            <LoginAndSignupLinks authLinks={authLinks} type="sideBar" />
>>>>>>> 4a9352fb424501ac5b0468491a6843f959db890f
          )}
        </div>
      </div>
    </div>
  );
}
