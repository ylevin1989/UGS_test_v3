import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        const supabase = await createClient();

        const { data: user, error: dbError } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();

        if (dbError || !user) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            const cookieStore = await cookies();

            // Store role and username inside the session cookie value, base64 encoded for simplicity (not secure JWT, but fine for now)
            const sessionData = Buffer.from(JSON.stringify({
                username: user.username,
                role: user.role
            })).toString('base64');

            cookieStore.set("hyp_auth", sessionData, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            });

            return NextResponse.json({ success: true, role: user.role });
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
