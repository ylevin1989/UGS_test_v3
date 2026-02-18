import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect the /admin route
    if (pathname.startsWith('/admin')) {
        // Allow the login page itself
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for the auth cookie
        const isAuthenticated = request.cookies.get('hyp_auth');

        if (!isAuthenticated) {
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
