import { NextAuthOptions } from 'next-auth';
import defaultAvatar from "../src/assets/imgs/default-avatar.jpg";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { comparePassword } from "@lib/passwordUtils";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prismaAuthClient"
import { exclude } from "@lib/filterUser";
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient()

interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    rememberMe?: string | null;
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                rememberMe: { label: "Remember Me", type: "checkbox" },
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
                    (await comparePassword(credentials.password, _user.password || ""))
                ) {
                    return { ...user, rememberMe: credentials.rememberMe };
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await prisma.user.findUnique({
                where: {
                    id: user.id,
                },
            });

            if (!existingUser?.emailVerified) return false;

            return true;
        },
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                return {
                    ...token,
                    user: session.user,
                };
            }
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
                    const publicFolderPath = path.join(process.cwd(), 'public');
                    if (session.user && session.user.image) {
                        const imagePath = path.join(publicFolderPath, session.user.image);
                        let imageExistsAndValid: boolean = false;
                        if (session.user.image.startsWith("http" || "https")) {
                            imageExistsAndValid = await checkImageLink(session.user.image);
                        }
                        if (!fs.existsSync(imagePath) && !imageExistsAndValid) {
                            session.user.image = defaultAvatar.src;
                        }
                    }
                    return session;
                }
            }

            return _user;
        }
    },
};

async function checkImageLink(imageLink: string) {
    try {
        const response = await axios.head(imageLink);
        return response.status === 200;
    } catch (error) {
        return false;
    }
}
