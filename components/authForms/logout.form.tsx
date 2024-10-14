import { loginAction } from "@/actions/auth.action";

export default function LogoutForm() {
  return (
    <form
      action={loginAction}
      className="flex justify-center items-center bg-white text-black"
    >
      <button type="submit">Log out</button>
    </form>
  );
}
