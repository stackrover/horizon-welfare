import { auth } from "@/auth";
import { NextResponse } from "next/server";

const authRoutes = [
  "/login",
  "/signup/volunteer",
  "/signup/donor",
  "/reset-password",
  "/reset-password/success",
  "/forgot-password",
  "/forgot-password/email-sent",
];

export default auth((req) => {
  // validate protected routes
  const protectedRoles = ["donor", "volunteer", "staff"];
  const isProtectedRoute = protectedRoles.some((role) =>
    req.nextUrl.pathname.startsWith(`/${role}`),
  );
  const isAuthRoute = authRoutes.indexOf(req.nextUrl.pathname) !== -1;

  console.log({ isProtectedRoute, auth: req?.auth, isAuthRoute });

  if (!req.auth && isProtectedRoute) {
    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (isProtectedRoute) {
      const newUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }
  }

  if (req.auth && req.auth?.user) {
    const { role } = req.auth.user;

    const redirectMap: { [key: string]: string } = {
      staff: "/admin/dashboard",
      donor: "/donor/profile",
      volunteer: "/volunteer/profile",
    };

    if (authRoutes.indexOf(req.nextUrl.pathname) !== -1) {
      const newUrl = new URL(redirectMap[role], req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }

    const roleProtectedRoutes: { [key: string]: string[] } = {
      staff: ["donor", "volunteer"],
      donor: ["volunteer", "staff"],
      volunteer: ["donor", "staff"],
    };

    if (
      roleProtectedRoutes[role].some((d) =>
        req.nextUrl.pathname.split("/").includes(d),
      )
    ) {
      const newUrl = new URL(redirectMap[role], req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
