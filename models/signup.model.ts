import { Gender } from "@prisma/client";

export class SignupModel{
  name: string = "";
  email: string = "";
  phone: string = "";
  gender: Gender = Gender.Male;
  confirmPassword: string = "";
  password: string = "";
}