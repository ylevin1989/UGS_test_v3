"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientMotionWrapper } from "@/components/client-motion-wrapper";

export function PricingTeaser({ lang = "ru", plans = [] }: { lang?: string, plans?: any[] }) {
    // Get the first plan's first level price as a fallback if plans is empty
    const startPrice = plans?.[0]?.levels?.[0]?.price || (lang === "ru" ? "180 000 ₽" : "180,000 ₽");
    const tagline = plans?.[0]?.tagline || (lang === "ru" ? "Запуск контент-завода" : "Content factory launch");

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] -z-10" />

            <div className="container">
                <ClientMotionWrapper
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="card-glow rounded-3xl p-8 md:p-14 relative overflow-hidden max-w-4xl mx-auto"
                >
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                            <Zap size={32} className="md:w-10 md:h-10" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-center md:text-left space-y-3">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">
                                {tagline}
                                <span className="gradient-text-aurora block md:inline md:ml-2">
                                    {lang === "ru" ? `— от ${startPrice} / мес` : `— from ${startPrice} / mo`}
                                </span>
                            </h3>
                            <p className="text-zinc-400 text-sm md:text-base max-w-lg">
                                {lang === "ru"
                                    ? "5 пакетов для любого бизнеса. Бюджет креаторов оплачивается отдельно — подберём команду под ваш бюджет."
                                    : "5 packages for any business. Creator budget is separate — we'll build a team for your budget."}
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="flex-shrink-0">
                            <Link href="/pricing">
                                <Button className="btn-aurora rounded-full px-8 h-12 text-sm font-bold cursor-pointer group">
                                    {lang === "ru" ? "Все тарифы" : "View plans"}
                                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </ClientMotionWrapper>
            </div>
        </section>
    );
}
