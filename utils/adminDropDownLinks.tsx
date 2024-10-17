import DropDownLink from "./dropDownLink.util";
import { NavLinkType } from "./navLinks";

type Props = {
  navLinks: NavLinkType[];
};
export default function AdminDropDownLinks({ navLinks }: Props) {
  return (
    <>
      {navLinks?.map((link) => {
        return (
          <DropDownLink
            path={link.path}
            label={link.label}
            key={link.path}
          />
        );
      })}
    </>
  );
}
