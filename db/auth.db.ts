import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";
import prisma from "./prisma.db";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Address, Role, User } from "@prisma/client";
import { AuthResponseModel } from "@/models/authResponse.model";
import { ChangePasswordModel } from "@/models/changePassword.model";
import { EditProfileModel } from "@/models/editProfile.model";
import { LoginModel } from "@/models/login.model";
import { SignupModel } from "@/models/signup.model";
import { UserInfoModel } from "@/models/userInfo.model";
import { UserPayload } from "@/models/userPayload.model";

export class AuthDb {
  constructor() {}

  async changePassword(changePasswordModel: ChangePasswordModel) {
    //----> Destructure the payload.
    const { email, oldPassword, newPassword, confirmPassword } = changePasswordModel;

    //----> Check for password match
    if (!this.matchPassword(newPassword, confirmPassword)) {
      throw catchError(StatusCodes.BAD_REQUEST, "Password must match!");
    }

    //----> Get user from database.
    const user = await this.getUserByEmail(email);

    //----> Check that the old password is correct.
    await this.comparePassword(oldPassword, user.password);
   
    //----> Hash the new password.
    const hashNewPassword = await this.passwordHarsher(newPassword);

    //----> Store the updated user in the database.
    const updatedUser = await prisma.user.update({
      data: { ...user, password: hashNewPassword },
      where: { email },
    });

    const { role, password, ...rest } = updatedUser;

    return rest;
  }

  async currentUser(userId: string) {
    //----> Retrieve the current user from the database.
    const currentUser = await this.getOneUser(userId);

    //----> Remove role and password from the user object.
    const { password, ...rest } = currentUser;

    return rest;
  }

  async deleteAllUserAddressesByUserId(userId: string) {
    //----> Check for availability of user addresses.
    const retrieveAllAddresses = await this.getUserById(userId, true);

    //----> Delete the user credentials from the database.
    await prisma.user.update({
      where: { id: userId },
      data: {
        ...retrieveAllAddresses,
        addresses: {
          deleteMany: {},
        },
      },
      include: {
        addresses: true,
      },
    });
    //----> Clean up the user credentials.
    await prisma.user.delete({ where: { id: userId } });
  }

