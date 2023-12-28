import { NextAuthOptions } from 'next-auth';
import defaultAvatar from "../src/assets/imgs/default-avatar.jpg";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "@lib/passwordUtils";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prismaAuthClient"
import { exclude } from "@lib/filterUser";

const prisma = new PrismaClient()

interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
}

export const authOptions: NextAuthOptions = {
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
                user.image = user.image || defaultAvatar.src;

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
                    user,
                };
            }
            return token;
        },
        async session({ session, token }) {
            let _user: any
            const { user } = token as { user?: User };
            if (user) {
                session.user = user;
                _user = await prisma.user.findUnique({
                    where: {
                        id: user.id,
                    },
                });
                if (_user) {
                    session.user = token.user as any;
                    return session;
                }
            }

            return _user;
        }
    },
};
