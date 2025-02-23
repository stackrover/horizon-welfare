import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginAction } from "./app/actions/authActions";
import { loginFormSchema } from "./schemas/loginFromSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        let user = null;

        const parsedCredentials = loginFormSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        // get user from api call
        const data = await loginAction(parsedCredentials.data);

        if (data.status !== "success") return null;

        user = {
          id: data.results.id,
          name: "John Doe",
          email: data.results.email,
          role: data.results.base_role,
          token: data.accessToken,
          permissions: data.permissions,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
        token.token = user.token as string;
        token.permissions = user.permissions;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.token = token.token;
        session.user.permissions = token.permissions;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
