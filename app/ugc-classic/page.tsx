import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getContent } from "@/app/actions/content";
import { ClientMotionWrapper } from "@/components/client-motion-wrapper";
import { Users, Heart, ShieldCheck, TrendingUp, ArrowRight } from "lucide-react";
import { ContactModal } from "@/components/contact-modal";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const { lang } = await getContent();
    return {
        title: lang === "ru" ? "Classic UGC | Честный контент от реальных людей | HYPERLIFT" : "Classic UGC | Authentic Content from Real People | HYPERLIFT",
        description: lang === "ru"
            ? "Классический UGC продакшн. Мы находим идеальных креаторов для вашего бренда, которые создают искренние видео, повышающие доверие и продажи."
            : "Classic UGC production. We find the perfect creators for your brand who create sincere videos that increase trust and sales.",
    };
}

export default async function UgcClassicPage() {
    const result = await getContent();
    if (!result) return null;
    const { data: content, lang } = result;

    const t = {
        badge: lang === "ru" ? "Authentic Human Content" : "Authentic Human Content",
        h1_1: lang === "ru" ? "Сила" : "The Power of",
        h1_2: lang === "ru" ? "Доверия" : "Trust",
        h1_3: lang === "ru" ? "и Эмоций" : "and Emotion",
        hero_p: lang === "ru"
            ? "Классический UGC от реальных людей. Мы находим креаторов, которые разделяют ценности вашего бренда и создают контент, в который верят."
            : "Classic UGC from real people. We find creators who share your brand values and create content that people believe in.",
        features: [
            {
                icon: Heart,
                title: lang === "ru" ? "Искренность" : "Sincerity",
                desc: lang === "ru"
                    ? "Забудьте о фальшивых улыбках. Мы создаем видео, которые выглядят как совет от близкого друга."
                    : "Forget about fake smiles. We create videos that look like advice from a close friend.",
                color: "from-pink-500/20 to-red-500/20"
            },
            {
                icon: ShieldCheck,
                title: lang === "ru" ? "Гарантия Качества" : "Quality Assurance",
                desc: lang === "ru"
                    ? "Строгий отбор креаторов и детальный контроль каждого кадра на соответствие брифу."
                    : "Strict selection of creators and detailed control of every frame to match the brief.",
                color: "from-indigo-500/20 to-purple-500/20"
            },
            {
                icon: TrendingUp,
                title: lang === "ru" ? "Социальное Доказательство" : "Social Proof",
                desc: lang === "ru"
                    ? "Повышайте конверсию и лояльность через реальный опыт использования продукта."
                    : "Increase conversion and loyalty through real product experience.",
                color: "from-blue-500/20 to-cyan-500/20"
            }
        ],
        cta_h: lang === "ru" ? "Начните строить" : "Start building",
        cta_h_italic: lang === "ru" ? "отношения" : "relationships",
        cta_h_end: lang === "ru" ? "с клиентами" : "with customers",
        cta_btn: lang === "ru" ? "Запустить UGC-кампанию" : "Launch UGC Campaign"
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-8"
                        >
                            <Users size={14} />
                            {t.badge}
                        </ClientMotionWrapper>

                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            tag="h1"
                            className="text-5xl md:text-8xl font-display font-black tracking-tight uppercase leading-[0.9] mb-8"
                        >
                            {t.h1_1} <br /> <span className="gradient-text-violet">{t.h1_2}</span> {t.h1_3}
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
                    <div className="glass p-12 md:p-24 rounded-[3rem] text-center border-purple-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-purple-500/5 -z-10" />
                        <h2 className="text-4xl md:text-7xl font-display font-black tracking-tight uppercase mb-8">
                            {t.cta_h} <br /> <span className="text-purple-400 italic">{t.cta_h_italic}</span> {t.cta_h_end}
                        </h2>
                        <div className="flex justify-center">
                            <ContactModal
                                type="client"
                                lang={lang}
                                trigger={
                                    <Button size="lg" className="h-20 px-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xl font-black uppercase tracking-widest shadow-2xl border-none">
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
