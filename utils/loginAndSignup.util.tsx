import { CSSProperties } from "react";
import NavLink from "./navLink.util";
import { NavLinkType } from "./navLinks";

const inlineBlock: CSSProperties = {
  marginRight: "32px",
};

export type Props = {
  authLinks: NavLinkType[];
};
export default function AuthLinks({ authLinks }: Props) {
  return (
    <>
      {authLinks?.map((link) => {
        return (
          <NavLink
            path={link.path}
            label={link.label}
            style={inlineBlock}
            key={link.path}
          />
        );
      })}
      l
    </>
  );
}
