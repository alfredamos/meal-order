import { logoutAction } from "@/actions/auth.action";
import { auth } from "@/auth";
import { CSSProperties } from "react";
import { authLinks, dropDownLinks } from "./navLinks";
import DropDownLinks from "./dropDownLinks.util";
import NavLink from "./navLink.util";
import LoginAndSignupLinks from "./loginAndSignup.util";
import LogoutLink from "./logoutLink.util";

const inlineBlock: CSSProperties = {
  marginRight: "32px",
};

export const revalidate = 3;

async function NavigationBar() {
  const session = await auth();
  console.log("In navbar", { session });
  return (
    <nav className="flex justify-between items-center bg-white shadow-xl rounded-lg text-black h-8 font-semibold p-6">
      <NavLink path="/" label="Home" />
      <div className="flex items-center space-x-6">
        {session?.user ? (
          <>
            <details className="dropdown" style={inlineBlock}>
              <summary>Settings</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <DropDownLinks navLinks={dropDownLinks} />
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
