"use server";

import { createClient } from "@/utils/supabase/server";

export async function saveLead(leadData: any) {
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

export async function updateLeadStatus(id: string, status: string) {
    try {
        const supabase = await createClient();

        const { error } = await supabase
            .from('leads')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error("Supabase update error:", error);
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error("Error updating lead status:", error);
        return { success: false };
    }
}
