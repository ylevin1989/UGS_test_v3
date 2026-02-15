"use client";

import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/contact-modal";
import { ClientMotionWrapper } from "@/components/client-motion-wrapper";
import Image from "next/image";
import { ArrowRight, Play, Sparkles, Star, Zap } from "lucide-react";
import { CreatorGrid } from "@/components/home/creator-grid";

export function HeroSection({ content }: { content: any }) {
    const hero = content.hero;
    const lang = hero?.lang || "ru";

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
            {/* Floating aurora blobs */}
            <div className="absolute top-20 left-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-20 right-[5%] w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-[100px] animate-[float_10s_ease-in-out_infinite_1s]" />
            <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-orange-500/8 blur-[80px] animate-[float_12s_ease-in-out_infinite_2s]" />

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left — Text */}
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                                <Zap size={14} className="text-yellow-400" />
                                <span className="text-sm font-bold text-purple-300 uppercase tracking-widest">
                                    {hero?.badge || (lang === "ru" ? "UGC Performance Agency" : "UGC Performance Agency")}
                                </span>
                            </span>
                        </ClientMotionWrapper>

                        {/* MAIN TITLE — Bebas Neue, massive, aurora gradient */}
                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                        >
                            <h1 className="font-display text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] leading-[0.85] tracking-tight uppercase mb-8">
                                <span className="block text-white">{hero?.titleLine1 || (lang === "ru" ? "ПРЕВРАЩАЕМ" : "TURNING")}</span>
                                <span className="block gradient-text-aurora">{hero?.titleLine2 || (lang === "ru" ? "ПРОСМОТРЫ" : "VIEWS")}</span>
                                <span className="block text-white">{hero?.titleLine3 || (lang === "ru" ? "В ДЕНЬГИ" : "INTO MONEY")}</span>
                            </h1>
                        </ClientMotionWrapper>

                        {/* Subtitle */}
                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="max-w-xl mb-10"
                        >
                            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                                {hero?.subtitle || (lang === "ru"
                                    ? "IT-инфраструктура для массового инфлюенс-маркетинга"
                                    : "IT infrastructure for mass influence marketing")}
                            </p>
                        </ClientMotionWrapper>

                        {/* CTA Buttons */}
                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-4 mb-12"
                        >
                            <ContactModal
                                type="client"
                                lang={lang}
                                trigger={
                                    <Button size="lg" className="btn-aurora rounded-full px-10 h-14 text-lg group cursor-pointer">
                                        {hero?.ctaPrimary || (lang === "ru" ? "Запустить рекламу" : "Launch ads")}
                                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                }
                            />
                            <ContactModal
                                type="creator"
                                lang={lang}
                                trigger={
                                    <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/50 cursor-pointer group">
                                        {hero?.ctaSecondary || (lang === "ru" ? "Стать креатором" : "Become creator")}
                                        <Star size={18} className="ml-2 group-hover:text-yellow-400 transition-colors" />
                                    </Button>
                                }
                            />
                        </ClientMotionWrapper>

                        {/* Stats row */}
                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.55 }}
                            className="flex flex-wrap gap-8 md:gap-10"
                        >
                            {[
                                { value: content.stats?.creators || "1000+", label: lang === "ru" ? "креаторов" : "creators" },
                                { value: content.stats?.monthlyReach || "25M+", label: lang === "ru" ? "охват/мес" : "reach/mo" },
                                { value: content.stats?.avgCPV || "0.15₽", label: "CPV" },
                                { value: content.stats?.launchDays || "24h", label: lang === "ru" ? "запуск" : "launch" },
                            ].map((stat, i) => (
                                <div key={i} className="group">
                                    <div className="text-2xl md:text-3xl font-black gradient-text-violet tracking-tight">{stat.value}</div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </ClientMotionWrapper>
                    </div>

                    {/* Right — Creator Grid */}
                    <div className="hidden lg:block">
                        <CreatorGrid content={content} />
                    </div>
                </div>
            </div>
        </section>
    );
}
