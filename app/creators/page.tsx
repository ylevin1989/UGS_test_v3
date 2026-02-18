import { getContent } from "@/app/actions/content";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const { lang } = await getContent();
    return {
        title: lang === "ru" ? "Стань креатором | Зарабатывай на создании UGC | HYPERLIFT" : "Become a Creator | Earn by creating UGC | HYPERLIFT",
        description: lang === "ru"
            ? "Присоединяйся к базе HYPERLIFT и делай контент для топ-брендов. Стабильный поток заказов, быстрые выплаты и поддержка на всех этапах."
            : "Join the HYPERLIFT database and create content for top brands. Steady flow of orders, fast payouts, and support at every stage.",
    };
}

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CREATOR_FAQ } from "@/lib/constants";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { ContactModal } from "@/components/contact-modal";
import { ClientMotionWrapper } from "@/components/client-motion-wrapper";
import {
    Camera,
    DollarSign,
    Users,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Zap,
    Globe,
    Clock,
    TrendingUp,
} from "lucide-react";

export default async function CreatorsPage() {
    const result = await getContent();
    if (!result) return null;
    const { data: content, lang } = result;
    const creatorData = content.creators;

    const steps = creatorData?.howItWorks || (lang === "ru"
        ? [
            { icon: "camera", title: "Оставьте заявку", desc: "Заполните форму и расскажите о себе" },
            { icon: "users", title: "Мы свяжемся", desc: "Наш менеджер подберёт подходящие проекты" },
            { icon: "zap", title: "Создавайте контент", desc: "Получайте брифы и снимайте видео" },
            { icon: "dollar", title: "Получайте оплату", desc: "Быстрые выплаты за каждый проект" },
        ]
        : [
            { icon: "camera", title: "Apply", desc: "Fill out the form and tell us about yourself" },
            { icon: "users", title: "We connect", desc: "Our manager will match you with projects" },
            { icon: "zap", title: "Create content", desc: "Receive briefs and film videos" },
            { icon: "dollar", title: "Get paid", desc: "Quick payments for each project" },
        ]);

    const benefits = creatorData?.benefits || (lang === "ru"
        ? [
            { title: "Стабильный доход", desc: "Регулярные заказы от крупных брендов" },
            { title: "Гибкий график", desc: "Работайте когда и где удобно" },
            { title: "Рост аудитории", desc: "Развивайте свой личный бренд" },
            { title: "Обучение", desc: "Советы и обратная связь от экспертов" },
            { title: "Портфолио", desc: "Пополняйте портфолио работами для топ-брендов" },
            { title: "Сообщество", desc: "Станьте частью комьюнити креаторов" },
        ]
        : [
            { title: "Steady income", desc: "Regular orders from major brands" },
            { title: "Flexible schedule", desc: "Work when and where you want" },
            { title: "Audience growth", desc: "Develop your personal brand" },
            { title: "Education", desc: "Tips and feedback from experts" },
            { title: "Portfolio", desc: "Build portfolio with top brand work" },
            { title: "Community", desc: "Become part of the creator community" },
        ]);

    const IconMap: any = {
        camera: Camera,
        dollar: DollarSign,
        users: Users,
        zap: Zap,
        globe: Globe,
        clock: Clock,
        trending: TrendingUp,
    };

    return (
        <>
            <Header phone={content.site.phone} currentLang={lang} />
            <main className="pt-32 pb-24">
                {/* HERO */}
                <div className="container mb-24">
                    <div className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/60 via-[#0a0118] to-[#0a0118]" />
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-[120px]" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[80px]" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                        <div className="relative z-10 p-10 md:p-16 lg:p-20 text-center space-y-8">
                            <ClientMotionWrapper
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                tag="span"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F97316] text-xs font-bold uppercase tracking-widest"
                            >
                                <Sparkles size={14} />
                                {creatorData?.badge || (lang === "ru" ? "Для креаторов" : "For creators")}
                            </ClientMotionWrapper>

                            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.9]">
                                {creatorData?.heroTitle || (lang === "ru" ? "СТАНЬ " : "BECOME A ")}
                                <span className="gradient-text-aurora">{creatorData?.heroHighlight || (lang === "ru" ? "КРЕАТОРОМ" : "CREATOR")}</span>
                            </h1>

                            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                                {creatorData?.heroSubtitle || (lang === "ru"
                                    ? "Снимай контент для топовых брендов и зарабатывай вместе с нами"
                                    : "Create content for top brands and earn with us")}
                            </p>

                            <ContactModal
                                type="creator"
                                lang={lang}
                                trigger={
                                    <Button size="lg" className="btn-aurora rounded-full px-10 h-14 text-base font-bold cursor-pointer group">
                                        {lang === "ru" ? "Подать заявку" : "Apply now"}
                                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="container mb-24">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-purple-400 font-bold uppercase tracking-[0.3em] text-xs">
                            {lang === "ru" ? "Как это работает" : "How it works"}
                        </span>
                        <h2 className="font-display text-5xl md:text-7xl tracking-tight uppercase">
                            {lang === "ru" ? "4 ПРОСТЫХ " : "4 SIMPLE "}
                            <span className="gradient-text-violet">{lang === "ru" ? "ШАГА" : "STEPS"}</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step: any, idx: number) => {
                            const Icon = IconMap[step.icon] || Sparkles;
                            return (
                                <ClientMotionWrapper
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.7 }}
                                    className="card-glow rounded-3xl p-8 relative"
                                >
                                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-6 shadow-lg">
                                        <Icon size={24} />
                                    </div>
                                    <div className="text-sm font-bold text-purple-400 mb-2 tracking-widest uppercase">
                                        {lang === "ru" ? `Шаг ${idx + 1}` : `Step ${idx + 1}`}
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight mb-3">{step.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                                </ClientMotionWrapper>
                            );
                        })}
                    </div>
                </div>

                {/* BENEFITS */}
                <div className="container mb-24">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-pink-400 font-bold uppercase tracking-[0.3em] text-xs">
                            {lang === "ru" ? "Преимущества" : "Benefits"}
                        </span>
                        <h2 className="font-display text-5xl md:text-7xl tracking-tight uppercase">
                            {lang === "ru" ? "ПОЧЕМУ " : "WHY "}
                            <span className="gradient-text-aurora">{lang === "ru" ? "HYPERLIFT?" : "HYPERLIFT?"}</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit: any, idx: number) => (
                            <ClientMotionWrapper
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08, duration: 0.6 }}
                                className="card-glow rounded-3xl p-8 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold tracking-tight mb-2">{benefit.title}</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </div>
                            </ClientMotionWrapper>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="container mb-24">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-display text-5xl md:text-7xl tracking-tight uppercase mb-12 text-center">
                            <span className="gradient-text-violet">{lang === "ru" ? "ВОПРОСЫ И ОТВЕТЫ" : "FAQ"}</span>
                        </h2>
                        <Accordion type="single" collapsible className="space-y-3">
                            {(content.faq?.creators || CREATOR_FAQ).map((item: any, idx: number) => (
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

                {/* CTA */}
                <div className="container">
                    <ClientMotionWrapper
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-[#0a0118] to-purple-950/30" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
                        <div className="relative z-10 p-12 md:p-16 text-center">
                            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase mb-6">
                                {lang === "ru" ? (
                                    <>ГОТОВ <span className="gradient-text-aurora">НАЧАТЬ?</span></>
                                ) : (
                                    <>READY TO <span className="gradient-text-aurora">START?</span></>
                                )}
                            </h2>
                            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                                {lang === "ru" ? "Подай заявку и начни зарабатывать на создании контента." : "Apply and start earning by creating content."}
                            </p>
                            <ContactModal
                                type="creator"
                                lang={lang}
                                trigger={
                                    <Button size="lg" className="btn-aurora rounded-full px-10 h-14 text-base font-bold cursor-pointer">
                                        {lang === "ru" ? "Подать заявку" : "Apply now"}
                                        <ArrowRight size={18} className="ml-2" />
                                    </Button>
                                }
                            />
                        </div>
                    </ClientMotionWrapper>
                </div>
            </main>
            <Footer lang={lang} />
        </>
    );
}
