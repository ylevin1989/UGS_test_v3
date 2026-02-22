"use server";

import * as React from "react";
import { revalidatePath, unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const getCachedData = unstable_cache(
    async (lang: string) => {
        try {
            // Use raw client inside cache to avoid cookies access violation
            const supabase = createSupabaseClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            const { data, error } = await supabase
                .from('site_content')
                .select('content')
                .eq('lang', lang)
                .single();

            if (error || !data) throw error || new Error("No data found");

            return data.content;
        } catch (e) {
            console.error(`Error fetching ${lang} content from Supabase:`, e);
            if (lang !== "ru") {
                try {
                    const supabase = createSupabaseClient(
                        process.env.NEXT_PUBLIC_SUPABASE_URL!,
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                    );
                    const { data: fallbackData } = await supabase
                        .from('site_content')
                        .select('content')
                        .eq('lang', 'ru')
                        .single();

                    return fallbackData?.content || null;
                } catch (fallbackError) {
                    console.error("Fallback to Russian failed:", fallbackError);
                    return null;
                }
            }
            return null;
        }
    },
    ["site-content"],
    { tags: ["content"], revalidate: 3600 }
);

export const getContent = React.cache(async function getContent(requestedLang?: string) {
    const cookieStore = await cookies();
    // Strict priority: function arg > cookie > default 'ru'
    const lang = requestedLang || cookieStore.get("lang")?.value || "ru";

    // Safety check: only allow 'ru' or 'en'
    const finalLang = (lang === "ru" || lang === "en") ? lang : "ru";

    const data = await getCachedData(finalLang);
    return { data, lang: finalLang };
});

export async function setLanguage(lang: string) {
    const cookieStore = await cookies();
    cookieStore.set("lang", lang);
    revalidatePath("/");
    return { success: true };
}

export async function updateContent(newData: any, targetLang?: string) {
    try {
        const cookieStore = await cookies();
        const lang = targetLang || cookieStore.get("lang")?.value || "ru";

        const supabase = await createClient();
        const { error } = await supabase
            .from('site_content')
            .upsert({ lang, content: newData, updated_at: new Date() }, { onConflict: 'lang' });

        if (error) {
            throw error;
        }

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error updating content:", error);
        return { success: false, error: "Failed to save data" };
    }
}

export async function updateContentByLang(lang: string, newData: any) {
    return updateContent(newData, lang);
}
