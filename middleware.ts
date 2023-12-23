// middleware.ts

import csrf from 'edge-csrf';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// initalize protection function
const csrfProtect = csrf({
    cookie: {
        name: '_clipitCsrf',
        secure: process.env.NODE_ENV === 'production',
    },
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    secretByteLength: 20
});

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // csrf protection
    if (!request.nextUrl.pathname.startsWith("/api/auth/")) {
        const csrfError = await csrfProtect(request, response);
        // check result
        if (csrfError) {
            return new NextResponse('Unauthorized', { status: 403 });
        }
    }

    return response;
}
