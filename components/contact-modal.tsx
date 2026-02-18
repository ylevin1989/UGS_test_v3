"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClientForm } from "@/components/forms/client-form";
import { CreatorForm } from "@/components/forms/creator-form";
import { useState, useEffect } from "react";

interface ContactModalProps {
    type: "client" | "creator";
    trigger?: React.ReactNode;
    lang?: string;
}

export function ContactModal({ type, trigger, lang = "ru" }: ContactModalProps) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return trigger || (
            <Button size="lg" className="rounded-full px-8 h-12 font-bold shadow-xl">
                {type === "client"
                    ? (lang === "ru" ? "Запустить рекламу" : "Start growth")
                    : (lang === "ru" ? "Стать креатором" : "Become creator")}
            </Button>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button size="lg" className="rounded-full px-8 h-12 font-bold shadow-xl">
                        {type === "client"
                            ? (lang === "ru" ? "Запустить рекламу" : "Start growth")
                            : (lang === "ru" ? "Стать креатором" : "Become creator")}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 bg-transparent border-none shadow-none">
                <div className="bg-[#0a0118] p-6 md:p-12 rounded-3xl border border-purple-500/10 shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-y-auto max-h-[90vh]">
                    <div className="absolute inset-0 bg-purple-500/3 rounded-3xl pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                    <DialogHeader className="mb-6 md:mb-8">
                        <DialogTitle className="font-display text-4xl md:text-5xl tracking-tight uppercase text-center">
                            {type === "client" ? (
                                lang === "ru" ? (
                                    <>Оставить <span className="gradient-text-violet italic">ЗАЯВКУ</span></>
                                ) : (
                                    <>Leave a <span className="gradient-text-violet italic">REQUEST</span></>
                                )
                            ) : (
                                lang === "ru" ? (
                                    <>Стать <span className="gradient-text-aurora">КРЕАТОРОМ</span></>
                                ) : (
                                    <>Become a <span className="gradient-text-aurora">CREATOR</span></>
                                )
                            )}
                        </DialogTitle>
                    </DialogHeader>

                    {type === "client" ? (
                        <ClientForm onSuccess={() => setOpen(false)} lang={lang} />
                    ) : (
                        <CreatorForm onSuccess={() => setOpen(false)} lang={lang} />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
