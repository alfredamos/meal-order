import { auth } from "@/auth";
import { CSSProperties } from "react";
import { adminDropDownLinks, authLinks, dropDownLinks } from "./navLinks";
import DropDownLinks from "./dropDownLinks.util";
import LoginAndSignupLinks from "./loginAndSignup.util";
import LogoutLink from "./logoutLink.util";
import AdminDropDownLinks from "./adminDropDownLinks";
import HomeLink from "./homeLink";

const inlineBlock: CSSProperties = {
  marginRight: "32px",
};

export const revalidate = 3;

async function NavigationBar() {
  const session = await auth();

  const style = { marginBottom: "8px" };

  console.log("In navbar", { session });
  return (
    <header>
      <nav className="border-solid border-2 border-gray-300 flex justify-between items-center bg-zinc-100 shadow-xl rounded text-black font-semibold py-6 px-4 mt-2">
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
export default NavigationBar;
