import { NextRequest, NextResponse } from "next/server";
import { isPublicRoutes } from "./utils/publicRoute";
import { isAdminRoute } from "./utils/adminRoutes";
import { authUser } from "./utils/authUser";
import { isProtectedRoute } from './utils/protectedRoute';
import { StatusCodes } from "http-status-codes";

export async function middleware(request: NextRequest) {
  //----> Get the authentication and admin user functions from auth-user
  const { isUserAuthenticated,
    isUserAdmin } = authUser();
    
  //-----> Get the current route.
  const { nextUrl } = request; 

  //----> Get the login status of user
  const { isLoggedIn } = await isUserAuthenticated();
  
  //----> Get admin-user
  const { isAdmin: adminUser } = await isUserAdmin()

  //----> Get the path.
  const path = nextUrl.pathname; 
  //----> Public routes.
  const isPublic = isPublicRoutes(path); 
  //----> Admin routes.
  const isRouteOfAdmin = isAdminRoute(path);
  //----> Protected routes.
  const isProtected = isProtectedRoute(path);

  console.log({ isLoggedIn, adminUser, isPublic, isRouteOfAdmin, isProtected })

  //----> Public route case-1.
  if (isPublic) {
    console.log("Case 1, public route!", path);
    return NextResponse.next();
  }

  //----> User authenticated case-2.
  if (isLoggedIn && isProtected) {
    console.log("Case 2, protected route and authenticated!", path);
    return NextResponse.next()
  }

  //----> Admin user Only case-3.
  if (isRouteOfAdmin && adminUser) {
    console.log("Case 3, admin route and admin user!", path);
    return NextResponse.next()
  }

  //----> Check for authentication, not public and not authenticated case-4.
  if (!isPublic && !isLoggedIn) {
    console.log("Case 4, not public route, not authenticated!", path);
    console.log({ path });
    return NextResponse.json({
      statusCode: StatusCodes.UNAUTHORIZED,
      statusMessage: "Invalid credentials, please login!"
    })
  }

  //----> Not public nor authenticated nor admin case-5.
  if (!isPublic && !isLoggedIn && !adminUser) {
    console.log("Case 5, not public route, not authenticated and not admin", path);
    return NextResponse.json({
      statusCode: StatusCodes.UNAUTHORIZED,
      statusMessage: "Invalid credentials, please login!"
    })
  }

  //----> Authenticated case-6.
  if (isLoggedIn && !adminUser && isRouteOfAdmin) {
    console.log("Case 6, authenticated but not admin", path);
    return NextResponse.json({
      statusCode: StatusCodes.FORBIDDEN,
      statusMessage: "You are not allowed on this page!"
    })
  }

  console.log("Case 7, in the middle of no where", path)
  return NextResponse.json({
    statusCode: StatusCodes.BAD_REQUEST,
    statusMessage: "Bad request"
  })
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}