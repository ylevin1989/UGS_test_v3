import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getContent } from "@/app/actions/content";
import { ClientMotionWrapper } from "@/components/client-motion-wrapper";
import { Sparkles, Zap, Target, BarChart3, ArrowRight } from "lucide-react";
import { ContactModal } from "@/components/contact-modal";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const { lang } = await getContent();
    return {
        title: lang === "ru" ? "AI Viral Content | Масштабируемый видео-продакшн с ИИ | HYPERLIFT" : "AI Viral Content | Scalable AI Video Production | HYPERLIFT",
        description: lang === "ru"
            ? "Создавайте тысячи виральных видео с помощью ИИ. Масштабируйте свои рекламные кампании и взламывайте алгоритмы TikTok, Reels и Shorts."
            : "Create thousands of viral videos using AI. Scale your advertising campaigns and hack TikTok, Reels, and Shorts algorithms.",
    };
}

export default async function AIContentPage() {
    const result = await getContent();
    if (!result) return null;
    const { data: content, lang } = result;

    const t = {
        badge: lang === "ru" ? "AI Powered Production" : "AI Powered Production",
        h1_1: lang === "ru" ? "Будущее" : "Future of",
        h1_2: lang === "ru" ? "Контента" : "Content",
        h1_3: lang === "ru" ? "Уже Здесь" : "is Already Here",
        hero_p: lang === "ru"
            ? "Мы объединяем передовой ИИ и креативные стратегии для создания тысяч виральных видео, которые работают на результат 24/7."
            : "We combine cutting-edge AI and creative strategies to create thousands of viral videos that deliver results 24/7.",
        features: [
            {
                icon: Zap,
                title: lang === "ru" ? "Скорость 2.0" : "Speed 2.0",
                desc: lang === "ru"
                    ? "Генерация сотен креативов за часы, а не недели. Тестируйте гипотезы мгновенно."
                    : "Generate hundreds of creatives in hours, not weeks. Test hypotheses instantly.",
                color: "from-yellow-500/20 to-orange-500/20"
            },
            {
                icon: Target,
                title: lang === "ru" ? "Точный Таргетинг" : "Precision Targeting",
                desc: lang === "ru"
                    ? "ИИ адаптирует визуал и текст под конкретную аудиторию для максимального CTR."
                    : "AI adapts visuals and text to specific audiences for maximum CTR.",
                color: "from-cyan-500/20 to-blue-500/20"
            },
            {
                icon: BarChart3,
                title: lang === "ru" ? "Масштабируемость" : "Scalability",
                desc: lang === "ru"
                    ? "Увеличивайте объемы контента без раздувания штата и бюджета."
                    : "Increase content volume without expanding staff or budget.",
                color: "from-purple-500/20 to-pink-500/20"
            }
        ],
        cta_h: lang === "ru" ? "Готовы взломать" : "Ready to hack",
        cta_h_italic: lang === "ru" ? "алгоритмы?" : "the algorithms?",
        cta_btn: lang === "ru" ? "Запустить AI-кампанию" : "Launch AI Campaign"
    };

    return (
        <>
            <Header phone={content.site.phone} currentLang={lang} />
            <main className="pt-32 pb-24 overflow-hidden">
                <div className="container px-4">
                    {/* Hero Section */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8"
                        >
                            <Sparkles size={14} />
                            {t.badge}
                        </ClientMotionWrapper>

                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            tag="h1"
                            className="text-5xl md:text-8xl font-display font-black tracking-tight uppercase leading-[0.9] mb-8"
                        >
                            {t.h1_1} <br /> <span className="gradient-text-aurora">{t.h1_2}</span> {t.h1_3}
                        </ClientMotionWrapper>

                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            tag="p"
                            className="text-xl text-zinc-400 max-w-2xl mx-auto"
                        >
                            {t.hero_p}
                        </ClientMotionWrapper>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {t.features.map((item, idx) => (
                            <ClientMotionWrapper
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass p-10 rounded-[2.5rem] border-white/5 bg-gradient-to-br shadow-xl"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 bg-gradient-to-br ${item.color}`}>
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{item.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                            </ClientMotionWrapper>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="glass p-12 md:p-24 rounded-[3rem] text-center border-primary/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 -z-10" />
                        <h2 className="text-4xl md:text-7xl font-display font-black tracking-tight uppercase mb-8">
                            {t.cta_h} <br /> <span className="text-primary italic">{t.cta_h_italic}</span>
                        </h2>
                        <div className="flex justify-center">
                            <ContactModal
                                type="client"
                                lang={lang}
                                trigger={
                                    <Button size="lg" className="h-20 px-12 rounded-full btn-aurora text-xl font-black uppercase tracking-widest shadow-2xl">
                                        {t.cta_btn}
                                        <ArrowRight size={24} className="ml-3" />
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer lang={lang} />
        </>
    );
}
