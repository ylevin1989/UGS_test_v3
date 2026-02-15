import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getContent } from "@/app/actions/content";

export default async function TermsPage() {
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
                            {lang === "ru" ? <>Пользовательское <br /><span className="text-primary italic">соглашение</span></> : <>Terms of <br /><span className="text-primary italic">Service</span></>}
                        </h1>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-12">
                        <section className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                            <h2 className="text-xl font-black uppercase mb-4 text-primary">
                                {lang === "ru" ? "1. Предмет соглашения" : "1. Subject of Agreement"}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-medium">
                                {lang === "ru"
                                    ? `1.1. Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между ${SITE_CONFIG.company.legalName} (далее — Администрация сайта) и пользователем сети Интернет (далее — Пользователь), возникающие при использовании сайта.`
                                    : `1.1. This User Agreement (hereinafter the Agreement) governs the relationship between ${SITE_CONFIG.company.legalName} (hereinafter Content Creator) and the Internet user (hereinafter the User) arising from the use of the site.`}
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-black uppercase text-white border-l-4 border-primary pl-6">
                                {lang === "ru" ? "2. Условия использования" : "2. Terms of Use"}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-medium">
                                {lang === "ru"
                                    ? "2.1. Использование материалов и сервисов Сайта регулируется нормами действующего законодательства."
                                    : "2.1. The use of materials and services of the Site is governed by the norms of applicable law."}
                            </p>
                            <p className="text-zinc-400 leading-relaxed font-medium mt-4">
                                {lang === "ru"
                                    ? "2.2. Настоящее Соглашение является публичной офертой. Получая доступ к материалам Сайта, Пользователь считается присоединившимся к настоящему Соглашению."
                                    : "2.2. This Agreement is a public offer. By accessing the materials of the Site, the User is considered to have joined this Agreement."}
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-black uppercase text-white border-l-4 border-primary pl-6">
                                {lang === "ru" ? "3. Обязательства Пользователя" : "3. User Obligations"}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-medium">
                                {lang === "ru"
                                    ? "3.1. Пользователь соглашается не предпринимать действий, которые могут рассматриваться как нарушающие законодательство или нормы международного права, в том числе в сфере интеллектуальной собственности."
                                    : "3.1. The User agrees not to take actions that may be considered as violating the law or norms of international law, including in the field of intellectual property."}
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
