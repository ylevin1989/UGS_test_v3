"use client";

import { motion } from "framer-motion";
import { Users, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClientMotionWrapper } from "@/components/client-motion-wrapper";

export function ServiceSelection({ lang = "ru" }: { lang?: string }) {
    const services = [
        {
            title: lang === "ru" ? "Классический UGC" : "Classic UGC",
            subtitle: lang === "ru" ? "Живой контент от людей" : "Real people, real content",
            description: lang === "ru"
                ? "Мы подбираем идеальных креаторов под вашу нишу. Искренние видео, которые вызывают доверие и пробивают баннерную слепоту."
                : "We find the perfect creators for your niche. Authentic videos that build trust and break through banner blindness.",
            icon: Users,
            href: "/ugc-classic",
            color: "from-purple-600/20 to-pink-600/20",
            borderColor: "border-purple-500/20",
            hoverBorder: "hover:border-purple-500/40",
            glow: "shadow-purple-500/10"
        },
        {
            title: lang === "ru" ? "AI Viral Content" : "AI Viral Content",
            subtitle: lang === "ru" ? "Будущее продакшена" : "The future of production",
            description: lang === "ru"
                ? "Масштабируйте кампании в 10 раз быстрее. Нейросети создают тысячи виральных вариаций для мгновенного тестирования гипотез."
                : "Scale your campaigns 10x faster. AI generates thousands of viral variations for instant hypothesis testing.",
            icon: Sparkles,
            href: "/ai-content",
            color: "from-cyan-600/20 to-blue-600/20",
            borderColor: "border-cyan-500/20",
            hoverBorder: "hover:border-cyan-500/40",
            glow: "shadow-cyan-500/10"
        }
    ];

    return (
        <section className="py-12 lg:py-24 relative">
            <div className="container px-4">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                    {services.map((service, idx) => (
                        <ClientMotionWrapper
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                        >
                            <Link href={service.href} className="block group">
                                <div className={`relative h-full glass rounded-[2.5rem] p-8 lg:p-12 border ${service.borderColor} ${service.hoverBorder} transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-2xl ${service.glow} bg-gradient-to-br ${service.color}`}>
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                                <service.icon size={28} />
                                            </div>
                                            <div className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">
                                                {idx === 0 ? "Classic Path" : "Next-Gen Path"}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-3xl lg:text-4xl font-display uppercase tracking-tight text-white leading-tight">
                                                {service.title} <br />
                                                <span className="text-zinc-400 text-lg lg:text-xl normal-case font-medium tracking-normal block mt-1">
                                                    {service.subtitle}
                                                </span>
                                            </h3>
                                            <p className="text-zinc-400 text-base lg:text-lg leading-relaxed max-w-md">
                                                {service.description}
                                            </p>
                                        </div>

                                        <div className="mt-12 flex items-center text-white font-bold uppercase tracking-widest text-xs group/btn">
                                            <span className="mr-3 border-b-2 border-primary/50 group-hover/btn:border-primary transition-all">
                                                {lang === "ru" ? "Узнать подробнее" : "Learn more"}
                                            </span>
                                            <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ClientMotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
