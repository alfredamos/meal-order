import { logoutAction } from "@/actions/auth.action";
import { auth } from "@/auth";
import { CSSProperties } from "react";
import { adminDropDownLinks, authLinks, dropDownLinks } from "./navLinks";
import DropDownLinks from "./dropDownLinks.util";
import NavLink from "./navLink.util";
import LoginAndSignupLinks from "./loginAndSignup.util";
import LogoutLink from "./logoutLink.util";
import AdminDropDownLinks from "./adminDropDownLinks";
import HomeLink from "./homeLink";
import SignupPage from "../app/auth/signup/page";

const inlineBlock: CSSProperties = {
  marginRight: "32px",
};

export const revalidate = 3;

async function NavigationBar() {
  const session = await auth();

  console.log("In navbar", { session });
  return (
    <nav className="flex justify-between items-center bg-white shadow-xl rounded text-black font-semibold p-6">
      <HomeLink path="/" label="Home" name={session?.user?.name as string} />
      <div className="flex items-center space-x-6 mr-2">
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
            <LogoutLink style={inlineBlock} />
          </>
        ) : (
          <LoginAndSignupLinks authLinks={authLinks} />
        )}
      </div>
    </nav>
  );
}
export default NavigationBar;
