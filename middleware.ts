import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/utils/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect the /admin route
    if (pathname.startsWith('/admin')) {
        // Allow the login page itself
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for the auth cookie and verify it's a valid JWT
        const authCookie = request.cookies.get('hyp_auth');
        const token = authCookie?.value;
        const payload = await verifyToken(token);

        if (!payload) {
            const url = new URL('/admin/login', request.url);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*'],
};
