import { logoutAction } from "@/actions/auth.action";
import { CSSProperties } from "react";

type Props = {
  style: CSSProperties;
}

export default function LogoutLink({ style }: Props) {
  return (
    <form action={logoutAction}>
      <button type="submit" style={style} className="text-black font-semibold">
        Logout
      </button>
    </form>
  );
}