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
}

export function ClientForm({ onSuccess }: ClientFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Ваше имя</label>
                    <Input
                        {...register("name")}
                        placeholder="Александр"
                        className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-zinc-700"
                    />
                    {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive flex items-center ml-4 mt-1">
                            <AlertCircle size={12} className="mr-1" /> {errors.name.message}
                        </motion.p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Telegram / WhatsApp</label>
                    <Input
                        {...register("contact")}
                        placeholder="@username"
                        className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-zinc-700"
                    />
                    {errors.contact && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive flex items-center ml-4 mt-1">
                            <AlertCircle size={12} className="mr-1" /> {errors.contact.message}
                        </motion.p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Бизнес / Продукт</label>
                    <Input
                        {...register("website")}
                        placeholder="https://your-site.com"
                        className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-zinc-700"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Рекламный бюджет</label>
                    <Select onValueChange={(value) => setValue("budget", value)}>
                        <SelectTrigger className="h-14 px-6 rounded-2xl bg-[#121212] border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg text-zinc-300">
                            <SelectValue placeholder="Выберите диапазон" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#121212] border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            {BUDGET_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="py-3 focus:bg-primary/10 transition-colors">
                                    {option.label}
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
                        Анализируем...
                    </div>
                ) : (
                    <div className="flex items-center">
                        Получить стратегию
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
                        <span className="text-sm font-bold tracking-tight">Заявка принята! Менеджер свяжется с вами в течение 30 минут.</span>
                    </motion.div>
                )}

                {submitStatus === "error" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center space-x-3 text-destructive"
                    >
                        <AlertCircle size={24} />
                        <span className="text-sm font-bold tracking-tight">Ошибка сервера. Пожалуйста, напишите нам в Telegram напрямую.</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}
