import { Gender } from "@prisma/client";

export class EditProfileModel{
  name: string = "";
  email: string = ""; 
  phone: string = "";
  gender: Gender = Gender.Male;
  password: string = ""; 
}