"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/contact-modal";
import { Zap } from "lucide-react";

export function StickyCTA({ lang = "ru" }: { lang?: string }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 600px
            setIsVisible(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-0 right-0 z-[60] px-4 lg:hidden pointer-events-none"
                >
                    <div className="container max-w-md mx-auto pointer-events-auto">
                        <ContactModal
                            type="client"
                            lang={lang}
                            trigger={
                                <Button
                                    size="lg"
                                    className="w-full h-14 rounded-2xl btn-aurora shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-between px-6 border border-white/10"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                            <Zap size={16} className="text-yellow-400" />
                                        </div>
                                        <span className="font-bold tracking-tight">
                                            {lang === "ru" ? "Запустить рост" : "Start Growth"}
                                        </span>
                                    </div>
                                    <div className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-1 rounded-md opacity-70">
                                        Free Plan
                                    </div>
                                </Button>
                            }
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
