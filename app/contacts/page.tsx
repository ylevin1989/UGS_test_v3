import { getContent } from "@/app/actions/content";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Контакты",
    description: "Свяжитесь с HYPERLIFT — обсудим ваш проект и создадим стратегию продвижения.",
};

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CLIENT_FAQ } from "@/lib/constants";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { ContactModal } from "@/components/contact-modal";
import { ClientMotionWrapper } from "@/components/client-motion-wrapper";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    ArrowRight,
    Globe,
} from "lucide-react";

export default async function ContactsPage() {
    const result = await getContent();
    if (!result) return null;
    const { data: content, lang } = result;
    const contacts = content.contacts;

    const contactCards = [
        {
            icon: Mail,
            label: "Email",
            value: contacts?.email || "hello@hyperlift.agency",
            href: `mailto:${contacts?.email || "hello@hyperlift.agency"}`,
        },
        {
            icon: Send,
            label: "Telegram",
            value: contacts?.telegram || "@hyperlift",
            href: `https://t.me/${(contacts?.telegram || "@hyperlift").replace("@", "")}`,
        },
        {
            icon: Phone,
            label: lang === "ru" ? "Телефон" : "Phone",
            value: content.site.phone,
            href: `tel:${(content.site.phone || "").replace(/\D/g, "")}`,
        },
        {
            icon: Clock,
            label: lang === "ru" ? "Время работы" : "Working hours",
            value: contacts?.workingHours || (lang === "ru" ? "Пн-Пт, 10:00 — 19:00" : "Mon-Fri, 10:00 — 19:00"),
            href: null,
        },
    ];

    return (
        <>
            <Header phone={content.site.phone} currentLang={lang} />
            <main className="pt-32 pb-24">
                {/* PAGE HEADER */}
                <div className="container mb-16">
                    <div className="text-center space-y-4 max-w-4xl mx-auto">
                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            tag="span"
                            className="text-purple-400 font-bold uppercase tracking-[0.3em] text-xs"
                        >
                            {lang === "ru" ? "Связаться с нами" : "Get in touch"}
                        </ClientMotionWrapper>
                        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.9]">
                            {lang === "ru" ? "ДАВАЙТЕ " : "LET'S "}
                            <span className="gradient-text-aurora">{lang === "ru" ? "ОБЩАТЬСЯ" : "CONNECT"}</span>
                        </h1>
                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                            {lang === "ru"
                                ? "Мы всегда рады новым проектам и интересным предложениям."
                                : "We're always open to new projects and exciting opportunities."}
                        </p>
                    </div>
                </div>

                {/* CONTACT CARDS */}
                <div className="container mb-20">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactCards.map((card, idx) => (
                            <ClientMotionWrapper
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                            >
                                {card.href ? (
                                    <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} className="block h-full">
                                        <Card className="card-glow rounded-3xl p-8 h-full group cursor-pointer">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                                <card.icon size={22} />
                                            </div>
                                            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{card.label}</div>
                                            <div className="text-lg font-bold text-white">{card.value}</div>
                                        </Card>
                                    </a>
                                ) : (
                                    <Card className="card-glow rounded-3xl p-8 h-full">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-6 shadow-lg">
                                            <card.icon size={22} />
                                        </div>
                                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{card.label}</div>
                                        <div className="text-lg font-bold text-white">{card.value}</div>
                                    </Card>
                                )}
                            </ClientMotionWrapper>
                        ))}
                    </div>
                </div>

                {/* MAP + INFO */}
                <div className="container mb-24">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Map */}
                        <ClientMotionWrapper
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden border border-purple-500/10"
                        >
                            <iframe
                                src={contacts?.mapUrl || "https://yandex.ru/map-widget/v1/?um=constructor%3Acf6c0e5c9ce58e53e1c6e0e5c60e5c9c&amp;source=constructor"}
                                width="100%"
                                height="100%"
                                style={{ position: "absolute", inset: 0, border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3)" }}
                                allowFullScreen
                            />
                        </ClientMotionWrapper>

                        {/* Info */}
                        <ClientMotionWrapper
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="card-glow rounded-3xl p-8 md:p-10">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                                        <MapPin size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black tracking-tight mb-2">
                                            {lang === "ru" ? "Наш офис" : "Our office"}
                                        </h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            {contacts?.address || (lang === "ru" ? "Пхукет, Таиланд" : "Phuket, Thailand")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                                        <Globe size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black tracking-tight mb-2">
                                            {lang === "ru" ? "Мы работаем глобально" : "We work globally"}
                                        </h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            {lang === "ru"
                                                ? "Работаем удалённо с клиентами и креаторами по всему миру."
                                                : "We work remotely with clients and creators worldwide."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick CTA */}
                            <div className="card-glow rounded-3xl p-8 md:p-10 space-y-6">
                                <h3 className="text-2xl font-black tracking-tight">
                                    {lang === "ru" ? "Готовы обсудить проект?" : "Ready to discuss?"}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {lang === "ru"
                                        ? "Оставьте заявку — мы свяжемся в течение 24 часов."
                                        : "Leave a request — we'll contact you within 24 hours."}
                                </p>
                                <ContactModal
                                    type="client"
                                    lang={lang}
                                    trigger={
                                        <Button size="lg" className="btn-aurora rounded-full px-8 h-12 font-bold cursor-pointer group">
                                            {lang === "ru" ? "Обсудить" : "Let's talk"}
                                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    }
                                />
                            </div>
                        </ClientMotionWrapper>
                    </div>
                </div>

                {/* FAQ */}
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-display text-5xl md:text-7xl tracking-tight uppercase mb-12 text-center">
                            <span className="gradient-text-violet">{lang === "ru" ? "ЧАСТЫЕ ВОПРОСЫ" : "FAQ"}</span>
                        </h2>
                        <Accordion type="single" collapsible className="space-y-3">
                            {(content.faq?.clients || CLIENT_FAQ).map((item: any, idx: number) => (
                                <AccordionItem key={idx} value={`faq-${idx}`} className="border border-purple-500/8 bg-white/[0.02] rounded-2xl px-8 overflow-hidden hover:border-purple-500/20 transition-colors backdrop-blur-sm">
                                    <AccordionTrigger className="text-base font-bold py-5 hover:no-underline hover:text-purple-400 transition-colors">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-zinc-400 pb-5 leading-relaxed whitespace-pre-line">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </main>
            <Footer lang={lang} />
        </>
    );
}
