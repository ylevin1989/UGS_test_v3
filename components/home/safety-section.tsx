"use client";

import { Shield, BookOpen, Headphones, CheckCircle2 } from "lucide-react";
import { ClientMotionWrapper } from "@/components/client-motion-wrapper";

export function SafetySection({ lang = "ru" }: { lang?: string }) {
    const features = [
        {
            icon: BookOpen,
            title: lang === "ru"
                ? "Обучение в рамках закона"
                : "Legal compliance training",
            desc: lang === "ru"
                ? "Обучаем креаторов работать в рамках рекламного законодательства и правил платформ"
                : "We train creators to work within advertising laws and platform rules",
            gradient: "from-emerald-500 to-teal-500",
            shadow: "shadow-emerald-500/20",
        },
        {
            icon: Shield,
            title: lang === "ru"
                ? "Снижение рисков"
                : "Risk mitigation",
            desc: lang === "ru"
                ? "Снижаем риски штрафов и репутационных проблем для вашего бренда"
                : "We reduce the risks of fines and reputational issues for your brand",
            gradient: "from-blue-500 to-cyan-500",
            shadow: "shadow-blue-500/20",
        },
        {
            icon: Headphones,
            title: lang === "ru"
                ? "Техническая поддержка"
                : "Technical support",
            desc: lang === "ru"
                ? "Обеспечиваем техническую поддержку аккаунтов и помощь при блокировках"
                : "We provide technical account support and assistance with blocks",
            gradient: "from-violet-500 to-purple-500",
            shadow: "shadow-violet-500/20",
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[150px] -translate-y-1/2 -z-10" />
            <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />

            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — main message */}
                    <ClientMotionWrapper
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                                {lang === "ru" ? "Безопасность" : "Safety"}
                            </span>
                            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.9]">
                                {lang === "ru" ? "Безопасный" : "Safe"} <br />
                                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                    {lang === "ru" ? "контент" : "content"}
                                </span>
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-lg">
                            {lang === "ru"
                                ? "Мы берём на себя не только производство контента, но и его безопасность. Контент-завод работает стабильно и безопасно для бренда."
                                : "We take care of not just content production, but also its safety. The content factory runs stable and safe for your brand."}
                        </p>

                        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 max-w-fit">
                            <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
                            <span className="text-sm text-emerald-300 font-semibold">
                                {lang === "ru"
                                    ? "Контент-завод работает стабильно и безопасно для бренда"
                                    : "Content factory runs stable and safe for your brand"}
                            </span>
                        </div>
                    </ClientMotionWrapper>

                    {/* Right — feature cards */}
                    <div className="space-y-5">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <ClientMotionWrapper
                                    key={idx}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 1.2,
                                        delay: idx * 0.12,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="group card-glow rounded-2xl p-6 flex gap-5 items-start transition-all duration-500 hover:translate-x-2"
                                >
                                    <div
                                        className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg ${feature.shadow}`}
                                    >
                                        <Icon size={22} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-1 tracking-tight">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </ClientMotionWrapper>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
