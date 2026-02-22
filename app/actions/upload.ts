"use server";

import { createClient } from "@/utils/supabase/server";

export async function uploadImage(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) {
            return { success: false, error: "No file provided" };
        }

        const supabase = await createClient();

        // Create unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

        // We use from() to select the bucket and upload() to stream the file to it
        const { data, error } = await supabase
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
