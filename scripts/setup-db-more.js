const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:e8Aliacwy73yHboh@db.hlwyscthkuohbrksklnn.supabase.co:5432/postgres'
});

async function setupUsersAndPricing() {
    try {
        await client.connect();

        // 1. Create users table
        await client.query(`
      CREATE TABLE IF NOT EXISTS public.users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'Client',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

        // We will use pgcrypto to hash passwords
        await client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');

        // Insert default admin if not exists
        await client.query(`
      INSERT INTO public.users (username, password_hash, role)
      VALUES (
        'Admin', 
        crypt('APEXhot1', gen_salt('bf')),
        'Admin'
      )
      ON CONFLICT (username) DO NOTHING;
    `);

        // 2. Add pricing to existing content of ru and en
        // Pricing data
        const pricingPlansRU = [
            {
                id: "start",
                name: "HYPERLIFT START",
                tagline: "Запуск контент-завода",
                iconName: "Rocket",
                gradient: "from-purple-600 to-violet-500",
                shadowColor: "shadow-purple-500/20",
                borderColor: "border-purple-500/20 hover:border-purple-500/50",
                levels: [
                    { level: "Start", price: "180 000 ₽" },
                    { level: "Growth", price: "250 000 ₽" },
                    { level: "Scale", price: "350 000 ₽" }
                ],
                creatorBudget: "от 150–200 тыс ₽",
                bestFor: "Брендам, которые хотят начать"
            },
            {
                id: "scale",
                name: "HYPERLIFT SCALE",
                tagline: "Креаторы + AI",
                iconName: "TrendingUp",
                gradient: "from-pink-600 to-rose-500",
                shadowColor: "shadow-pink-500/20",
                borderColor: "border-pink-500/20 hover:border-pink-500/50",
                levels: [
                    { level: "Start", price: "300 000 ₽" },
                    { level: "Growth", price: "450 000 ₽" },
                    { level: "Scale", price: "650 000 ₽" }
                ],
                creatorBudget: "от 200–500 тыс ₽",
                bestFor: "Брендам, которым нужен рост охватов"
            },
            {
                id: "trust",
                name: "HYPERLIFT TRUST",
                tagline: "Креаторы + микроблогеры",
                iconName: "Heart",
                gradient: "from-orange-500 to-amber-500",
                shadowColor: "shadow-orange-500/20",
                borderColor: "border-orange-500/20 hover:border-orange-500/50",
                levels: [
                    { level: "Start", price: "280 000 ₽" },
                    { level: "Growth", price: "420 000 ₽" },
                    { level: "Scale", price: "600 000 ₽" }
                ],
                creatorBudget: "Бюджет блогеров отдельно",
                bestFor: "Брендам с товарами и e-commerce"
            },
            {
                id: "ai",
                name: "HYPERLIFT AI",
                tagline: "Контент-завод на базе ИИ",
                iconName: "Cpu",
                gradient: "from-cyan-500 to-blue-500",
                shadowColor: "shadow-cyan-500/20",
                borderColor: "border-cyan-500/20 hover:border-cyan-500/50",
                levels: [
                    { level: "Start", price: "120 000 ₽" },
                    { level: "Growth", price: "200 000 ₽" },
                    { level: "Scale", price: "300 000 ₽" }
                ],
                creatorBudget: "Бюджет креаторов не нужен",
                bestFor: "Стартапам и тестам гипотез"
            },
            {
                id: "enterprise",
                name: "HYPERLIFT ENTERPRISE",
                tagline: "Контент-завод под ключ",
                iconName: "Building2",
                gradient: "from-yellow-500 to-green-400",
                shadowColor: "shadow-yellow-500/20",
                borderColor: "border-yellow-500/20 hover:border-yellow-500/50",
                levels: [
                    { level: "Start", price: "700 000 ₽" },
                    { level: "Growth", price: "1 000 000 ₽" },
                    { level: "Scale", price: "1.5–2 млн ₽" }
                ],
                creatorBudget: "от 500 тыс ₽",
                bestFor: "Средним и крупным брендам"
            }
        ];

        const pricingPlansEN = pricingPlansRU.map((p, i) => {
            // Just some basic translations based on the TS file
            const d = JSON.parse(JSON.stringify(p));
            if (i === 0) { d.tagline = "Launch content factory"; d.creatorBudget = "from 150–200K ₽"; d.bestFor = "Brands ready to start"; }
            if (i === 1) { d.tagline = "Creators + AI"; d.creatorBudget = "from 200–500K ₽"; d.bestFor = "Brands needing reach growth"; }
            if (i === 2) { d.tagline = "Creators + micro-bloggers"; d.creatorBudget = "Blogger budget separate"; d.bestFor = "Product & e-commerce brands"; }
            if (i === 3) { d.tagline = "AI-powered content factory"; d.creatorBudget = "No creator budget needed"; d.bestFor = "Startups & hypothesis testing"; }
            if (i === 4) { d.tagline = "Turnkey content factory"; d.creatorBudget = "from 500K ₽"; d.bestFor = "Medium & large brands"; }
            return d;
        });

        await client.query(`
      UPDATE site_content 
      SET content = jsonb_set(content, '{pricing_plans}', $1::jsonb) 
      WHERE lang = 'ru'
    `, [JSON.stringify(pricingPlansRU)]);

        await client.query(`
      UPDATE site_content 
      SET content = jsonb_set(content, '{pricing_plans}', $1::jsonb) 
      WHERE lang = 'en'
    `, [JSON.stringify(pricingPlansEN)]);

        console.log("✅ Users table and pricing data created!");

    } catch (err) {
        console.error("❌ Setup error:", err);
    } finally {
        await client.end();
    }
}

setupUsersAndPricing();
