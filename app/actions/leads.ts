"use server";

import fs from "fs/promises";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

export async function saveLead(leadData: any) {
    try {
        const fileContent = await fs.readFile(LEADS_FILE, "utf-8");
        const leads = JSON.parse(fileContent);

        const newLead = {
            ...leadData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: "new"
        };

        leads.unshift(newLead);
        await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));

        return { success: true, lead: newLead };
    } catch (error) {
        console.error("Error saving lead:", error);
        return { success: false, error: "Failed to save lead" };
    }
}

export async function getLeads() {
    try {
        const fileContent = await fs.readFile(LEADS_FILE, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error getting leads:", error);
        return [];
    }
}

export async function updateLeadStatus(id: string, status: string) {
    try {
        const fileContent = await fs.readFile(LEADS_FILE, "utf-8");
        let leads = JSON.parse(fileContent);

        leads = leads.map((l: any) => l.id === id ? { ...l, status } : l);

        await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}
