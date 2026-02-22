"use server";

import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

function getSessionRole(sessionData: string | undefined): string | null {
    if (!sessionData) return null;
    try {
        const decoded = Buffer.from(sessionData, 'base64').toString('utf8');
        const parsed = JSON.parse(decoded);
        return parsed.role;
    } catch {
        return null;
    }
}

export async function getUsers() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("hyp_auth")?.value;
        const role = getSessionRole(session);

        // Only Admin can view users
        if (role !== "Admin") {
            return [];
        }

        const supabase = await createClient();
        const { data, error } = await supabase
            .from('users')
            .select('id, username, role, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export async function createUser(userData: { username: string; password: string; role: string }) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("hyp_auth")?.value;
        const role = getSessionRole(session);

        // Only Admin can create users
        if (role !== "Admin") {
            return { success: false, error: "Unauthorized" };
        }

        const supabase = await createClient();

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(userData.password, salt);

        const { data, error } = await supabase
            .from('users')
            .insert({
                username: userData.username,
                password_hash,
                role: userData.role
            })
            .select('id, username, role')
            .single();

        if (error) {
            if (error.code === '23505') {
                return { success: false, error: "Username already exists" };
            }
            throw error;
        }

        return { success: true, user: data };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Server error" };
    }
}

export async function deleteUser(id: string) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("hyp_auth")?.value;
        const role = getSessionRole(session);

        // Only Admin can delete users
        if (role !== "Admin") {
            return { success: false, error: "Unauthorized" };
        }

        const supabase = await createClient();
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}
