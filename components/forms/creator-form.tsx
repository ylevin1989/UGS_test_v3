"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { creatorFormSchema, type CreatorFormData } from "@/lib/validations";
import { submitCreatorForm } from "@/app/actions/send-telegram";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreatorFormProps {
    onSuccess?: () => void;
    lang?: string;
}

export function CreatorForm({ onSuccess, lang = "ru" }: CreatorFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const t = {
        nameLabel: lang === "ru" ? "Как тебя зовут?" : "What's your name?",
        namePlaceholder: lang === "ru" ? "Твое имя" : "Your Name",
        telegramLabel: lang === "ru" ? "Ник в Telegram" : "Telegram Handle",
        telegramPlaceholder: lang === "ru" ? "@username" : "@username",
        portfolioLabel: lang === "ru" ? "Портфолио (TikTok/Inst)" : "Portfolio (TikTok/Inst)",
        portfolioPlaceholder: lang === "ru" ? "https://tiktok.com/@..." : "https://tiktok.com/@...",
        phoneLabel: lang === "ru" ? "Номер телефона" : "Phone Number",
        phonePlaceholder: lang === "ru" ? "+7 (999) 000-00-00" : "+1 (555) 000-00-00",
        submitBtn: lang === "ru" ? "Отправить анкету" : "Send Application",
        submitting: lang === "ru" ? "Отправка..." : "Sending...",
        successMsg: lang === "ru" ? "Отлично! Мы добавили тебя в базу и скоро свяжемся." : "Great! We've added you to our database and will contact you soon.",
        errorMsg: lang === "ru" ? "Ошибка. Попробуй еще раз или напиши нам в Телеграм." : "Error. Please try again or message us on Telegram."
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreatorFormData>({
        resolver: zodResolver(creatorFormSchema),
    });

    const onSubmit = async (data: CreatorFormData) => {
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            await submitCreatorForm(data);
            setSubmitStatus("success");
            reset();
            onSuccess?.();
            setTimeout(() => setSubmitStatus("idle"), 5000);
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">{t.nameLabel}</label>
                    <Input
                        {...register("name")}
                        placeholder={t.namePlaceholder}
                        className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-zinc-700"
                    />
                    {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive flex items-center ml-4 mt-1">
                            <AlertCircle size={12} className="mr-1" /> {errors.name.message}
                        </motion.p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">{t.telegramLabel}</label>
                    <Input
                        {...register("telegram")}
                        placeholder={t.telegramPlaceholder}
                        className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-zinc-700"
                    />
                    {errors.telegram && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive flex items-center ml-4 mt-1">
                            <AlertCircle size={12} className="mr-1" /> {errors.telegram.message}
                        </motion.p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">{t.portfolioLabel}</label>
                    <Input
                        {...register("portfolio")}
                        placeholder={t.portfolioPlaceholder}
                        className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-zinc-700"
                    />
                    {errors.portfolio && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive flex items-center ml-4 mt-1">
                            <AlertCircle size={12} className="mr-1" /> {errors.portfolio.message}
                        </motion.p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">{t.phoneLabel}</label>
                    <Input
                        {...register("phone")}
                        placeholder={t.phonePlaceholder}
                        className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-zinc-700"
                    />
                    {errors.phone && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive flex items-center ml-4 mt-1">
                            <AlertCircle size={12} className="mr-1" /> {errors.phone.message}
                        </motion.p>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                size="lg"
                className="w-full h-16 rounded-2xl font-black text-lg group bg-primary text-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <div className="flex items-center">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {t.submitting}
                    </div>
                ) : (
                    <div className="flex items-center">
                        {t.submitBtn}
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                )}
            </Button>

            <AnimatePresence>
                {submitStatus === "success" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center space-x-3 text-primary"
                    >
                        <CheckCircle2 size={24} />
                        <span className="text-sm font-bold tracking-tight">{t.successMsg}</span>
                    </motion.div>
                )}

                {submitStatus === "error" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center space-x-3 text-destructive"
                    >
                        <AlertCircle size={24} />
                        <span className="text-sm font-bold tracking-tight">{t.errorMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}
