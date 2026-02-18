"use client";

import { motion } from "framer-motion";
import { setLanguage } from "@/app/actions/content";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [switchingTo, setSwitchingTo] = useState<string | null>(null);

    const toggleLanguage = async (lang: string) => {
        if (lang === currentLang || isPending) return;

        setSwitchingTo(lang);
        startTransition(async () => {
            await setLanguage(lang);
            router.refresh();
            setSwitchingTo(null);
        });
    };

    return (
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md relative overflow-hidden">
            <div className="relative flex items-center">
                {/* Slidding Background */}
                <motion.div
                    className="absolute h-full w-1/2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    initial={false}
                    animate={{
                        x: currentLang === "ru" ? 0 : "100%",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />

                <button
                    onClick={() => toggleLanguage("ru")}
                    className={`relative z-10 px-4 py-1.5 text-[11px] font-black tracking-widest transition-colors duration-300 ${currentLang === "ru" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    disabled={isPending}
                >
                    {switchingTo === "ru" ? (
                        <Loader2 size={12} className="animate-spin inline mr-1" />
                    ) : null}
                    RU
                </button>
                <button
                    onClick={() => toggleLanguage("en")}
                    className={`relative z-10 px-4 py-1.5 text-[11px] font-black tracking-widest transition-colors duration-300 ${currentLang === "en" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    disabled={isPending}
                >
                    {switchingTo === "en" ? (
                        <Loader2 size={12} className="animate-spin inline mr-1" />
                    ) : null}
                    EN
                </button>
            </div>
        </div>
    );
}
