import { auth } from "@/auth";

export default auth((req) => {
  console.log({ auth: req.auth });

  // validate protected routes
  const isProtectedRoute = req.nextUrl.pathname
    .split("/")
    .some((d) => ["donor", "volunteer", "staff"].includes(d));

  if (!req.auth && isProtectedRoute) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth) {
    const { role } = req.auth.user;

    const redirectMap: { [key: string]: string } = {
      staff: "/staff/dashboard",
      donor: "/donor/profile",
      volunteer: "/volunteer/profile",
    };

    if (req.nextUrl.pathname === "/login") {
      const newUrl = new URL(redirectMap[role], req.nextUrl.origin);
      return Response.redirect(newUrl);
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
      return Response.redirect(newUrl);
    }
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
