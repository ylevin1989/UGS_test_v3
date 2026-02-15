import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Play, TrendingUp, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import { CASE_STUDIES } from "@/lib/constants";
import { getContent } from "@/app/actions/content";
import { ContactModal } from "@/components/contact-modal";
import { ClientMotionWrapper } from "@/components/client-motion-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Кейсы | HYPERLIFT",
    description: "Наши истории успеха. Посмотрите, как мы масштабируем бренды через виральный UGC контент и перфоманс маркетинг.",
};

export default async function CasesPage() {
    const result = await getContent();

    if (!result) return null;
    const { data: content, lang } = result;

    const cases = content.cases || CASE_STUDIES;

    return (
        <>
            <Header phone={content.site?.phone} currentLang={lang} />
            <main className="pt-24 lg:pt-32 pb-24">
                <div className="container">
                    <div className="text-center mb-12 lg:mb-20 max-w-4xl mx-auto space-y-4 px-4">
                        <ClientMotionWrapper
                            tag="span"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-primary font-black uppercase tracking-[0.4em] text-[10px] lg:text-xs"
                        >
                            {lang === "ru" ? "Доказанные результаты" : "Proven Results"}
                        </ClientMotionWrapper>
                        <ClientMotionWrapper
                            tag="h1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-8xl font-black tracking-tighter mb-6 uppercase leading-[0.9] lg:leading-[0.85]"
                        >
                            {lang === "ru" ? (
                                <>Наши <span className="text-primary italic">Истории</span> Успеха</>
                            ) : (
                                <>Our <span className="text-primary italic">Success</span> Stories</>
                            )}
                        </ClientMotionWrapper>
                        <p className="text-base lg:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                            {lang === "ru"
                                ? "Мы превращаем охваты в реальную прибыль. Посмотрите, как мы масштабируем бренды через UGC-стратегии."
                                : "We turn reach into actual profit. See how we scale brands through UGC strategies."}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                        {cases.map((caseItem: any, idx: number) => (
                            <ClientMotionWrapper
                                key={caseItem.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group h-full"
                            >
                                <Card className="h-full flex flex-col overflow-hidden glass rounded-[2.5rem] lg:rounded-[3rem] border-white/5 hover:border-primary/30 transition-all duration-500">
                                    <div className="aspect-[4/5] relative overflow-hidden rounded-[2.2rem] lg:rounded-[3.2rem] m-1.5 lg:m-2">
                                        <Image
                                            src={caseItem.image}
                                            alt={caseItem.brand}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/40 scale-75 group-hover:scale-100 transition-transform">
                                                <Play fill="currentColor" size={28} className="ml-1" />
                                            </div>
                                        </div>

                                        <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 right-6 lg:right-8 space-y-1 lg:space-y-2">
                                            <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-primary bg-primary/20 px-2.5 lg:px-3 py-1 rounded-full backdrop-blur-md border border-primary/20 inline-block">
                                                {caseItem.category}
                                            </span>
                                            <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tighter">{caseItem.brand}</h3>
                                        </div>
                                    </div>

                                    <div className="p-6 lg:p-10 pt-4 lg:pt-6 flex flex-col flex-grow space-y-6 lg:space-y-10">
                                        <div className="grid grid-cols-2 gap-4 lg:gap-6">
                                            <div className="space-y-0.5 lg:space-y-1">
                                                <div className="flex items-center text-primary space-x-1.5 lg:space-x-2">
                                                    <Users size={12} className="lg:w-3.5 lg:h-3.5" />
                                                    <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest opacity-60">
                                                        {lang === "ru" ? "Охват" : "Reach"}
                                                    </span>
                                                </div>
                                                <p className="text-xl lg:text-2xl font-black">{caseItem.shortResult}</p>
                                            </div>
                                            <div className="space-y-0.5 lg:space-y-1">
                                                <div className="flex items-center text-primary space-x-1.5 lg:space-x-2">
                                                    <TrendingUp size={12} className="lg:w-3.5 lg:h-3.5" />
                                                    <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest opacity-60">
                                                        {lang === "ru" ? "Рост" : "Growth"}
                                                    </span>
                                                </div>
                                                <p className="text-xl lg:text-2xl font-black">{caseItem.shortRoi}</p>
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <Link href={`/cases/${caseItem.id}`} className="block">
                                                <button className="w-full h-14 lg:h-16 rounded-xl lg:rounded-2xl bg-white/5 hover:bg-primary hover:text-black hover:scale-[1.02] border border-white/10 flex items-center justify-center text-xs lg:text-sm font-black uppercase tracking-widest lg:tracking-tighter transition-all">
                                                    {lang === "ru" ? "Детальный разбор" : "Case Details"}
                                                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform lg:w-4.5 lg:h-4.5" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            </ClientMotionWrapper>
                        ))}
                    </div>

                    <div className="mt-16 lg:mt-24 p-8 lg:p-24 glass rounded-[3rem] lg:rounded-[4rem] text-center border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 -z-10" />
                        <div className="relative z-10 space-y-6 lg:space-y-8">
                            <h2 className="text-3xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                                {lang === "ru" ? (
                                    <>Хотите такие же <br /><span className="text-primary italic">результаты?</span></>
                                ) : (
                                    <>Want the same <br /><span className="text-primary italic">results?</span></>
                                )}
                            </h2>
                            <p className="text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                                {lang === "ru"
                                    ? "Оставьте заявку на бесплатный расчет медиаплана. Мы подберем креаторов и стратегию под ваш бюджет."
                                    : "Submit a request for a free media plan calculation. We will select creators and a strategy based on your budget."}
                            </p>
                            <div className="flex justify-center">
                                <ContactModal
                                    type="client"
                                    lang={lang}
                                    trigger={
                                        <button className="h-16 lg:h-20 px-10 lg:px-16 rounded-full bg-primary text-black font-black text-lg lg:text-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-tight">
                                            {lang === "ru" ? "ПОЛУЧИТЬ СТРАТЕГИЮ" : "GET STRATEGY"}
                                        </button>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer lang={lang} />
        </>
    );
}
