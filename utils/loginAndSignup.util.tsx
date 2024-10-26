import { CSSProperties } from "react";
import NavLink from "./navLink.util";
import { NavLinkType } from "./navLinks";

const inlineBlock: CSSProperties = {
  marginRight: "32px",
};

export type Props = {
  authLinks: NavLinkType[];
  type: "navbar" | "sideBar";
};
export default function AuthLinks({ authLinks, type }: Props) {
  return (
    <>
      {authLinks?.map((link) => {
        return (
          <NavLink
            path={link.path}
            label={link.label}
            style={inlineBlock}
            key={link.path}
            type={type}
            icon={link.icon}
          />
        );
      })}
    </>
  );
}
