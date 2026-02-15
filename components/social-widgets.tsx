"use client";

import { MessageCircle } from "lucide-react";

export function TelegramWidget({ telegram }: { telegram?: string }) {
    if (!telegram) return null;

    // Remove @ if present for the link
    const username = telegram.replace("@", "");

    return (
        <a
            href={`https://t.me/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#229ED9] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all group"
            aria-label="Contact us on Telegram"
        >
            <MessageCircle size={32} fill="white" className="group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </a>
    );
}

export function YandexMetrika({ id }: { id?: string }) {
    if (!id) return null;

    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(${id}, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });
                `,
            }}
        />
    );
}
