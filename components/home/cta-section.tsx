"use client";

import { ClientMotionWrapper } from "@/components/client-motion-wrapper";
import { ContactModal } from "@/components/contact-modal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection({ lang = "ru" }: { lang?: string }) {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Floating aurora blobs */}
            <div className="absolute top-0 left-[20%] w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[120px]" />
            <div className="absolute bottom-0 right-[10%] w-[350px] h-[350px] rounded-full bg-pink-500/10 blur-[100px]" />
            <div className="absolute top-[50%] left-[60%] w-[250px] h-[250px] rounded-full bg-orange-500/8 blur-[80px]" />

            <div className="container relative z-10">
                <div className="card-glow rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
                    {/* Inner gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-pink-950/20 pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                    <div className="relative z-10">
                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-8">
                                <Sparkles size={14} />
                                {lang === "ru" ? "Бесплатная стратегия" : "Free strategy"}
                            </span>
                        </ClientMotionWrapper>

                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.9] mb-8">
                                <span className="text-white">{lang === "ru" ? "ГОТОВ" : "READY TO"}</span><br />
                                <span className="gradient-text-aurora">{lang === "ru" ? "НАЧАТЬ?" : "START?"}</span>
                            </h2>
                        </ClientMotionWrapper>

                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
                                {lang === "ru"
                                    ? "Обсудим ваш проект и бесплатно составим стратегию продвижения через UGC контент."
                                    : "Let's discuss your project and create a free UGC content strategy."}
                            </p>
                        </ClientMotionWrapper>

                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <ContactModal
                                type="client"
                                lang={lang}
                                trigger={
                                    <Button size="lg" className="btn-aurora rounded-full px-12 h-16 text-xl group cursor-pointer">
                                        {lang === "ru" ? "Обсудить проект" : "Let's talk"}
                                        <ArrowRight size={22} className="ml-3 group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                }
                            />
                        </ClientMotionWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
}
