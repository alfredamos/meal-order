import { logoutAction } from "@/actions/auth.action";
import { CSSProperties } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

type Props = {
  style: CSSProperties;
  type: "sideBar" | "dropDown";
}

export default function LogoutLink({ style, type }: Props) {
  return (
    <form action={logoutAction}>
      <button type="submit" style={style} className="text-indigo-900 font-semibold">
        { type === "sideBar"? 
        <RiLogoutBoxLine
          size={40}
          className="inline-block ml-2"
        />
        : "Logout"
}
      </button>
    </form>
  );
}