const fs = require('fs/promises');
const path = require('path');
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:e8Aliacwy73yHboh@db.hlwyscthkuohbrksklnn.supabase.co:5432/postgres'
});

async function migrate() {
    try {
        await client.connect();
        console.log("✅ Connected to Supabase");

        // 1. Create site_content table
        await client.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        lang VARCHAR(10) PRIMARY KEY,
        content JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
        console.log("✅ Created/verified site_content table");

        // 2. Insert content for each language
        for (const lang of ['ru', 'en']) {
            try {
                const filePath = path.join(__dirname, '..', 'data', `${lang}.json`);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const jsonContent = JSON.parse(fileContent);

                await client.query(
                    `INSERT INTO site_content (lang, content, updated_at) 
           VALUES ($1, $2, NOW()) 
           ON CONFLICT (lang) 
           DO UPDATE SET content = EXCLUDED.content, updated_at = NOW();`,
                    [lang, JSON.stringify(jsonContent)]
                );
                console.log(`✅ Migrated content for language: ${lang}`);
            } catch (err) {
                console.warn(`⚠️ Skipped/Failed migrating content for ${lang}:`, err.message);
            }
        }

        // 3. Migrate leads if they exist
        try {
            const leadsPath = path.join(__dirname, '..', 'data', 'leads.json');
            const leadsContent = await fs.readFile(leadsPath, 'utf-8');
            const leads = JSON.parse(leadsContent);

            let migratedLeads = 0;
            for (const lead of leads) {
                // Assume lead has format like { name, contact, role/message ... }
                // Insert into leads table (which we created earlier)
                await client.query(
                    `INSERT INTO leads (name, contact, role, created_at) 
           VALUES ($1, $2, $3, $4);`,
                    [
                        lead.name || 'Unknown',
                        lead.contact || '',
                        lead.role || lead.message || '',
                        lead.createdAt || new Date()
                    ]
                );
                migratedLeads++;
            }
            console.log(`✅ Migrated ${migratedLeads} leads`);
        } catch (err) {
            console.warn(`⚠️ Skipped leads migration:`, err.message);
        }

        console.log("🎉 Migration completed successfully!");
    } catch (error) {
        console.error("❌ Migration failed:", error);
    } finally {
        await client.end();
    }
}

migrate();
