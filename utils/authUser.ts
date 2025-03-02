import { auth } from "@/auth"
import { Role, User } from "@prisma/client";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { isAuthenticated } from "./authenticatedUsers";
import { isAdminRoute } from './adminRoutes';

export function authUser() {

  async function getUserAuth() {
    //----> Get the current user and his login status.                                               .
    const { isLoggedIn, user } = await isUserAuthenticated();

    //----> Check for existence of user.
    if (!isLoggedIn) {
      return createError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }

    //----> send back the current user.
    return user;
  }

  async function getAuthInfo(isAdminRoute: boolean) {
    //----> Get the current user and his admin status.                                               .
    const { isAdmin, isLoggedIn, user } = await isUserAdmin();

    //----> Check for authentication.
    if (!isLoggedIn) {
      return createError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }

    //----> Check for admin status.
    if (!isAdmin && isAdminRoute) {
      return createError(StatusCodes.FORBIDDEN, "you are not permitted to view this page!");
    }

    //----> Send back the current user.
    return { isAdmin, isLoggedIn, user };
  }

  async function getAdminAuth() {
    //----> Get the current user and his admin status.                                               .
    const { isAdmin, user } = await isUserAdmin();

    //----> Check for admin status.
    if (!isAdmin) {
      return createError(StatusCodes.FORBIDDEN, "you are not permitted to view this page!");
    }

    //----> Send back the current user.
    return user;
  }

  async function isUserAdmin() {
    //----> Get the current user.                                               .
    const { user } = await getUser();
    //----> Get the user role.
    const role = user?.role;

    //----> Login status of user.
    const isLoggedIn = isAuthenticated(role!);
    //----> Check for admin privilege.
    const isAdmin = role === Role.Admin;
    //----> Send back response
    return { isAdmin, isLoggedIn, user }
  }

  async function isUserAuthenticated() {
    //----> Get the current user.                                               .
    const { user } = await getUser();

    //----> Get the user role.
    const role = user?.role;

    //----> Login status of user.
    const isLoggedIn = isAuthenticated(role!);

    return { isLoggedIn, user }
  }

  async function getUserId() {
    //----> Get the current user.
    const { user } = await getUser();

    //----> send back the id of user.
    return user?.id;
  }

  async function getUser() {
    //----> Get session from auth.
    const session = await auth();

    //----> get the user from the session.
    const user = session?.user;

    return { user };
  }

  return {
    getAdminAuth,
    getAuthInfo,
    getUserAuth,
    getUser,
    getUserId,
    isUserAuthenticated,
    isUserAdmin

  }
} 