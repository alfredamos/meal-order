export type NavLinkType = {
  path: string;
  label: string;
};

export type SideLinkType = NavLinkType & {
  admin: boolean;
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
  },
  {
    path: "/auth/signup",
    label: "Signup",
  },
];

export const sideLinks: SideLinkType[] = [
  {
    path: "/",
    label: "Home",
    admin: false
  },
  {
    path: "/auth/change-password",
    label: "Edit Password",
    admin: false
  },
  {
    path: "/auth/edit-profile",
    label: "Edit Profile",
    admin: false
  },
  {
    path: "/pizzas/list",
    label: "Pizzas",
    admin: true
  },
  {
    path: "/users",
    label: "Users",
    admin: true
  },
];
