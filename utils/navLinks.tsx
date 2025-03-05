import { ReactNode } from "react";
import { FaHome, FaEdit, FaUserEdit, FaUsers } from "react-icons/fa";
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
};

export const adminDropDownLinks: NavLinkType[] = [
  {
    path: "/admin/orders/all-orders",
    label: "All Orders",
  },
  {
    path: "/admin/orders/delivered-orders",
    label: "Delivered Orders",
  },
  {
    path: "/admin/orders/pending-orders",
    label: "Pending Orders",
  },
  {
    path: "/admin/orders/shipped-orders",
    label: "Shipped Orders",
  },
  {
    path: "/admin/pizzas/list",
    label: "Pizzas",
  },
  {
    path: "/admin/users",
    label: "Users",
  },
];
export const dropDownLinks: NavLinkType[] = [
  {
    path: "/protected/auth/change-password",
    label: "Edit Password",
  },
  {
    path: "/protected/auth/edit-profile",
    label: "Edit Profile",
  },
  {
    path: "/protected/orders/my-orders",
    label: "My Orders",
  },
];
export const authLinks: NavLinkType[] = [
  {
    path: "/open/auth/login",
    label: "Login",
    icon: <RiLoginBoxLine size={40} color="blue" />,
  },
  {
    path: "/open/auth/signup",
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
    path: "/protected/auth/change-password",
    label: "Edit Password",
    admin: false,
    icon: <FaEdit size={40} />,
  },
  {
    path: "/protected/auth/edit-profile",
    label: "Edit Profile",
    admin: false,
    icon: <FaUserEdit size={40} />,
  },
  {
    path: "/admin/pizzas/list",
    label: "Pizzas",
    admin: true,
    icon: <GiFullPizza size={40} />,
  },
  {
    path: "/admin/users",
    label: "Users",
    admin: true,
    icon: <FaUsers size={40} />,
  },
];
