"use client";

import { useEffect, useState } from "react";
import { Instagram, Send, Phone, User2 } from "lucide-react";
import { getContent } from "@/app/actions/content";

export function FooterSocials() {
    const [contacts, setContacts] = useState<any>(null);

    useEffect(() => {
        getContent().then(result => setContacts(result?.data?.contacts));
    }, []);

    if (!contacts) return null;

    return (
        <div className="flex space-x-4">
            {contacts.telegram && (
                <a
                    href={`https://t.me/${contacts.telegram.replace('@', '')}`}
                    target="_blank"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                    aria-label="Telegram"
                >
                    <Send size={20} />
                </a>
            )}
            {contacts.whatsapp && (
                <a
                    href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                    aria-label="WhatsApp"
                >
                    <Phone size={20} />
                </a>
            )}
            {contacts.instagram && (
                <a
                    href={`https://instagram.com/${contacts.instagram.replace('@', '')}`}
                    target="_blank"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                    aria-label="Instagram"
                >
                    <Instagram size={20} />
                </a>
            )}
            {contacts.vk && (
                <a
                    href={`https://vk.com/${contacts.vk}`}
                    target="_blank"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                    aria-label="VK"
                >
                    <User2 size={20} />
                </a>
            )}
        </div>
    );
}
