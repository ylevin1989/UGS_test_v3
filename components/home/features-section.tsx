"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, Zap } from "lucide-react";

const features = [
    {
        icon: DollarSign,
        title: "Оплата за результат",
        description:
            "Вы платите за целевые действия или гарантированные просмотры. Никаких слитых бюджетов.",
    },
    {
        icon: TrendingUp,
        title: "Виральность",
        description:
            "Мы знаем алгоритмы. Наши видео попадают в рекомендации, принося бесплатный органический трафик.",
    },
    {
        icon: Zap,
        title: "Скорость",
        description:
            "Пока классические продакшены пишут сценарий, мы уже заливаем первые 50 роликов.",
    },
];

export function FeaturesSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Performance-маркетинг нового поколения
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 md:p-8 h-full hover:border-primary/50 transition-colors">
                                <feature.icon className="h-10 w-10 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
