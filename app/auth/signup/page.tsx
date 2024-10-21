import RegisterForm from "@/components/authForms/register.form";
import SignupForm from "@/components/authForms/signup.form";
import { SignupModel } from "@/models/signup.model";

const user: Omit<SignupModel, "gender"> = {
  name: "",
  email: "",
  phone: "",
  confirmPassword: "",
  password: "",
};

function SignupPage() {
  return (
    // <SignupForm user={user}/>
    <RegisterForm user={user} />
  );
}
export default SignupPage;
