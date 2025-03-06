import { auth } from "@/auth";
import LogoutLink from "./logoutLink.util";
import { CSSProperties} from "react";
import SideBarLink from "./sideBarLink.util";
import { Role } from "@prisma/client";
import { sideLinks } from "./navLinks";
import NavLink from "./navLink.util";
import { FaUser } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";


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

  return (
    <aside className="w-70 font-semibold mr-6">
      {session?.user ? (
        <ul className="flex flex-col space-y-10 mt-10 text-semibold">
          {sideLinks.map(({ path, label, icon, admin }) =>
            admin && isAdmin ? (
              <SideBarLink
                path={path}
                label={label}
                style={margins}
                icon={icon}
                key={path}
              />
            ) : (
              !admin && (
                <SideBarLink
                  path={path}
                  label={label}
                  style={margins}
                  icon={icon}
                  key={path}
                />
              )
            )
          )}

          <li className="px-4 mb-10" style={marginBottom}>
            <LogoutLink style={inlineBlock} type="sideBar" />
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col justify-end items-center mt-10 font-semibold text-indigo-900">
          <li className="px-4" style={{ marginBottom: "80px" }}>
            <NavLink path="/open/auth/signup" label="Signup" style={inlineBlock} type="sideBar" icon={<FaUser size={40} />} />
          </li>
          <li className="px-4" style={marginBottom}>
            <NavLink path="/open/auth/login" label="Login" style={inlineBlock} type="sideBar" icon={<RiLoginBoxLine size={40}/>} />
          </li> 
        </ul>
      )}
    </aside>
  );
}
