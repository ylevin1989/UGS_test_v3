"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";

export async function uploadImage(formData: FormData) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("hyp_auth")?.value;
        const payload = await verifyToken(session);
        
        if (payload?.role !== "Admin") {
            return { success: false, error: "Unauthorized" };
        }

        const file = formData.get("file") as File;
        if (!file) {
            return { success: false, error: "No file provided" };
        }

        const supabase = await createClient();

        // Create unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

        // We use from() to select the bucket and upload() to stream the file to it
        const { error } = await supabase
            .storage
            .from('uploads')
            .upload(filename, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error("Supabase storage error:", error);
            throw error;
        }

        // We get public URL for the uploaded file
        const { data: publicUrlData } = supabase
            .storage
            .from('uploads')
            .getPublicUrl(filename);

        return {
            success: true,
            url: publicUrlData.publicUrl
        };
    } catch (error) {
        console.error("Upload error:", error);
        return { success: false, error: "Upload failed" };
    }
}
