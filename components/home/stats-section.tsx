"use client";

import { ClientMotionWrapper } from "@/components/client-motion-wrapper";
import { TrendingUp, Eye, DollarSign, Clock } from "lucide-react";

export function StatsSection({ content }: { content: any }) {
    const stats = content.stats;
    const lang = content.hero?.lang || "ru";

    const items = [
        {
            icon: TrendingUp,
            value: stats?.creators || "1000+",
            label: lang === "ru" ? "Креаторов в базе" : "Creators",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: Eye,
            value: stats?.monthlyReach || "25M+",
            label: lang === "ru" ? "Охват в месяц" : "Monthly reach",
            color: "from-pink-500 to-orange-500",
        },
        {
            icon: DollarSign,
            value: stats?.avgCPV || "0.15₽",
            label: lang === "ru" ? "Средний CPV" : "Average CPV",
            color: "from-orange-500 to-yellow-500",
        },
        {
            icon: Clock,
            value: stats?.launchDays || "24h",
            label: lang === "ru" ? "Запуск кампании" : "Campaign launch",
            color: "from-yellow-500 to-green-400",
        },
    ];

    return (
        <section className="py-24 relative section-glow-top">
            <div className="container">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {items.map((item, idx) => (
                        <ClientMotionWrapper
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="card-glow rounded-2xl md:rounded-3xl p-6 md:p-8 text-center relative group"
                        >
                            {/* Top gradient line */}
                            <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${item.color} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`} />

                            <div className={`w-12 h-12 rounded-xl mx-auto mb-4 bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                                <item.icon size={22} />
                            </div>
                            <div className="font-display text-4xl md:text-5xl tracking-tight uppercase text-white mb-2">{item.value}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{item.label}</div>
                        </ClientMotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
