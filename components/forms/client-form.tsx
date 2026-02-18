"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { clientFormSchema, type ClientFormData } from "@/lib/validations";
import { BUDGET_OPTIONS } from "@/lib/constants";
import { submitClientForm } from "@/app/actions/send-telegram";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ClientFormProps {
    onSuccess?: () => void;
    lang?: string;
}

export function ClientForm({ onSuccess, lang = "ru" }: ClientFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const t = {
        nameLabel: lang === "ru" ? "Ваше имя" : "Your Name",
        namePlaceholder: lang === "ru" ? "Александр" : "John Doe",
        contactLabel: lang === "ru" ? "Telegram / WhatsApp" : "Telegram / WhatsApp",
        contactPlaceholder: lang === "ru" ? "@username" : "@username or +1...",
        businessLabel: lang === "ru" ? "Бизнес / Продукт" : "Business / Product",
        businessPlaceholder: lang === "ru" ? "https://your-site.com" : "https://your-site.com",
        budgetLabel: lang === "ru" ? "Рекламный бюджет" : "Ad Budget",
        budgetPlaceholder: lang === "ru" ? "Выберите диапазон" : "Select range",
        submitBtn: lang === "ru" ? "Получить стратегию" : "Get Strategy",
        submitting: lang === "ru" ? "Анализируем..." : "Analyzing...",
        successMsg: lang === "ru" ? "Заявка принята! Менеджер свяжется с вами в течение 30 минут." : "Request received! A manager will contact you within 30 minutes.",
        errorMsg: lang === "ru" ? "Ошибка сервера. Пожалуйста, напишите нам в Telegram напрямую." : "Server error. Please message us on Telegram directly."
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<ClientFormData>({
        resolver: zodResolver(clientFormSchema),
    });

    const onSubmit = async (data: ClientFormData) => {
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            await submitClientForm(data);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" id="contact-form">
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
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">{t.contactLabel}</label>
                    <Input
                        {...register("contact")}
                        placeholder={t.contactPlaceholder}
                        className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-zinc-700"
                    />
                    {errors.contact && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive flex items-center ml-4 mt-1">
                            <AlertCircle size={12} className="mr-1" /> {errors.contact.message}
                        </motion.p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">{t.businessLabel}</label>
                    <Input
                        {...register("website")}
                        placeholder={t.businessPlaceholder}
                        className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-zinc-700"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">{t.budgetLabel}</label>
                    <Select onValueChange={(value) => setValue("budget", value)}>
                        <SelectTrigger className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg text-zinc-300">
                            <SelectValue placeholder={t.budgetPlaceholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#121212] border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            {BUDGET_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="py-3 focus:bg-primary/10 transition-colors">
                                    {lang === "ru" ? option.label : option.label.replace("до", "up to").replace("от", "from")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.budget && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive flex items-center ml-4 mt-1">
                            <AlertCircle size={12} className="mr-1" /> {errors.budget.message}
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
