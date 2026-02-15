"use server";

import fs from "fs/promises";
import path from "path";
import * as React from "react";
import { revalidatePath, unstable_cache } from "next/cache";
import { cookies } from "next/headers";

const getCachedData = unstable_cache(
    async (lang: string) => {
        const contentPath = path.join(process.cwd(), "data", `${lang}.json`);
        try {
            const fileContent = await fs.readFile(contentPath, "utf-8");
            return JSON.parse(fileContent);
        } catch (e) {
            if (lang !== "ru") {
                const fallbackPath = path.join(process.cwd(), "data", "ru.json");
                const fileContent = await fs.readFile(fallbackPath, "utf-8");
                return JSON.parse(fileContent);
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
    const lang = requestedLang || (await cookieStore).get("lang")?.value || "ru";

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
        const contentPath = path.join(process.cwd(), "data", `${lang}.json`);

        await fs.writeFile(contentPath, JSON.stringify(newData, null, 2), "utf-8");
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
