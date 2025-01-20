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
  const protectedRoles = ["donor", "volunteer", "admin"];
  const isProtectedRoute = protectedRoles.some((role) =>
    req.nextUrl.pathname.startsWith(`/${role}`),
  );
  const isAuthRoute = authRoutes.indexOf(req.nextUrl.pathname) !== -1;

  if (!req.auth && req.nextUrl.pathname.startsWith("/donor/donate")) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

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
      donor: "/donor/profile",
      volunteer: "/volunteer/profile",
      admin: "/admin/dashboard",
    };

    if (authRoutes.indexOf(req.nextUrl.pathname) !== -1) {
      const newUrl = new URL(redirectMap[role], req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }

    const roleProtectedRoutes: { [key: string]: string[] } = {
      donor: ["volunteer", "admin"],
      volunteer: ["donor", "admin"],
      admin: ["donor", "volunteer"],
    };

    if (
      roleProtectedRoutes[role]?.some((d) =>
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
