"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { SITE_CONFIG } from "@/lib/constants";
import { ContactModal } from "@/components/contact-modal";
import { Button } from "@/components/ui/button";
import { Send, ArrowRight } from "lucide-react";

export function Footer({ lang = "ru" }: { lang?: string }) {
    return (
        <footer className="relative border-t border-purple-500/8 mt-12">
            {/* Top gradient line */}
            <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            <div className="container py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1 space-y-5">
                        <Logo />
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-[240px]">
                            {lang === "ru" ? "IT-инфраструктура для массового инфлюенс-маркетинга" : "IT infrastructure for mass influence marketing"}
                        </p>
                    </div>

                    {/* Nav */}
                    <div className="space-y-5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                            {lang === "ru" ? "Навигация" : "Navigation"}
                        </h4>
                        <div className="flex flex-col space-y-3">
                            {[
                                { href: "/cases", label: lang === "ru" ? "Кейсы" : "Cases" },
                                { href: "/creators", label: lang === "ru" ? "Креаторам" : "Creators" },
                                { href: "/contacts", label: lang === "ru" ? "Контакты" : "Contacts" },
                            ].map((item) => (
                                <Link key={item.href} href={item.href} className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="space-y-5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                            {lang === "ru" ? "Документы" : "Legal"}
                        </h4>
                        <div className="flex flex-col space-y-3">
                            <Link href="/privacy" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">
                                {lang === "ru" ? "Политика" : "Privacy"}
                            </Link>
                            <Link href="/terms" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">
                                {lang === "ru" ? "Условия" : "Terms"}
                            </Link>
                            <Link href="/offer" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">
                                {lang === "ru" ? "Оферта" : "Offer"}
                            </Link>
                        </div>
                    </div>

                    {/* Contacts + Creator CTA */}
                    <div className="space-y-5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                            {lang === "ru" ? "Контакты" : "Contacts"}
                        </h4>
                        <div className="flex flex-col space-y-3">
                            <a href={`mailto:${SITE_CONFIG.contact.email.clients}`} className="text-sm font-medium text-zinc-400 hover:text-purple-400 transition-colors">
                                {SITE_CONFIG.contact.email.clients}
                            </a>
                            <a href={`https://t.me/${SITE_CONFIG.contact.telegram.manager.replace("@", "")}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-purple-400 transition-colors">
                                <Send size={14} /> Telegram
                            </a>
                        </div>
                        <ContactModal
                            type="creator"
                            lang={lang}
                            trigger={
                                <Button variant="outline" size="sm" className="mt-2 rounded-full border-purple-500/20 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/40 cursor-pointer group text-xs">
                                    {lang === "ru" ? "Стать креатором" : "Become creator"}
                                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            }
                        />
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                    <p className="text-xs text-zinc-600">
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. {lang === "ru" ? "Все права защищены." : "All rights reserved."}
                    </p>
                    <p className="text-xs text-zinc-600">
                        {SITE_CONFIG.company.legalName} · Reg. {SITE_CONFIG.company.registrationNo}
                    </p>
                </div>
            </div>
        </footer>
    );
}
