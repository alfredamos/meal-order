import { ReactNode } from "react";
import { FaHome, FaEdit, FaUserEdit,  FaUsers } from 'react-icons/fa';    
import { GiFullPizza } from "react-icons/gi";
import { RiLoginBoxLine } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";

export type NavLinkType = {
  path: string;
  label: string;
  icon?: ReactNode;
};

export type SideLinkType = NavLinkType & {
  admin: boolean;
  icon: ReactNode;
}

export const adminDropDownLinks: NavLinkType[] = [
  {
    path: "/pizzas/list",
    label: "Pizzas",
  },
  {
    path: "/users",
    label: "Users",
  },
];
export const dropDownLinks: NavLinkType[] = [
  {
    path: "/auth/change-password",
    label: "Edit Password",
  },
  {
    path: "/auth/edit-profile",
    label: "Edit Profile",
  },
];
export const authLinks: NavLinkType[] = [
  {
    path: "/auth/login",
    label: "Login",
    icon: <RiLoginBoxLine size={40} color="blue" />,
  },
  {
    path: "/auth/signup",
    label: "Signup",
    icon: <SiGnuprivacyguard size={40} color="blue" />,
  },
];

export const sideLinks: SideLinkType[] = [
  {
    path: "/",
    label: "Home",
    admin: false,
    icon: <FaHome size={40} />,
  },
  {
    path: "/auth/change-password",
    label: "Edit Password",
    admin: false,
    icon: <FaEdit size={40}/>,
  },
  {
    path: "/auth/edit-profile",
    label: "Edit Profile",
    admin: false,
    icon: <FaUserEdit size={40} />,
  },
  {
    path: "/pizzas/list",
    label: "Pizzas",
    admin: true,
    icon: <GiFullPizza size={40} />,
  },
  {
    path: "/users",
    label: "Users",
    admin: true,
    icon: <FaUsers size={40} />,
  },
];
