import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getContent } from "@/app/actions/content";

export default async function OfferPage() {
    const result = await getContent();

    if (!result) return null;
    const { data: content, lang } = result;

    return (
        <>
            <Header phone={content.site?.phone} currentLang={lang} />
            <main className="py-20 md:py-32">
                <div className="container max-w-4xl">
                    <div className="space-y-4 mb-12">
                        <Link href="/" className="text-primary text-xs font-black uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center">
                            <ArrowLeft size={14} className="mr-2" />
                            {lang === "ru" ? "Вернуться на главную" : "Back to home"}
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                            {lang === "ru" ? <>Договор <br /><span className="text-primary italic">публичной оферты</span></> : <>Public <br /><span className="text-primary italic">Offer Agreement</span></>}
                        </h1>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-12">
                        <section className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                            <h2 className="text-xl font-black uppercase mb-4 text-primary">
                                {lang === "ru" ? "1. Определение терминов" : "1. Definition of Terms"}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-medium">
                                {lang === "ru"
                                    ? "1.1. В настоящей оферте, если контекст не требует иного, нижеприведенные термины имеют следующие значения: «Оферта» — публичное предложение Исполнителя, адресованное любому физическому лицу или юридическому лицу, заключить с ним договор на оказание услуг."
                                    : "1.1. In this offer, unless the context requires otherwise, the following terms have the following meanings: «Offer» — a public proposal by the Contractor, addressed to any individual or legal entity, to conclude a service agreement with them."}
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-black uppercase text-white border-l-4 border-primary pl-6">
                                {lang === "ru" ? "2. Предмет договора" : "2. Subject of the Agreement"}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-medium">
                                {lang === "ru"
                                    ? "2.1. Исполнитель обязуется оказать Заказчику услуги по созданию и продвижению UGC-контента, а Заказчик обязуется принять и оплатить услуги в порядке и на условиях, определенных настоящим Договором."
                                    : "2.1. The Contractor undertakes to provide the Customer with services for the creation and promotion of UGC content, and the Customer undertakes to accept and pay for the services in the manner and on the terms defined by this Agreement."}
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-black uppercase text-white border-l-4 border-primary pl-6">
                                {lang === "ru" ? "3. Акцепт оферты" : "3. Acceptance of the Offer"}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-medium">
                                {lang === "ru"
                                    ? "3.1. Полным и безоговорочным акцептом настоящей публичной оферты является оплата Заказчиком услуг Исполнителя или заполнение формы заявки на сайте."
                                    : "3.1. Full and unconditional acceptance of this public offer is the payment for the Contractor's services by the Customer or the filling out of the application form on the website."}
                            </p>
                        </section>

                        <section className="pt-12 border-t border-white/5 flex justify-between items-center text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
                            <span>{SITE_CONFIG.name} Legal Compliance</span>
                            <span>{lang === "ru" ? "Обновлено" : "Updated"}: {new Date().toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US")}</span>
                        </section>
                    </div>
                </div>
            </main>
            <Footer lang={lang} />
        </>
    );
}
