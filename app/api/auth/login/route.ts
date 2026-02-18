import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        // Hardcoded credentials as per user request
        const ADMIN_USER = "Admin";
        const ADMIN_PASS = "APEXhot1";

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            const cookieStore = await cookies();

            // Set a simple auth cookie
            // In a production app, this should be a JWT or similar signed token
            cookieStore.set("hyp_auth", "authenticated", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, error: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
