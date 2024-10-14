export type NavLinkType = {
  path: string;
  label: string;
}


export const dropDownLinks: NavLinkType[] = [
  {
    path: "/auth/change-password",
    label: "Change Password",
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