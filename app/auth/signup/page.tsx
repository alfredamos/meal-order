import MemberForm from "@/components/authForms/member.form";
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
    <MemberForm/>
  );
}
export default SignupPage;
