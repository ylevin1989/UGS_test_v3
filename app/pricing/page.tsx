import { getContent } from "@/app/actions/content";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const { lang } = await getContent();
    return {
        title: lang === "ru" ? "Тарифы — HYPERLIFT" : "Pricing — HYPERLIFT",
        description: lang === "ru"
            ? "Тарифы HYPERLIFT: 5 пакетов для запуска контент-завода. От 120 000 ₽/мес. Подберём команду под ваш бюджет."
            : "HYPERLIFT Pricing: 5 packages to launch your content factory. From 120,000 ₽/mo. We build a team for your budget.",
    };
}

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/home/pricing-section";
import { SafetySection } from "@/components/home/safety-section";
import { CTASection } from "@/components/home/cta-section";
import { StickyCTA } from "@/components/ui/sticky-cta";

export default async function PricingPage() {
    const result = await getContent();
    if (!result) return null;
    const { data: content, lang } = result;

    return (
        <>
            <Header phone={content.site.phone} currentLang={lang} />
            <main>
                {/* Hero mini */}
                <section className="pt-32 pb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-purple-600/8 rounded-full blur-[180px] -z-10" />
                    <div className="container text-center max-w-4xl mx-auto space-y-4">
                        <span className="text-purple-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                            {lang === "ru" ? "Тарифы и пакеты" : "Plans & Pricing"}
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9]">
                            {lang === "ru" ? "ЦЕНЫ" : "PRICING"} <br />
                            <span className="gradient-text-aurora">HYPERLIFT</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            {lang === "ru"
                                ? "Агентское сопровождение, без бюджета креаторов. Бюджет креаторов и блогеров оплачивается отдельно брендом. Мы подбираем команду под ваш бюджет."
                                : "Agency management, creator budget not included. Creator and blogger budgets are paid separately by the brand. We build a team for your budget."}
                        </p>
                    </div>
                </section>

                <PricingSection lang={lang} />

                <SafetySection lang={lang} />

                <CTASection lang={lang} />

                <StickyCTA lang={lang} />
            </main>
            <Footer lang={lang} />
        </>
    );
}
