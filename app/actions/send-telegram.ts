"use server";

import { ClientFormData, CreatorFormData } from "@/lib/validations";
import { saveLead } from "@/app/actions/leads";

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

async function sendTelegramMessage(message: string) {
    if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
        console.error("Telegram credentials not configured");
        throw new Error("Telegram integration not configured");
    }

    const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: TG_CHAT_ID,
                text: message,
                parse_mode: "HTML",
            }),
        });

        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.statusText}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Error sending telegram message:", error);
        throw error;
    }
}

export async function submitClientForm(data: ClientFormData) {
    const message = `
🔥 <b>НОВАЯ ЗАЯВКА (КЛИЕНТ)</b>

<b>Имя:</b> ${data.name}
<b>Связь:</b> ${data.contact}
${data.website ? `<b>Сайт:</b> ${data.website}` : ""}
<b>Бюджет:</b> ${data.budget}

<i>Отправлено: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Bangkok" })}</i>
  `.trim();

    await saveLead({ ...data, type: "client" });
    return await sendTelegramMessage(message);
}

export async function submitCreatorForm(data: CreatorFormData) {
    const message = `
🎬 <b>НОВАЯ ЗАЯВКА (КРЕАТОР)</b>

<b>Имя:</b> ${data.name}
<b>Telegram:</b> ${data.telegram}
${data.portfolio ? `<b>Портфолио:</b> ${data.portfolio}` : ""}
<b>Телефон:</b> ${data.phone}

<i>Отправлено: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Bangkok" })}</i>
  `.trim();

    await saveLead({ ...data, type: "creator" });
    return await sendTelegramMessage(message);
}
