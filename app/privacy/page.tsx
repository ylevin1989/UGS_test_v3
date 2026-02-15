import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getContent } from "@/app/actions/content";

export default async function PrivacyPage() {
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
                            {lang === "ru" ? (
                                <>Политика в отношении обработки <br /><span className="text-primary italic">персональных данных</span></>
                            ) : (
                                <>Privacy <br /><span className="text-primary italic">Policy</span></>
                            )}
                        </h1>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-12">
                        <section className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                            <h2 className="text-xl font-black uppercase mb-4 text-primary">
                                {lang === "ru" ? "1. Общие положения" : "1. General Provisions"}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-medium">
                                {lang === "ru"
                                    ? `1.1. Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ${SITE_CONFIG.company.legalName} (далее — Оператор).`
                                    : `1.1. This personal data processing policy has been drawn up in accordance with the requirements of the Law and determines the procedure for processing personal data and measures to ensure the security of personal data taken by ${SITE_CONFIG.company.legalName} (hereinafter referred to as the Operator).`}
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-black uppercase text-white border-l-4 border-primary pl-6">
                                {lang === "ru" ? "2. Основные понятия" : "2. Core Concepts"}
                            </h2>
                            <ul className="space-y-4 text-zinc-400 font-medium">
                                <li className="flex gap-4">
                                    <span className="text-primary font-black shrink-0">•</span>
                                    <span>
                                        {lang === "ru"
                                            ? "Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники."
                                            : "Automated processing of personal data — processing of personal data using computer technology."}
                                    </span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-primary font-black shrink-0">•</span>
                                    <span>
                                        {lang === "ru"
                                            ? "Блокирование персональных данных — временное прекращение обработки персональных данных."
                                            : "Blocking of personal data — temporary termination of personal data processing."}
                                    </span>
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-black uppercase text-white border-l-4 border-primary pl-6">
                                {lang === "ru" ? "3. Обработка данных" : "3. Data Processing"}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-medium">
                                {lang === "ru" ? "Оператор обрабатывает следующие персональные данные пользователя:" : "The Operator processes the following user personal data:"}
                            </p>
                            <ul className="grid md:grid-cols-2 gap-4">
                                <li className="glass p-4 rounded-xl text-sm font-bold border-white/5">{lang === "ru" ? "Фамилия, имя, отчество" : "Full Name"}</li>
                                <li className="glass p-4 rounded-xl text-sm font-bold border-white/5">{lang === "ru" ? "Номер телефона" : "Phone Number"}</li>
                                <li className="glass p-4 rounded-xl text-sm font-bold border-white/5">{lang === "ru" ? "Электронная почта" : "Email"}</li>
                                <li className="glass p-4 rounded-xl text-sm font-bold border-white/5">{lang === "ru" ? "Username (Telegram)" : "Social Usernames"}</li>
                            </ul>
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