  async deleteOneAddressByUserId(addressId: string, userId: string) {
    //----> Check for the existence of user in the database.
    const { addresses, ...rest } = await this.getUserById(userId, true);
    //----> Filter out the cart-item to be deleted.
    const filteredAddresses = this.addressFilter(addresses, addressId);

    //----> Delete the user info from the database.
    const deletedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...filteredAddresses,
        addresses: {
          deleteMany: [{ id: addressId }],
        },
      },
      include: {
        addresses: true,
      },
    });
    //----> Check to see if there is any cart-item left.
    if (filteredAddresses.length === 0) {
      //----> Delete the user.
      console.log("No more cart-item to delete");
      await prisma.user.delete({ where: { id: userId } });
      return {} as User;
    }
    return deletedUser;
  }

  async editAllAddressesByUserId(userId: string, userPayload: UserPayload) {
    //----> Check for the existence of user in the db.
    await this.getUserById(userId);
    //----> Get the userToEdit from the request body.
    const { addresses, ...rest } = userPayload;

    //----> Store the edited user info in the database.
    const editedUser = await prisma.user.update({
      where: { id: userId },
      data: { ...rest },
    });
    //----> Edit all addresses.
    const updatedAddresses = await this.updateAllAddresses(addresses, userId);

    return { updatedAddresses, editedUser };
  }

  async editOneAddressByUserId(addressId: string, userId: string, userPayload: UserPayload) {
    //----> Destructure the user payload.
    const { addresses, ...user } = userPayload;
    //----> Check for the existence of user in the db.
    await this.getUserById(userId);

    //----> Filter out the address to edit.
    const addressToEdit = this.addressFilter(addresses, addressId);

    //----> Store the edited user info in the database.
    const editedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...user,
        addresses: {
          update: {
            where: { id: addressId, userId: userId },
            data: { ...addressToEdit },
          },
        },
      },
      include: {
        addresses: true,
      },
    });

    return editedUser;
  }

  async editProfile(editProfileModel: EditProfileModel) {
    //----> Destructure the payload.
    const { email, password, ...rest } = editProfileModel;

    //----> Get the user from database.
    const user = await this.getUserByEmail(email);

    //----> Compare the new password with old password.
    await this.comparePassword(password, user.password);

    //----> Store the updated user in the database.
    const updatedUser = await prisma.user.update({
      data: { ...rest, password: user.password },
      where: { email },
    });

    const { role, password: userPassword, ...restOfData } = updatedUser;

    return restOfData;
  }

  async login(loginModel: LoginModel) {
    //----> Destructure the payload.
    const { email, password } = loginModel;

    //----> Get the user from database.
    const user = await this.getUserByEmail(email);

    //----> Compare the new password with old password.
    await this.comparePassword(password, user.password);

    //----> Get json web token.
    const token = this.getJsonToken(user.id, user.name, user.role);

    const { password: userPassword, role, ...restOfData } = user;

    const authResponse: AuthResponseModel = {
      user: restOfData as User,
      token,
      isLoggedIn: true,
      isAdmin: user?.role === Role.Admin,
    };

    return authResponse;
  }

  async signup(signupModel: SignupModel) {
    //----> Destructure the payload.
    console.log("In signup-db, user : ", signupModel)
    const { email, password, confirmPassword, ...rest } = signupModel;

    //----> Check for password match, check for existence of user.
    await this.signupUtil(confirmPassword, email, password);

    //----> Hash the new password.
    const hashNewPassword = await this.passwordHarsher(password);

    //----> Store the new user in the database.
    const newUser = await prisma.user.create({
      data: { ...rest, password: hashNewPassword, email },
    });

    const { password: userPassword, ...restOfData } = newUser;

    return restOfData;
  }

  async signupWithMultipleAddresses(userPayload: UserPayload) {
    //----> Destructure the userWithAddressesPayload.
    const { addresses, ...user } = userPayload;
    console.log({ userPayload });

    //----> Destructure the user part of the payload.
    const { email, password, confirmPassword, ...rest } = user;

    //----> Check for password match, check for existence of user.
    await this.signupUtil(confirmPassword, email, password);
    //----> Hash the new password.
    const hashNewPassword = await this.passwordHarsher(password);

    //----> Store the new user in the database.
    const newUser = await prisma.user.create({
      data: {
        ...rest,
        password: hashNewPassword,
        email,
        addresses: {
          create: [...addresses],
        },
      },
      include: {
        addresses: true,
      },
    });

    const { password: userPassword, ...restOfData } = newUser;

    return restOfData;
  }

  async updateUserRole(userInfo: UserInfoModel, email: string, role: Role) {
    //----> Check for admin rights.
    const isAdmin = userInfo?.role;

    if (!isAdmin) {
      throw catchError(
        StatusCodes.FORBIDDEN,
        "You are not permitted to perform this task!"
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    //----> Check if user exist.
    if (!user) {
      throw catchError(
        StatusCodes.NOT_FOUND,
        "This user is not in the database!"
      );
    }

    //----> Make the user an admin.
    const userUpdated = await prisma.user.update({
      where: { email },
      data: { ...user, role },
    });

    const { password, ...restOfData } = userUpdated; //----> Do not send back the password.

    return restOfData;
  }

  private async updateAllAddresses(addresses: Address[], userId: string) {
    const addressesUpdater = addresses?.map(async (address) => {
      return await prisma.address.update({
        data: { ...address },
        where: { id: address.id, userId },
      });
    });

    //----> Update all addresses with Promise All.
    const updateAllAddresses = await Promise.all(addressesUpdater);

    return updateAllAddresses;
  }

  private addressFilter(addresses: Address[], addressId: string): Address[] {
    return addresses?.filter((address) => address.id !== addressId);
  }

  private matchPassword(newPassword: string, oldPassword: string) {
    const isMatch = newPassword.normalize() === oldPassword.normalize();

    return isMatch;
  }

  private async getUserById(id: string, includeAddresses: boolean = false) {
    //----> Get the user.
    const user = await prisma.user.findUnique({
      where: { id },
      include: { addresses: includeAddresses },
    });
    //----> Check for existence of user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "Invalid credentials!");
    }

    return user;
  }

  private async getOneUser(id: string) {
    //----> Get the user.
    const user = await prisma.user.findUnique({
      where: { id },
    });
    //----> Check for existence of user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "Invalid credentials!");
    }

    return user;
  }

  private async getUserByEmail(email: string) {
    //----> Get user from database.
    const user = await prisma.user.findUnique({ where: { email } });

    //----> Check for existence of user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "Invalid credentials!");
    }

    return user;
  }

  private async comparePassword(oldPassword: string, oldPasswordHashed: string) {
    //----> Compare the new password with old password.
    const isMatch = await bcrypt.compare(oldPassword, oldPasswordHashed);

    //----> Check if the two passwords match.
    if (!isMatch) {
      throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }

    return isMatch;
  }

  private async passwordHarsher(newPassword: string) {
    //----> Hash the new password.
    return await bcrypt.hash(newPassword, 12);
  }

  private async signupUtil(
    confirmPassword: string,
    email: string,
    password: string
  ) {
    //----> Check for password match
    if (!this.matchPassword(password, confirmPassword)) {
      throw catchError(StatusCodes.BAD_REQUEST, "Password must match!");
    }

    //----> Get user from database.
    const user = await prisma.user.findUnique({ where: { email } });

    //----> Check for existence of user.
    if (user) {
      throw catchError(StatusCodes.BAD_REQUEST, "User already exists!");
    }
  }

  private getJsonToken(id: string, name: string, role: Role) {
    const token = jwt.sign(
      {
        id,
        name,
        role,
      },
      process.env.JWT_TOKEN_SECRET!,
      { expiresIn: "24hr" }
    );

    return token;
  }
}

export const authDb = new AuthDb();
