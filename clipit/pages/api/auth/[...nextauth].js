import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "@lib/passwordUtils";
import { exclude } from "@lib/filterUser";
import { PrismaClient } from "@prismaAuthClient"

const prisma = new PrismaClient()

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const _user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!_user) {
          return null;
        }

        const user = exclude(_user, ["password"]);

        if (
          user &&
          (await comparePassword(credentials.password, _user.password))
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  cors: {
    origin: process.env.URL,
  },
};

export default NextAuth(authOptions);
