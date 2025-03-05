import { NextRequest, NextResponse } from "next/server";
import { isPublicRoutes } from "./utils/publicRoute";
import { isAdminRoute } from "./utils/adminRoutes";
import { authUser } from "./utils/authUser";
import { isProtectedRoute } from './utils/protectedRoute';
import { StatusCodes } from "http-status-codes";

export async function middleware(request: NextRequest) {
  //----> Get the authentication and admin user functions from auth-user
  const { getAuthInfo } = authUser();

  //-----> Get the current route.
  const { nextUrl } = request;

  //----> Get the path.
  const path = nextUrl.pathname;
  //----> Public routes.
  const isPublic = isPublicRoutes(path);
  //----> Admin routes.
  const isRouteOfAdmin = isAdminRoute(path);
  //----> Protected routes.
  const isProtected = isProtectedRoute(path);

  //----> Get authenticated and admin flag.
  const { isAdmin, isLoggedIn } = await getAuthInfo(isRouteOfAdmin);

  console.log({ isLoggedIn, isAdmin, isPublic, isRouteOfAdmin, isProtected })

  //----> Public route case-1.
  if (isPublic) {
    console.log("Case 1, public route!", path);
    return NextResponse.next();
  }

  //----> User authenticated case-2-A.
  if (isLoggedIn && isProtected) {
    console.log("Case 2-A, protected route and authenticated!", path);
    return NextResponse.next()
  }

  //----> User authenticated case-2-B.
  if (isLoggedIn && nextUrl.pathname.startsWith('/pizzas')) {
    console.log("Case 2-B, protected route and authenticated!", path);
    return NextResponse.next()
  }

  //----> Admin user Only case-3.
  if (isRouteOfAdmin && isAdmin) {
    console.log("Case 3, admin route and admin user!", path);
    return NextResponse.next()
  }

  //----> Check for authentication, not public and not authenticated case-4.
  if (!isPublic && !isLoggedIn && isProtected) {
    console.log("Case 4, not public route, not authenticated!", path);
    console.log({ path });
    return NextResponse.json({
      statusCode: StatusCodes.UNAUTHORIZED,
      statusMessage: "Invalid credentials, please login!"
    })
  }

  //----> Authenticated case-5.
  if (isLoggedIn && !isAdmin && isRouteOfAdmin) {
    console.log("Case 5, authenticated but not admin", path);
    return NextResponse.json({
      statusCode: StatusCodes.FORBIDDEN,
      statusMessage: "You are not allowed on this page!"
    })
  }

  //----> Not public nor authenticated nor admin case-6.
  if (!isPublic && !isAdmin && isRouteOfAdmin) {
    console.log("Case 6, not public route, not authenticated and not admin", path);
    return NextResponse.json({
      statusCode: StatusCodes.UNAUTHORIZED,
      statusMessage: "Invalid credentials, please login!"
    })
  }

  //----> Not public nor authenticated nor admin nor admin-route and not protected-route case-7.
  if (!isLoggedIn && !isAdmin && !isPublic && !isRouteOfAdmin && !isProtected) {
    console.log("Case 7, all flags are false!", path)
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  //----> All others case-8
  console.log("Case 8, in the middle of no where", path)
  return NextResponse.redirect(new URL('/login', nextUrl))

}


// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}