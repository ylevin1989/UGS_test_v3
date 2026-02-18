import { z } from "zod";

// Client form validation schema
export const clientFormSchema = z.object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    contact: z.string()
        .min(3, "Укажите Telegram или WhatsApp")
        .refine(
            (val) => val.startsWith("@") || val.startsWith("+") || /^[a-zA-Z0-9_]{5,}$/.test(val),
            { message: "Введите @username или номер телефона (+...)" }
        ),
    website: z.string().url("Введите корректный URL").optional().or(z.literal("")),
    budget: z.string().min(1, "Выберите бюджет"),
});

export type ClientFormData = z.infer<typeof clientFormSchema>;

// Creator form validation schema
export const creatorFormSchema = z.object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    telegram: z.string()
        .min(2, "Укажите ваш Telegram ник")
        .refine(
            (val) => val.startsWith("@") || /^[a-zA-Z0-9_]{5,}$/.test(val),
            { message: "Введите корректный ник (@username)" }
        ),
    portfolio: z.string().url("Введите корректную ссылку на TikTok/Instagram").optional().or(z.literal("")),
    phone: z.string().min(10, "Введите корректный номер телефона"),
});

export type CreatorFormData = z.infer<typeof creatorFormSchema>;
