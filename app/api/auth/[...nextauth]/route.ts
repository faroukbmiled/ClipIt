import NextAuth from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from "@lib/authConfig";
import { getToken, JWT } from 'next-auth/jwt';

const handler = async (req: NextRequest, res: NextResponse) => {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET as string,
    }) as unknown as JWT;
    const user = token?.user as unknown as any;
    const rememberMe = user?.rememberMe === "true";

    const options = {
        ...authOptions,
        session: {
            ...authOptions.session,
            maxAge: rememberMe ? 2592000 : 43200, // session is valid up to 12 hours (43200 sec) if rememberMe is false / else 30 days (2592000 sec)
        },
    };

    return NextAuth(req as unknown as NextApiRequest, res as unknown as NextApiResponse, options);
};

export { handler as GET, handler as POST };
