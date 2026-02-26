"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";

export async function saveLead(leadData: Record<string, unknown> | { name?: string; contact?: string; role?: string; message?: string }) {
    try {
        const supabase = await createClient();

        const newLead = {
            name: leadData.name || 'Unknown',
            contact: leadData.contact || '',
            role: leadData.role || leadData.message || '',
            status: "new"
        };

        const { data, error } = await supabase
            .from('leads')
            .insert(newLead)
            .select('*')
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            throw error;
        }

        return { success: true, lead: data };
    } catch (error) {
        console.error("Error saving lead:", error);
        return { success: false, error: "Failed to save lead" };
    }
}

export async function getLeads() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("hyp_auth")?.value;
        const payload = await verifyToken(session);
        
        if (payload?.role !== "Admin") {
            return [];
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Convert created_at to camelCase format if expected by the frontend
        return (data || []).map(lead => ({
            ...lead,
            createdAt: lead.created_at
        }));
    } catch (error) {
        console.error("Error getting leads:", error);
        return [];
    }
}
